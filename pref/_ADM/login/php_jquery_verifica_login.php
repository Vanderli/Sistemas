<?php 
		/* conecta com banco de dados */
		require_once('../../conexao_db/conexaoTecnologia.php'); 

		if (!function_exists("buscarValor")) {
				function buscarValor($valor, $tipo, $valorDefinido  = "", $valorNaoDefinido = "") 
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
						$valor = ($valor != "") ? $valorDefinido  : $valorNaoDefinido;
					break;
				}
				return $valor;
			}
		}

	$login = "-1";
	if (isset($_POST['login'])) {
		$login = $_POST['login'];
	}
	
	/* FA�O A BUSCA NA TABELA USU�RIOS BANCO DE DADOS*/
	$login_query = sprintf("SELECT * FROM usuarios WHERE usu_login = %s", buscarValor($login, "text"));
	$query_login = mysql_query($login_query, $conn) or die(mysql_error());
	$row = mysql_fetch_assoc($query_login);
	$linhas_users = mysql_num_rows($query_login);

	/* MENSAGEM QUE SER� EXIBIDA */
	if (!empty($row['usu_login']) && $row['usu_status'] == 'INATIVO'){
		echo "inativo";
	}
	else if (!empty($row['usu_login']) && $row['usu_status'] == 'ATIVO'){
		echo "ativo";	
	}

 	# Libera a mem�ria do resultado de uma query
 	mysql_free_result($query_login); 
?>