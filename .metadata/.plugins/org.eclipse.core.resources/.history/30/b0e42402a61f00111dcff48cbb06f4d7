<?php
	/* insiro sessão para poder acessar as páginas */ 
	include("../login/protege_pagina.php");
?>
<html><head>
	<title>..:: Pesquisa Geral - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">	
    <link href="../estilo/estiloPesquisa.css" rel="stylesheet" type="text/css" />
    <!-- javaScript -->
	<script type="text/javascript" src="../js/jquery-1.2.6.js"></script>
    <script type="text/javascript" src="../js/jquery-mask.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
			// máscara campos
			$("#radio_nome").click(function(){
					$("#busca").unbind();
	
			});
			$("#radio_documento").click(function(){
					$("#busca").unbind();
	
			});
			$("#radio_assunto").click(function(){
					$("#busca").unbind();
	
			});
			$("#radio_tipo").click(function(){
					$("#busca").unbind();
	
			});
			/* formatação de data */
			$("#radio_data").click(function(){
					$("#busca").unbind();
					$("#busca").mask("99/99/9999");
			});
	
	});
	</script>
</head>
<body onLoad="vertical();horizontal();">
<?php include('../menu/menu.php'); ?>
	<br />
    <div id="formCadDocumento" align="center">
        <fieldset style="width: 760px;">
        <form action="formResConGeral.php" method="GET" name="Form" id="Form">
                <!-- título da tabela -->
                <h3 align="center">
                  <p class="titulo">Pesquisa - Geral</p>
                </h3><br />
                <!-- tabela com opções (rádios) -->
                <table border="0">
                    <tr>
                    	<td class="radio"><input id="radio_nome" name="tipo_consulta" type="radio" value="1" /></td>
                    	<td>&nbsp;Nome</td>
                    	<td class="radio"><input id="radio_documento" name="tipo_consulta" type="radio" value="2" /></td>
                    	<td>&nbsp;Nº Documento</td>
                        <td class="radio"><input id="radio_assunto" name="tipo_consulta" type="radio" value="3" /></td>
                    	<td>&nbsp;Assunto</td>
                    	<td class="radio"><input id="radio_tipo" name="tipo_consulta" type="radio" value="4" /></td>
                    	<td>&nbsp;Tipo do Documento</td>
                        <td class="radio"><input id="radio_data" name="tipo_consulta" type="radio" value="5" /></td>
                    	<td>&nbsp;Data</td>
                        
                        
                    </tr>
                </table>
                <!-- tabela com campo de pesquisa -->
                <table width="579" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
                        <td width="135"  align="left" style="padding-top:30px; padding-bottom:30px; padding-left:35px;">
                        	Digite a Consulta:                        </td>
                  <td width="402"  align="left">
                           
                <input name="busca" type="text" id="busca" size="70" maxlength="50" />
                        </td>
                  </tr>
                    <tr>
                        <td colspan="2"><div align="center" id="msg">
                            <?php if ($_GET['action'] == 'dontAcess') { echo "Escolha Alguma opção e Digite a Consulta!"; } ?></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="padding-bottom:10px; padding-top:10px;">
                            <div align="center">
                                <input name="action" type="submit" id="botao" class="botao" value="CONSULTAR" onClick="return valida()" />
                            </div>
                       </td>
                    </tr>
                </table>
        </form>
        </fieldset>
    </div>
</body>
</html>