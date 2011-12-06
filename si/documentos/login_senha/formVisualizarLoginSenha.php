<?php   
		/* conexo com banco de dados */
		include("../conexao_db/conexaoTecnologia.php");
		/* insiro sesso para poder acessar as pginas */ 
		include("../login/protege_pagina.php");
		/* biblioteca */
		include("../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;
		
		// BUSCO O ID DO FORMULRIO
		$id_login = "-1";
		if (isset($_GET['id_login'])) {
			$id_login = $_GET['id_login'];
		}
		
		/* VISUALIZAR INFORMAES */
		mysql_select_db($database_tecnologia, $tecnologia);
		// Transformo o recurso em um array	
		$sql = sprintf("SELECT * FROM usuarios WHERE codUsuario ='".$id_login."'"); 
		$query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
		$linha = mysql_fetch_assoc($query);	
		//print_r($linha);exit; 
?>
<html>
<head>
	<title>..:: Visualizar informaes do Login - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<link href="../estilo/estilo.css" rel="stylesheet" type="text/css" />
</head>
<body onLoad="vertical();horizontal();">
	<!--menu-->
	<?php @include_once('../menu/menu.php'); ?>
	<br />
    <div id="formCadDocumento" align="center">
        <form action="<?php echo $editFormAction; ?>" method="POST" name="Form" id="Form">
            <fieldset style="width: 500px;">
                <p class="titulo">Visualizar informaes do Login</p>
                <p align="left">
               	  <label class="vermelhorNegrito">Nome</label>
                		<input name="nome" type="text" id="nome" value="<?=$linha['nomeUsuario']?>" size="70" maxlength="90" class="disabled" readonly />
            </p>
                <p align="left">
               	  <label class="vermelhorNegrito">Login</label>
                		<input name="login" type="text" id="cad_login" value="<?=$linha['login']?>" size="70"  maxlength="90" class="cad_login" disabled>
            </p>
                <p align="left">
               	  <label class="vermelhorNegrito">Senha</label>
                		<input name="senha" type="text"  id="senha" size="70" maxlength="90" value="NO EXIBIDA POR MOTIVOS DE SEGURANA!" disabled>
            </p>
                <p align="left">
                  <label>Mdulo</label>
                    <select name="modulo" id="modulo" disabled>
                    <option value=" ">-- Selecione -- </option>
<option value="1" <?php if (!(strcmp("ADMINISTRADOR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Administrador</option>
<option value="2" <?php if (!(strcmp("CADASTRAR E CONSULTAR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Cadastrar e Consultar</option>
<option value="3" <?php if (!(strcmp("CONSULTAR", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Consultar</option>
<option value="4" <?php if (!(strcmp("TRAMITES", $linha['modulo']))) {echo "selected=\"selected\"";} ?>>Tramites</option>
                  </select>
            </p>
                <p align="left">
                  <label>Status</label>
                        <select name="status" id="status" disabled>
                            <option value=" ">-- Selecione -- </option>
                        <option value="1" <?php if (!(strcmp("ATIVO", $linha['status']))) {echo "selected=\"selected\"";} ?>>Ativo</option>
                        <option value="2" <?php if (!(strcmp("INATIVO", $linha['status']))) {echo "selected=\"selected\"";} ?>>Inativo</option>
                  </select>
            </p>
                <br />
                <p align="center">
                   <input type="button" onClick="javascript:history.go(-1);" name="Voltar" value="Voltar" class="botao" />
                </p>
          </fieldset>
        </form>
    </div>
</body>
</html>