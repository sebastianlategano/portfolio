<?php

// Obtener datos del formulario
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Puedes realizar más validaciones aquí si es necesario

// Enviar una respuesta JSON (puedes personalizar según tus necesidades)
$response = array('status' => 'success', 'message' => '¡Formulario enviado con éxito!');
echo json_encode($response);

?>