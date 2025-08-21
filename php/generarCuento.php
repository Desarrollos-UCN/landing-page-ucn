<?php

require_once 'conect.php';

// Verificar si se recibió el parámetro 'id'
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro id']);
    exit;
}

$id = intval($_GET['id']);

// Preparar y ejecutar la consulta
$sql = "SELECT * FROM users WHERE id = ".$id;
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    echo json_encode($usuario);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$stmt->close();
$conn->close();
?>