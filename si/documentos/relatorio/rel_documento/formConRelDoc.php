<?php
		/* conexao com banco de dados */
		include("../../conexao_db/conexaoTecnologia.php");
 		/* insiro sessao para poder acessar as paginas */ 
		include("../../login/protege_pagina.php");
		/* biblioteca */
		include("../../Biblioteca/biblioteca.php");
		// para poder utilizar a biblioteca de data
		$data = new DataHora;
?> 
<html>
<head>
<title>..:: Gerar Relat&oacute;rio de Documentos - Sistema Administrativo ::..</title>
	<!-- icon do SIG -->
    <link rel="shortcut icon" href="../../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <!-- estilos -->
    <link href="../../estilo/estilo_radio_tra.css" rel="stylesheet" type="text/css"/> 
    
    <!-- javaScript -->
    <script type="text/javascript" src="../../js/jquery-1.2.6.js"></script>
    <script type="text/javascript" src="../../js/jquery-mask.js"></script>
    <script type="text/javascript" src="../../js/jquery-validate.js"></script>     
	<script type="text/javascript">	
		<!-- popular combo -->
		$().ready(function() { // quando o formulario for lido
		$("select[@name=origem1]").change(function(){//na evento ONCHANGE do campo origem1
			$('select[@name=origem2]').html('<option value="sda">Procurando :::::::</option>'); 
			$.post('montacombo_rel.php', //pagina onde contem o codigo php com a query que vai popular o combo
				{ origem1 : $(this).val() }, //passa a varievel origem1 como parametro com o codigo da origem1
					function(resposta){
						$('select[@name=origem2]').html(resposta); //pego a resposta e insiro no combo origem2
    				}
    			);
    		});
   		 });
		$(function() { // quando o formulario for lido
			<!-- Mascara dos campos -->
			$('#dataRecebimento').mask("99/99/9999");
			$('#data_inicio').mask("99/99/9999");
			$('#data_final').mask("99/99/9999");
		});
		
		<!-- Validacao -->
		$(document).ready( function() {
			$("#Form").validate({
				// Define as regras
				rules:{
					data_inicio:{
						required: true, date: true
					},
					data_final:{
						required: true, date: true
					}
				},
				// Define as mensagens de erro para cada regra
				messages:{
					data_inicio:{
						required: "Informe a Data Inicio",
						date: "Data Invalida"
					},
					data_final:{
						required: "Informe a Data Final",
						date: "Data Invalida"
					}
				}
			});
		});
	</script>   
</head>
<body onLoad="vertical();horizontal();">
<?php include('../../menu/menu.php'); ?>
<br />
    <div id="formCadDocumento" align="center">
        <form action="imprime_ficha/formImpRelDoc.php"  method="POST" name="Form" id="Form">
            <fieldset style="width: 497px;">	
                <p class="titulo">Gerar Relat&oacute;rio de Documentos</p>
                <!-- USUARIO -->
                <p align="left">
                    <label><span>
                    </span>Cadastrado por</label>
                        <select name="usuarioCadastro" id="usuarioCadastro" class="gerar_relatorio">
                            <option value="">- Selecione -</option>
                            <?php 
								mysql_select_db($database_tecnologia, $tecnologia);
								// varro as informacoes do banco de dados
								$sql = sprintf("SELECT * FROM usuarios ORDER BY nomeUsuario ASC");
								$rs = mysql_query($sql);
								// Obtem o resultado de uma linha como um objeto
								while($row = mysql_fetch_object($rs)):?>
								<option value="<?=$row->codUsuario?>"><?=$row->nomeUsuario?></option>
                            <?php endwhile;?>
                        </select>
                </p>             
                <!-- DATA INICIO -->
                <p align="left">
                    <label>Data Inicio</label>
                    	<input name="data_inicio" type="text" id="data_inicio" size="50" class="gerar_relatorio"/>
                </p>
                <!-- DATA FINAL -->
                <p align="left">
                    <label>Data Final</label>
                    	<input name="data_final" type="text" id="data_final" size="50" class="gerar_relatorio"/>
                </p>
                <p align="left">
                    <!-- COMBO ORIGEM 1 -->
                    <label>Sec Orgao de Origem</label>
                    <select name="origem1" id="origem1" class="gerar_relatorio">
                        <option value="">- Selecione -</option>
                        <?php 
								mysql_select_db($database_tecnologia, $tecnologia);
								// varro as informacoes do banco de dados
                                $sql = sprintf("SELECT * FROM origem1 WHERE status_origem1='ATIVO' ORDER BY sigla_origem1");
                                $rs = mysql_query($sql);
                                // Obtem o resultado de uma linha como um objeto
                                while($row = mysql_fetch_object($rs)):?>
                                    <option value="<?=$row->cod_origem1?>"><?=$row->sigla_origem1?></option>
                               <?php endwhile;?>
                        </select>
                </p>
      			<p align="left">
                	<!--COMBO ORIGEM 2-->
                    <label>Depto / Orgao de Origem</label>
                        <select name="origem2" id="origem2" class="gerar_relatorio">
                            <option id="opcoes" value="">-- Primeiro selecione Sec./orgao de Origem --</option>
                        </select>
                    </p>
        		<!-- TIPO DOCUMENTO -->
                <p align="left">
                <label>Tipo Documento</label>
                    <select name="tipo_documento" id="tipo_documento" class="gerar_relatorio">
                        <option value="">- Selecione -</option>
							<?php 
								mysql_select_db($database_tecnologia, $tecnologia);
								// varro as informacoees do banco de dados
								$sql_2 = sprintf("SELECT * FROM tipo_documento WHERE status_tipo='ATIVO' ORDER BY nome_tipo ASC");
								$rs_2 = mysql_query($sql_2);
                            // Obtem o resultado de uma linha como um objeto
                            while($row_2 = mysql_fetch_object($rs_2)):?>
                            <option value="<?=$row_2->cod_tipo?>"><?=$row_2->nome_tipo?></option>
                        <?php endwhile;?>
                    </select>
                </p>
                <!-- ASSUNTO -->
                <p align="left">
                    <label>Assunto</label>
                    	<input name="assunto" type="text" id="assunto" size="50" maxlength="90" class="gerar_relatorio"/>
                </p>
                <!-- NOME -->
                <p align="left">
                    <label>Nome</label>
                    	<input name="nome" type="text" id="nome" size="50" maxlength="90" class="gerar_relatorio"/>
                </p>
                <!-- RECEBIDO POR -->
                <p align="left">
                    <label>Recebido por</label>
                    <select name="recebidoPor" id="recebidoPor" class="gerar_relatorio">
                        <option value="">- Selecione -</option>
                        <?php 
							mysql_select_db($database_tecnologia, $tecnologia);
							// varro as informacoes do banco de dados
							$sql = sprintf("SELECT * FROM recebido_por ORDER BY nome ASC");
							$rs = mysql_query($sql);
                        // Obtem o resultado de uma linha como um objeto
                        while($row = mysql_fetch_object($rs)):?>
                        <option value="<?=$row->cod_rec_por?>"><?=$row->nome?></option>
                        <?php endwhile;?>
                    </select>
                </p>
                <!-- DATA RECEBIMENTO -->
                <p align="left">
                    <label>Data Recebimento</label>
                    	<input name="dataRecebimento" type="text" id="dataRecebimento" size="50" class="gerar_relatorio"/>
                </p>
                <br />
                <!-- RADIOS TRAMITE -->
                <div id="radio" >
	  				<table border="0" class="radio_tramite">
                        <tr>
                        	<td align="right"><input name="rd_tramite" type="radio" id="com_tramite" value="1" checked/></td>   
                        	<td class="txt_rd">&nbsp;Com Tramite</td>
                            <td align="right"><input name="rd_tramite" type="radio" id="sem_tramite" value="2" /></td>
                            <td class="txt_rd">&nbsp;Sem Tramite</td>
                        	<td align="right"><input name="rd_tramite" type="radio" id="all_tramite" value="3"/></td>
                          	<td class="txt_rd">&nbsp;Geral</td>                                                   	
                        </tr>
                  </table>
				</div>
                <!-- BOTAO CONSULTAR -->
                <br >
                <p align="center">          
                	<input type="submit" name="Pesquisar" value="Pesquisar" id="Pesquisar" class="botao" />
                </p>
            </fieldset>
        </form>
    </div>
</body>
</html>