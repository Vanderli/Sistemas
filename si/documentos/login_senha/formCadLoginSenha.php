<?php
		/* conexão com banco de dados */
		include("../conexao_db/conexaoTecnologia.php");
 		/* insiro sessão para poder acessar as páginas */ 
		include("../login/protege_pagina.php");
		/* biblioteca */
		include("../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;
			
		/* CADASTRAR INFORMAÇÕES */
		if (!function_exists("GetSQLValueString")) {
			function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = ""){
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
		if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "Form")) {
		
			// seleciono o banco de dados
			mysql_select_db($database_tecnologia, $tecnologia);
			// verifico no banco se já existe o login cadastrado	
			$busca = sprintf("SELECT login FROM usuarios WHERE login = '".$_POST['login']."'"); 
			$query = mysql_query($busca, $tecnologia) or die('Clique em Voltar, e tente novamente!');	
			
			/* caso não exista nenhum registro do login informado, ai pode ser cadastrado */
			if(mysql_num_rows($query) != 0){
				sleep(0);                       					       // tempo para redirecionar
				header("Location:formCadLoginSenha.php?action=log_equal"); // local para onde estou redirecionando	
			} else {  
					$insertSQL = sprintf("INSERT INTO usuarios 
										   (data_cadastro, 
											hora, 
											usuario_cadastro, 
											nomeUsuario,
											login,
											senha,
											modulo, 
											status) 
								VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
			
						GetSQLValueString(date("Y/m/d"), "date"),
						GetSQLValueString(date('G:i:s'), "text"),
						GetSQLValueString($_SESSION['codUsuario'], "int"),
						GetSQLValueString(strtoupper($_POST['nome']), "text"),
						GetSQLValueString(strtolower($_POST['login']), "text"),
						GetSQLValueString(md5($_POST['senha']), "text"),
						GetSQLValueString($_POST['modulo'], "int"),
						GetSQLValueString($_POST['status'], "int"));
	
				mysql_select_db($database_tecnologia, $tecnologia);
				$Result1 = mysql_query($insertSQL, $tecnologia) or die(mysql_error());
			}
			if($Result1){
			  echo "<script type=\"text/javascript\">
						 alert('Dados Cadastrados com sucesso!'); 
						 window.location.href='formListarLoginSenha.php';  
					</script>";	 
			}else {
				echo "<script type=\"text/javascript\">
							  alert('Falha no Cadastro dos dados!');
							  window.location.href='formListarLoginSenha.php';	  
					  </script>";
			}
		}
?>
<html>
<head>
	<title>..:: Cadastro de Login e Senha - Sistema Administrativo ::..</title>
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
    <script>
        <!--
            // texto que usarei para senha
            var textSenha = "abcdefghijklmnopqrstuvwxyz123456789";
            var temp='';

            function gerar_senha(tam_texto){
                temp='';
                for(i=0;i<tam_texto;i++)
                    temp += textSenha.charAt(Math.floor(Math.random()*textSenha.length));
                    return temp;
            }
            function popular(temp){
                document.Form.senha.value=gerar_senha(temp);
            }
    -->
    </script>  
</head>
<body onLoad="vertical();horizontal();">
	<!--menu-->
	<?php @include_once('../menu/menu.php'); ?>
	<br />
    <div id="formCadDocumento" align="center">
        <form action="<?php echo $editFormAction; ?>" method="POST" name="Form" id="Form">
            <fieldset style="width: 500px;">
                <p class="titulo">Cadastro de Login e Senha</p>
                <p align="left">
               	  <label class="vermelhorNegrito">Nome</label>
                		<input name="nome" type="text" id="nome" value="" size="70" maxlength="90">
                </p>
                    <p align="left">
                      <label class="vermelhorNegrito">Login</label>
                            <input name="login" type="text" class="cad_login" value="" size="70"  maxlength="90">
                </p>
                <p align="left">
                    <label class="vermelhorNegrito">Senha</label>
                        <input type="hidden" name="tam_texto" size=1 value=6 />
                        <input type="button" value="Gerar Senha" onClick="popular(this.form.tam_texto.value)" style="width:80px; height:22px;"/>
                        <input name="senha" type="text" id="senha" class="disabled" value="" style="width:100px; text-transform:none" readonly="readonly"/>
                        
                </p>
                    <p align="left">
                      <label>Módulo</label>
                        <select name="modulo" id="modulo">
                        <option value="">-- Selecione -- </option>
                        <option value="1">Administrador</option>
                        <option value="2">Cadastrar e Consultar</option>
                        <option value="3">Consultar</option>
                        <option value="4">Tramites</option>
                      </select>
                </p>
                    <p align="left">
                      <label>Status</label>
                            <select name="status" id="status">
                                <option value="">-- Selecione -- </option>
                                <option value="1">Ativo</option>
                                <option value="2">Inativo</option>
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
                    <input type="submit" name="cadastrar" value="Cadastrar" class="botao">
                </p>
            </fieldset>
        		<input type="hidden" name="MM_insert" value="Form">
        </form>
    </div>
</body>
</html>