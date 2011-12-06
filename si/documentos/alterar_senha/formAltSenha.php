<?php   
		/* conexão com banco de dados */
		include("../conexao_db/conexaoTecnologia.php");
		/* insiro sessão para poder acessar as páginas */ 
		include("../login/protege_pagina.php");
		/* biblioteca */
		include("../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;		
		
		// ID USUÁRIO LOGADO
		$id_login = $_SESSION['codUsuario'];			
		
		/* ALTERAR INFORMAÇÕES */
		if (!function_exists("GetSQLValueString")) {
			function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
			{
				$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
				$theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);
		
				switch ($theType) {
					case "text":
						$theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
					break;    
					case "long":
					case "int":
						$theValue = ($theValue != "") ? intval($theValue) : "NULL";
					break;
					case "double":
						$theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
					break;
					case "date":
						$theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
					break;
					case "defined":
						$theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
					break;
				}
				return $theValue;
			}
		}
		
		$editFormAction = $_SERVER['PHP_SELF'];
		if (isset($_SERVER['QUERY_STRING'])) {
			$editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
		}

		if ((isset($_POST["MM_update"])) && ($_POST["MM_update"] == "Form")) {
		
				// select para edição
				mysql_select_db($database_tecnologia, $tecnologia);
				// Transformo o recurso em um array	
				$sql = sprintf("SELECT * FROM usuarios WHERE codUsuario ='".$id_login."'"); 
				$query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
				$linha = mysql_fetch_array($query);		
				$senha_atual = $linha['senha'];	
		
						/* Antes de atualizar para uma nova senha, verifico se é igual ao o do banco de dados */
			if($senha_atual == md5($_POST['senha_atual'])){
			
				if($senha_atual == md5($_POST['nova_senha'])){
					sleep(0);                       					   // tempo para redirecionar
					header("Location: formAltSenha.php?action=pwd_equal"); // local para onde estou redirecionando	
				}else{						
					$updateSQL = sprintf("UPDATE usuarios SET  
													data_cadastro=%s, 
													hora=%s, 
													usuario_cadastro=%s, 
													senha=%s									
										WHERE codUsuario ='".$id_login."'",
					
								GetSQLValueString(date("Y/m/d"), "date"),
								GetSQLValueString(date('G:i:s'), "text"),
								GetSQLValueString($_SESSION['codUsuario'], "int"),
								GetSQLValueString(md5($_POST['nova_senha']), "text"));				
				
					mysql_select_db($database_tecnologia, $tecnologia);
					$Result1 = mysql_query($updateSQL, $tecnologia) or die(mysql_error());				
				}
			}else {
				sleep(0);                       					  // tempo para redirecionar
				header("Location: formAltSenha.php?action=notEqual"); // local para onde estou redirecionando		
			}
				
				if($Result1){
					echo "<script type=\"text/javascript\">
								alert('Senha Alterada com sucesso!');
								window.location.href='../bemVindo.php';
						  </script>";
				}else {
					echo "<script type=\"text/javascript\">
								alert('Falha na Alteração dos dados!');
								window.location.href='../bemVindo.php';
						  </script>";
					}
				}
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<title>..:: Alterar informa&ccedil;&otilde;es do Login - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
	<link href="../estilo/estilo.css" rel="stylesheet" type="text/css" />
    <!-- javaScript -->
    <script type="text/javascript" src="../js/jquery-1.2.6.js"></script>
    <script type="text/javascript" src="../js/jquery-validate.js"></script> 
    <script type="text/javascript">
		<!-- Validação -->
		$(document).ready( function() {
			$("#Form").validate({
				// Define as regras
				rules:{
					senha_atual:{
						required: true
					},
					nova_senha: {
						required: true,
						minlength: 6
					},
					conf_nova_senha: {
						required: true,
						equalTo: "#nova_senha"
					}

				},
				// Define as mensagens de erro para cada regra
				messages:{
					senha_atual:{
						required: "Informe sua Senha Atual"
					},
					nova_senha:{
						required: "Informe sua Nova Senha",
						minlength: "A senha deve conter, no mínimo, 6 caracteres"
					},
					conf_nova_senha:{
						required: "Confirme sua Nova Senha",
						minlength: "A senha deve conter, no mínimo, 6 caracteres",
						equalTo: "Senhas diferentes"
					}
				}
			});
		});
	</script>  
</head>
<body onLoad="vertical();horizontal();">
	<!--menu-->
	<?php @include_once('../menu/menu.php'); ?>
	<br />
    <div id="formCadDocumento" align="center">
        <form action="<?php echo $editFormAction; ?>" method="POST" name="Form" id="Form">
            <fieldset style="width: 500px;">
                <p class="titulo">Alterar Senha Pessoal</p>
                <p align="left">
                    <label class="vermelhorNegrito">Digite sua Senha Atual:</label>
                    <input name="senha_atual" type="password" id="senha_atual"  class="cad_login2" size="70" maxlength="90">
                </p>
                <p align="left">
                    <label class="vermelhorNegrito">Escolha uma Nova Senha:</label>
                    <input name="nova_senha" type="password" id="nova_senha" class="cad_login2" size="70"  maxlength="90">
                </p>
                <p align="left">
                    <label class="vermelhorNegrito">Confirme sua Nova senha:</label>
                    <input name="conf_nova_senha" type="password" id="conf_nova_senha" class="cad_login2" size="70" maxlength="90">
                </p>
                <br />
                <p align="left">
                    <div align="center" class="msg">
						<?php if ($_GET['action'] == 'notEqual'){ 
							  		echo "A Senha Atual não confere!"; 
							  }else if ($_GET['action'] == 'pwd_exp'){
									echo "Sua senha Expirou, favor cadastrar uma nova Senha!"; 
							  }else if ($_GET['action'] == 'pwd_equal'){
									echo "A Nova Senha é igual a Senha Atual, favor informar uma Senha diferente!"; 
							  }
						?>
                    </div>
                </p>
                <p align="center">
                	<input type="submit" name="Alterar" value="Alterar" class="botao">
                </p>
          </fieldset>
        		<input type="hidden" name="MM_update" value="Form">
        </form>
    </div>
</body>