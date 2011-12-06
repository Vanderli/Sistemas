<?php //echo 'Cadastrar                   '; print_r($_POST);exit;
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// inicializo a sessão.
	if (!isset($_SESSION)) { session_start(); }
	
	// informações do servidor e banco de dados
	$usu_id       = $_SESSION['usu_id'];
	$dat_cad      = date('Y/m/d');
	$hora_cad     = date('G:i:s');
	
	$modulo       = $_POST['usu_mdu_id'];
	$status       = $_POST['usu_status'];	
	// com funções
	$nome         = trim(strtoupper($_POST['usu_nome']));
	$login        = trim(strtolower($_POST['usu_login']));
	$senha        = md5($_POST['usu_senha']);			

	/*
	 * verifico se já existe pelo menos um registro no banco com esse login
	 */	
	$busca = sprintf("SELECT usu_login FROM usuarios WHERE usu_login = '$login'"); 
	$query = @mysql_query($busca) or die($msg[2]);	
		
	// só deixa continuar a editar se o resultado for ZERO
	if(mysql_num_rows($query)){
		header("Location:cad_usu.php?action=equal");	
	} else {  	
			$sql = "INSERT INTO usuarios(usu_mdu_id, 
										usu_usuario_cad, 
										usu_dat_cad, 
										usu_hora_cad, 
										usu_nome, 
										usu_login, 
										usu_senha, 
										usu_status)
			VALUES ('$modulo', '$usu_id', '$dat_cad', '$hora_cad', '$nome', '$login', '$senha', '$status');";		
	} 
	$result = mysql_query($sql) or die($msg[2]);

	if($result){
		echo "<script>alert('Dados inseridos com sucesso')</script>";
		echo "<script>location.href='listar_usu.php';</script>";
	} else{
		echo "<script>alert('Falha na inserção dos dados')</script>";
		echo "<script>location.href='listar_usu.php';</script>";
	}
	
	// Libera um resultado da memória
	mysql_free_result($result);
?>