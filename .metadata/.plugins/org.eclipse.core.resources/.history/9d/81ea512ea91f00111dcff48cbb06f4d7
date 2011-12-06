<?php
		/* conecta com banco de dados */
		include('../../conexao_db/conexaoTecnologia.php');
		
		/* verificanco login informado */
		if (!function_exists("buscarValorString")) {
			function buscarValor($valor, $tipo, $valorDefinido = "", $valorNaoDefinido = "") 
			{
				$valor = get_magic_quotes_gpc() ? stripslashes($valor) : $valor;
				$valor = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($valor) : mysql_escape_string($valor);
			
				switch ($tipo) {
					case "text":
						$valor = ($valor != "") ? "'" . $valor . "'" : "NULL";
					break;    
					case "long":
					case "int":
						$valor = ($valor != "") ? intval($valor) : "NULL";
					break;
					case "double":
						$valor = ($valor != "") ? "'" . doubleval($valor) . "'" : "NULL";
					break;
					case "date":
						$valor = ($valor != "") ? "'" . $valor . "'" : "NULL";
					break;
					case "defined":
						$valor = ($valor != "") ? $valorDefinido : $valorNaoDefinido;
					break;
				}
				return $valor;
			}
		} /* function_exists = nativa do php -> Retorna TRUE se a funчуo dada estс definida  */
		
		// inicializo a sessуo.
		if (!isset($_SESSION)) {
		  session_start();
		}
		
		$verificaLogin = $_SERVER['PHP_SELF'];
		
		if (isset($_GET['verificaAcesso'])) {
			$_SESSION['PrevUrl'] = $_GET['verificaAcesso'];
		}
		
		if (isset($_POST['login'])) {
			
			$login=strtolower($_POST['login']);
			$password=$_POST['senha'];
			$LoginCorreto = "../saudacao/bem_vindo.php";
			$LoginErrado = "../index.php?action=erroLogin";
						
			$login_query=sprintf("SELECT * FROM usuarios WHERE usu_login=%s AND usu_senha=%s AND usu_status='ATIVO'",
			buscarValor($login, "text"), buscarValor(md5($password), "text")); 
			
			$query_login = mysql_query($login_query, $conn) or die(mysql_error());
			$linhas_users = mysql_num_rows($query_login);
			
			if ($linhas_users) {
				$res = mysql_query($login_query, $conn) or die(mysql_error());	
				$campo= mysql_fetch_assoc($res);
			
				//setando variсveis na sessуo
				$_SESSION['usu_id'] = $campo['usu_id'];
				$_SESSION['usu_nome'] = $campo['usu_nome'];
				$_SESSION['usu_login'] = $login;      
				
				if (isset($_SESSION['PrevUrl']) && false) {
					$LoginCorreto = $_SESSION['PrevUrl'];	
				} /* fecha if PrevUrl */
				/* caso login CORRETO */	
				header("Location: " . $LoginCorreto );
			}
			else {
				/* caso login ERRADO */
				header("Location: ". $LoginErrado );
			}
		}		
?>