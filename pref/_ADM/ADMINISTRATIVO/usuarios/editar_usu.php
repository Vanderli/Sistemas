<?php
	/* conex�o com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// inicializo a sess�o.
	if (!isset($_SESSION)) { session_start(); }
	
	if (isset($_GET['id'])){$id = $_GET['id'];}
	
	// informa��es do servidor e banco de dados
	$usu_id       = $_SESSION['usu_id'];
	$dat_cad      = date('Y/m/d');
	$hora_cad     = date('G:i:s');
	
	$modulo       = $_POST['usu_mdu_id'];
	$status       = $_POST['usu_status'];
	
	// com fun��es
	$nome         = trim(strtoupper($_POST['usu_nome']));
	$login        = trim(strtolower($_POST['usu_login']));
	$senha        = md5($_POST['usu_senha']);			

	
	
	/*
	 * verifico se j� existe pelo menos um registro no banco com esse login
	 * com excess�o do login que est� sendo editado, pois ele pode continuar 
	 * com mesmo nome de login
	 */
	$busca = sprintf("SELECT usu_login FROM usuarios WHERE usu_login = '$login' AND usu_id != $id"); 
	$query = @mysql_query($busca) or die($msg[2]);	
			
	// s� deixa continuar a editar se o resultado for ZERO
	if(mysql_num_rows($query)){
		header("Location:cad_usu.php?action=equal");	
	} else {  
		/* 
		 * caso a senha n�o tenha sido alterada retornar� 
		 * retornar� verdadeiro o if abaixo.
		 */
		if( $_POST['usu_senha'] == 'N�O EXIBIDA POR MOTIVOS DE SEGURAN�A!' ){	
		
			$sql = "UPDATE usuarios SET 
						usu_mdu_id      = '$modulo', 
						usu_usuario_cad = '$usu_id',
						usu_dat_cad     = '$dat_cad', 
						usu_hora_cad    = '$hora_cad', 
						usu_nome        = '$nome', 
						usu_login       = '$login', 
						usu_status      = '$status'
					WHERE usu_id        = $id";
					
			//print_r($sql);exit;			
		}else{
			
			$sql = "UPDATE usuarios SET 
						usu_mdu_id      = '$modulo', 
						usu_usuario_cad = '$usu_id',
						usu_dat_cad     = '$dat_cad', 
						usu_hora_cad    = '$hora_cad', 
						usu_nome        = '$nome', 
						usu_login       = '$login', 
						usu_senha       = '$senha', 
						usu_status      = '$status'
					WHERE usu_id        = $id";		
		}	
	} // fecha if(mysql_num_rows($query))
	$result = mysql_query($sql) or die($msg[2]);
	

	if($result){
		echo "<script>alert('Dados alterados com sucesso')</script>";
		echo "<script>location.href='listar_usu.php';</script>";
	} else{
		echo "<script>alert('Falha na altera��o dos dados')</script>";
		echo "<script>location.href='listar_usu.php';</script>";
	}
	
	// Libera um resultado da mem�ria
	mysql_free_result($result);
?>