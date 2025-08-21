<?php

require "conect.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"];
$ciudad = $data["ciudad"];
$direccion = $data["direccion"];
$celular = $data["celular"];
$productos = $data["productos"];

$conn->begin_transaction();

try {
    // Guardar cabecera
    $stmt = $conn->prepare("INSERT INTO cotizaciones (nombre_completo, ciudad_id, direccion, celular) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $nombre, $ciudad, $direccion, $celular);
    $stmt->execute();
    $cotizacion_id = $stmt->insert_id;

    // Guardar productos seleccionados
    $stmtDetalle = $conn->prepare("INSERT INTO detalles_cotizacion (cotizacion_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)");
    foreach ($productos as $p) {
        $stmtDetalle->bind_param("iiid", $cotizacion_id, $p["id"], $p["cantidad"], $p["precio"]);
        $stmtDetalle->execute();
    }

    $conn->commit();
    exit(json_encode(["status" => "ok", "mensaje" => "Cotización guardada con éxito"]));

} catch (Exception $e) {
    $conn->rollback();
    exit(json_encode(["status" => "error", "mensaje" => "Error al guardar cotización"]));
}
