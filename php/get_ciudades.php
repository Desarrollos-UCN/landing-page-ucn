<?php
require "conect.php";

$sql = "SELECT id, nombre FROM ciudades";
$result = $conn->query($sql);

$ciudades = [];
while ($row = $result->fetch_assoc()) {
    $ciudades[] = $row;
}

echo json_encode($ciudades);