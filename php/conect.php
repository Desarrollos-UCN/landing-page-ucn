<?php


$host       = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname     = "ucnpage";

$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die('Error de conexión (' . $conn->connect_errno . '): ' . $conn->connect_error);
}

$nombres      = filter_input(INPUT_POST, 'nombres', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$apellidos    = filter_input(INPUT_POST, 'apellidos', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$colorCabello = filter_input(INPUT_POST, 'colorCabello', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$colorOjos    = filter_input(INPUT_POST, 'colorOjos', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$edad         = filter_input(INPUT_POST, 'edad', FILTER_SANITIZE_NUMBER_INT);
$hobby        = filter_input(INPUT_POST, 'hobby', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if (!$nombres || !$apellidos || !$colorCabello || !$colorOjos || !$edad || !$hobby) {
    die("Error: Todos los campos son obligatorios.");
}

$stmt = $conn->prepare("INSERT INTO users (nombres, apellidos, colorCabello, colorOjos, edad, Hobby) 
VALUES (?, ?, ?, ?, ?, ?)");
if ($stmt === false) {
    die('Error en prepare: ' . $conn->error);
}

$stmt->bind_param("ssssis", $nombres, $apellidos, $colorCabello, $colorOjos, $edad, $hobby);

if ($stmt->execute()) {
    exit(json_encode(["status" => "ok", "mensaje" => "Registro guardado correctamente"]));
} else {
    exit(json_encode(["status" => "error", "mensaje" => "Error al guardar: " . $stmt->error]));
}

$stmt->close();
$conn->close();
?>
