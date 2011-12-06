<?php
$host = "localhost";//caso esteja usando o xampp ou wamp
$user = "root";
$pass = "";
$db = "calendar_eventos";
$conn = mysql_connect($host, $user, $pass) or die (mysql_error());

@mysql_select_db($db);

?>