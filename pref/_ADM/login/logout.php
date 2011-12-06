<?php 
	session_start();
	session_destroy();
	# redireciona para página de login
	header('Location: ../index.php?action=finish');
?>