<?php   
		/* conexão com banco de dados */
		include("../conexao_db/conexaoTecnologia.php");
		/* insiro sessão para poder acessar as páginas */ 
		include("../login/protege_pagina.php");
		/* biblioteca */
		include("../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;
		
		// BUSCO O ID DO FORMULÁRIO
		$id_login = "-1";
		if (isset($_GET['id_login'])) {
			$id_login = $_GET['id_login'];
		}
		
		// select para edição
			mysql_select_db($database_tecnologia, $tecnologia);
			// Transformo o recurso em um array	
			$sql = sprintf("SELECT * FROM usuarios WHERE codUsuario ='".$id_login."'"); 
			$query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
			$linha = mysql_fetch_assoc($query);	
			
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
		
			// seleciono o banco de dados
			mysql_select_db($database_tecnologia, $tecnologia);
			// verifico no banco se já existe o login cadastrado	
			$busca = sprintf("SELECT login FROM usuarios WHERE login = '".$_POST['login']."'"); 
			$query = mysql_query($busca, $tecnologia) or die('Clique em Voltar, e tente novamente!');	

			/* caso tenha alterado o login, verifico se o mesmo já existe no banco de dados */
			if($linha['login'] != $_POST['login']){			
				/* caso não exista nenhum registro do login informado, ai pode ser cadastrado */
				if(mysql_num_rows($query) != 0){
					sleep(0);                       					       // tempo para redirecionar
					header("Location:formAltLoginSenha.php?id_login=$id_login&action=log_equal"); // local para onde estou redirecionando	
				} else { 
					$_SESSION['nomeUsuario'] = strtoupper($_POST['nome']);
					// verifico se foi alterado a senha, caso contrário não edito
					if( (!$_POST['senha'] == ' ') || ($_POST['senha'] == 'NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!')){	
						$updateSQL = sprintf("UPDATE usuarios SET  
															data_cadastro=%s, 
															hora=%s, 
															usuario_cadastro=%s, 
															nomeUsuario=%s,
															login=%s,
															modulo=%s, 
															status=%s 							
												WHERE codUsuario ='".$id_login."'",
														
										GetSQLValueString(date("Y/m/d"), "date"),
										GetSQLValueString(date('G:i:s'), "text"),
										GetSQLValueString($_SESSION['codUsuario'], "int"),
										GetSQLValueString(strtoupper($_POST['nome']), "text"),
										GetSQLValueString(strtolower($_POST['login']), "text"),
										GetSQLValueString($_POST['modulo'], "int"),
										GetSQLValueString($_POST['status'], "int"));	
					} else {
						$updateSQL = sprintf("UPDATE usuarios SET  
															data_cadastro=%s, 
															hora=%s, 
															usuario_cadastro=%s, 
															nomeUsuario=%s,
															login=%s,
															senha=%s,
															modulo=%s, 
															status=%s 							
												WHERE codUsuario ='".$id_login."'",
							
										GetSQLValueString(date("Y/m/d"), "date"),
										GetSQLValueString(date('G:i:s'), "text"),
										GetSQLValueString($_SESSION['codUsuario'], "int"),
										GetSQLValueString(strtoupper($_POST['nome']), "text"),
										GetSQLValueString(strtolower($_POST['login']), "text"),
										GetSQLValueString(md5($_POST['senha']), "text"),
										GetSQLValueString($_POST['modulo'], "int"),
										GetSQLValueString($_POST['status'], "int"));
					} // fecha else
						/* efetuo a alteração dos dados */
						mysql_select_db($database_tecnologia, $tecnologia);
						$Result1 = mysql_query($updateSQL, $tecnologia) or die(mysql_error());				
				} // fecha if(mysql_num_rows($query)) 
			} 
			/* se o login não foi alterado, então faço outras verificações... */
			else {
				$_SESSION['nomeUsuario'] = strtoupper($_POST['nome']);
					// verifico se foi alterado a senha, caso contrário não edito
					if( (!$_POST['senha'] == ' ') || ($_POST['senha'] == 'NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!') ){	
						$updateSQL = sprintf("UPDATE usuarios SET  
															data_cadastro=%s, 
															hora=%s, 
															usuario_cadastro=%s, 
															nomeUsuario=%s,
															login=%s,
															modulo=%s, 
															status=%s 							
												WHERE codUsuario ='".$id_login."'",
														
										GetSQLValueString(date("Y/m/d"), "date"),
										GetSQLValueString(date('G:i:s'), "text"),
										GetSQLValueString($_SESSION['codUsuario'], "int"),
										GetSQLValueString(strtoupper($_POST['nome']), "text"),
										GetSQLValueString(strtolower($_POST['login']), "text"),
										GetSQLValueString($_POST['modulo'], "int"),
										GetSQLValueString($_POST['status'], "int"));	
					} else {
						$updateSQL = sprintf("UPDATE usuarios SET  
															data_cadastro=%s, 
															hora=%s, 
															usuario_cadastro=%s, 
															nomeUsuario=%s,
															login=%s,
															senha=%s,
															modulo=%s, 
															status=%s 							
												WHERE codUsuario ='".$id_login."'",
							
										GetSQLValueString(date("Y/m/d"), "date"),
										GetSQLValueString(date('G:i:s'), "text"),
										GetSQLValueString($_SESSION['codUsuario'], "int"),
										GetSQLValueString(strtoupper($_POST['nome']), "text"),
										GetSQLValueString(strtolower($_POST['login']), "text"),
										GetSQLValueString(md5($_POST['senha']), "text"),
										GetSQLValueString($_POST['modulo'], "int"),
										GetSQLValueString($_POST['status'], "int"));
					} // fecha else
						/* efetuo a alteração dos dados */
						mysql_select_db($database_tecnologia, $tecnologia);
						$Result1 = mysql_query($updateSQL, $tecnologia) or die(mysql_error());			
			}
			if($Result1){
				echo "<script type=\"text/javascript\">
					  		alert('Dados Alterados com sucesso!');
							window.location.href='formListarLoginSenha.php';
					  </script>";
			}else {
				echo "<script type=\"text/javascript\">
							alert('Falha na Alteração dos dados!');
							window.location.href='formListarLoginSenha.php';
					  </script>";
				}
			}
?>
<html>
<head>
	<title>..:: Alterar informa&ccedil;&otilde;es do Login - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
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
					nome:{
						required: true, minlength: 3
					},
					login:{
						required: true, minlength: 6
					},
					senha:{
						required: true, minlength: 6
					},
					modulo:{
						required: true
					},
					status:{
						required: true
					}
				},
				// Define as mensagens de erro para cada regra
				messages:{
					nome:{
						required: "Informe o Nome",
						minlength: "O nome deve conter, no mínimo, 3 caracteres"
					},
					login:{
						required: "Informe o Login",
						minlength: "O login deve conter, no mínimo, 6 caracteres"
					},
					senha:{
						required: "Informe a Senha",
						minlength: "A senha deve conter, no mínimo, 6 caracteres"
					},
					modulo:{
						required: "Informe o Módulo"
					},
					status:{
						required: "Informe o Status"
					}
				}
			});
		});
	</script> 
    <!-- script para verificar se campo está vazio e escrever mensagem -->   
    <script type="text/javascript">
		function msg_vazia(el, msg) {
			var hasval = /\w/.test(el.value);
			if(!hasval) {
				el.value = msg;
				addClass(el, 'disabled');
			}
			el.defaultValue = msg;
			el.onfocus = function() {
			if(this.value == this.defaultValue) {
				this.value = '';
				removeClass(this, 'disabled');
			}
		};
		el.onblur = function() {
				if(/^\s*$/.test(this.value)) {
					this.value = this.defaultValue;
					addClass(this, 'disabled');
				}
			};
		}
		function removeClass(el, classn) {
			if (!(el && el.className)) return;
				var cls = el.className.split(/\s+/), ar = [];
				for(var i = cls.length; i > 0;) if(cls[--i] != classn) ar.push(cls[i]);
				el.className = ar.join(" ");
		}		
		function addClass(el, classn) {
			removeClass(el, classn);
			el.className += ' '+classn;
		}
	</script>
</head>
<body onLoad="vertical();horizontal();">
	<!--menu-->
	<?php @include_once('../menu/menu.php'); ?>
	<br />
    <div id="formCadDocumento" align="center">
        <form action="<?php echo $editFormAction; ?>" method="POST" name="Form" id="Form">
            <fieldset style="width: 500px;">
                <p class="titulo">Alterar Informações do Login</p>
                <p align="left">
               	  <label class="vermelhorNegrito">Nome</label>
                		<input name="nome" type="text" id="nome" value="<?=$linha['nomeUsuario']?>" size="70" maxlength="90">
                </p>
                    <p align="left">
                      <label class="vermelhorNegrito">Login</label>
                            <input name="login" type="text" class="cad_login" value="<?=$linha['login']?>" size="70"  maxlength="90">
                </p>
                    <p align="left">
                      <label class="vermelhorNegrito">Senha</label>
                            <input name="senha" type="text" id="senha" class="cad_login2" size="70" maxlength="90" />
                </p>
                    <p align="left">
                      <label>Módulo</label>
                        <select name="modulo" id="modulo">
    <option value="1" <?php if (!(strcmp("ADMINISTRADOR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Administrador</option>
    <option value="2" <?php if (!(strcmp("CADASTRAR E CONSULTAR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Cadastrar e Consultar</option>
    <option value="3" <?php if (!(strcmp("CONSULTAR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Consultar</option>
    <option value="4" <?php if (!(strcmp("TRAMITES", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Tramites</option>
                      </select>  
                    </p>
                    <p align="left">
                      <label>Status</label>
                            <select name="status" id="status">
                                <option value="">-- Selecione -- </option>
                            <option value="1" <?php if (!(strcmp("ATIVO", $linha['status']))) {echo "selected=\"selected\"";} ?>>Ativo</option>
                            <option value="2" <?php if (!(strcmp("INATIVO", $linha['status']))) {echo "selected=\"selected\"";} ?>>Inativo</option>
                      </select>
                </p>
                 <br />
                <p align="left">
                    <div align="center" class="msg">
                        <?php if ($_GET['action'] == 'log_equal'){ 
                                    echo "Esse login já existe no Banco de Dados, favor informar um Login diferente!"; 
                              }else if ($_GET['action'] == 'pwd_exp'){
                                    echo "Sua senha Expirou, favor cadastrar uma nova Senha!"; 
                              }else if ($_GET['action'] == 'pwd_equal'){
                                    echo "A Nova Senha é igual a Senha Atual, favor informar uma Senha diferente!"; 
                              }
                        ?>
                    </div>
                </p>
                <br />
                <p align="center">
                  <input type="submit" name="Alterar" value="Alterar" class="botao">
                </p>
          </fieldset>
        		<input type="hidden" name="MM_update" value="Form">
        </form>
        <script type="text/javascript">
			msg_vazia(document.getElementById('senha'), 'NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!');
		</script>
    </div>
</body>
</html>