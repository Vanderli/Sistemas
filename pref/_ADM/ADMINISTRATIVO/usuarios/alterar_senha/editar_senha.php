<?php
	/* conex�o com banco de dados */
	include("../../../../conexao_db/conexaoTecnologia.php");	
	// inicializo a sess�o.
	if (!isset($_SESSION)) { session_start(); }
	
	// informa��es do servidor e banco de dados
	$usu_id       = $_SESSION['usu_id'];
	$dat_cad      = date('Y/m/d');
	$hora_cad     = date('G:i:s');	
	$nova_senha   = trim(md5($_POST['nova_senha']));
	$senha_info   = trim(md5($_POST['senha_atual']));				
	
	$busca = sprintf("SELECT usu_senha FROM usuarios WHERE usu_id = '$usu_id'"); 
	$query = mysql_query($busca) or die($msg[2]);
	$linha = mysql_fetch_array($query);		
	$senha_atual = $linha['usu_senha'];	
		
	# N�o deixo utilizar a mesma senha que j� tem 
	if($senha_atual == $nova_senha){
		header("Location: alterar_senha.php?action=pwd_equal");	
	
	# Se senha atual foi informada errada, ent�o n�o poder� modificar-la	
	}else if($senha_atual != $senha_info){
				header("Location: alterar_senha.php?action=notEqual");
							
	}else{				
			$sql = sprintf("UPDATE usuarios SET  
								usu_usuario_cad = '$usu_id',
								usu_dat_cad     = '$dat_cad', 
								usu_hora_cad    = '$hora_cad', 
								usu_senha       = '$nova_senha'						
							WHERE usu_id = $usu_id");
			
			//print_r($sql);exit;
		}				
	
	//print_r($sql);exit;
	$result = @mysql_query($sql) or die($msg[2]);
	
	
	if($result){
		echo "<script>alert('Dados alterados com sucesso')</script>";
		echo "<script>location.href='../listar_usu.php';</script>";
	} else{
		echo "<script>alert('Falha na altera��o dos dados')</script>";
		echo "<script>location.href='../listar_usu.php';</script>";
	}
	
	// Libera um resultado da mem�ria
	mysql_free_result($result);
?>