<?php


$host       = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname     = "ucnpage";

$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die('Error de conexión (' . $conn->connect_errno . '): ' . $conn->connect_error);
}


?>
