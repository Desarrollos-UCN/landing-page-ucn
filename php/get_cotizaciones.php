<?php
require "conect.php";


$sql = "SELECT c.id AS cotizacion_id, c.nombre_completo, c.direccion, c.celular, ciu.nombre AS ciudad, p.nombre AS nombre_producto, p.descripcion AS descripcion_producto, d.precio_unitario, d.cantidad, d.subtotal
FROM cotizaciones c
INNER JOIN ciudades ciu ON c.ciudad_id = ciu.id
INNER JOIN detalles_cotizacion d ON c.id = d.cotizacion_id
INNER JOIN productos p ON d.producto_id = p.id
ORDER BY c.id DESC, d.id ASC";

$result = $conn->query($sql);
$cotizaciones = [];
while ($row = $result->fetch_assoc()) {
    $cotizaciones[] = $row;
}

echo json_encode($cotizaciones);