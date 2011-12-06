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
		$id_tramite = "-1";
		if (isset($_GET['id_tramite'])) {
			$id_tramite = $_GET['id_tramite'];
		}
		
		// select para listar trâmites
		 mysql_select_db($database_tecnologia, $tecnologia);
		// Transformo o recurso em um array	
		$sql = sprintf("SELECT * FROM documento WHERE codDocumento='".$id_tramite."'"); 
		$query = mysql_query($sql, $tecnologia) or die('Clique em Voltar, e tente novamente!');
		$linha = mysql_fetch_assoc($query);
		
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>..:: Histórico da Tramitação Geral - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <link href="../estilo/estilo.css" rel="stylesheet" type="text/css" />
</head>
<body onLoad="vertical();horizontal();">
<?php include('../menu/menu.php'); ?>
<br />
<div align="center">
    <form action="formTramiteExterno.php?tra_ext=<?=$id_tramite?>" method="POST" name="Form" id="Form">
    <!-- Detalhamento - Trâmite Externo -->			
    <table width="770" border="0" align="center" id="Detalhe">
  		<tr>
            <td colspan="4">
            	<!-- título da tabela -->
            	<h3 align="center">
            	  <p class="titulo">Detalhamento Documento - Geral</p>
            	</h3>
            </td>
        </tr>
		<tr>
          <td height="15" class="negrito">&nbsp;Código Doc.:</td>
      <td width="214" height="15" class="linhaBranca" id="vermelhorNegrito12">
            	<?php echo $linha['codDocumento']; ?>          </td>
			<td height="15" class="negrito">
            	&nbsp;Data:
            </td>
            <td width="269" height="15" class="linhaBranca" align="left">
            	<?=$data->formataDataBR($linha['dataCadastro']); ?>            </td>
	  </tr>
        <tr>
            <td height="15" width="109" class="negrito">&nbsp;Usuário:</td>
			<td height="15" class="linhaBranca">
				<!--usuário que cadastrou o documento-->
				<?php // varro as informações do banco de dados
                    $sql = sprintf("SELECT * FROM usuarios WHERE STATUS = 'ATIVO' AND codUsuario =".$linha['usuarioCadastro']);
                    $rs = mysql_query($sql);
                    // Obtém o resultado de uma linha como um objeto
                while($row = mysql_fetch_object($rs)):?>                           
                <!-- deixo checado apenas o combo que está no banco de dados -->
                    <?=$row->nomeUsuario;?> 
                <?php endwhile;?>   
            </td>
            <td width="145" height="15" class="negrito">&nbsp;Horário:</td>
            <td width="269" height="15" class="linhaBranca">
				<?=$linha['horaCadastro']; ?>            </td>
      </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Sec./Órgão:</td>
				<?php // ORIGEM 1
					$sql_origem1 = sprintf("SELECT * FROM origem1 WHERE status_origem1 = 'ATIVO' AND cod_origem1 = '".$linha['origem1']."'");
					$rs_origem1 = mysql_query($sql_origem1);
					$row_origem1 = mysql_fetch_array($rs_origem1);
				?>
            <td height="15" class="linhaBranca"><?=$row_origem1['sigla_origem1'];?></td>
            
            <td height="15" class="negrito">&nbsp;Depto./Órgão:</td>
            	<?php // ORIGEM 2
						$sql_origem2 = sprintf("SELECT * FROM origem2 WHERE status_origem2 = 'ATIVO' AND cod_origem2 = '".$linha['origem2']."'");
						$rs_origem2 = mysql_query($sql_origem2);
						$row_origem2 = mysql_fetch_array($rs_origem2);
				?>
            <td height="15" class="linhaBranca">
            	<?=$row_origem2['sigla_origem2'];?>
            </td>
        </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Tipo Doc.:</td>
        <?php // TIPO DE DOCUMENTO
				$sql_tipo_documento = sprintf("SELECT * FROM tipo_documento WHERE status_tipo = 'ATIVO' AND cod_tipo = '".$linha['tipo_documento']."'");
				$rs_tipo_documento = mysql_query($sql_tipo_documento);
				$row_tipo_documento = mysql_fetch_array($rs_tipo_documento);
			?>
            <td height="15" class="linhaBranca"><?=$row_tipo_documento['nome_tipo']; ?>	</td>
            <td height="15" class="negrito">&nbsp;Nº da Remessa:</td>
            <td height="15" class="linhaBranca">
            	<?=$linha['numRemessa']; ?>
            </td>
        </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Nome:</td>
            <td height="15" class="linhaBranca">
            	<?=$linha['nome']; ?>
             </td>
            <td height="15" class="negrito">&nbsp;Unidade:</td>
            <td height="15" class="linhaBranca">
            	<?=$linha['unidade']; ?>
            </td>
        </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Cargo:</td>
            <td height="15" class="linhaBranca">
            	<?=$linha['cargo']; ?>
            </td>
            <td height="15" class="negrito">&nbsp;Recebido por:</td>
			<?php // ORIGEM 2
				$sql_rec_por = sprintf("SELECT * FROM recebido_por WHERE status = 'ATIVO' AND cod_rec_por = '".$linha['recebidoPor']."'");
				$rs_rec_por = mysql_query($sql_rec_por);
				$row_rec_por = mysql_fetch_array($rs_rec_por);
            ?>
            <td height="15" class="linhaBranca">
            	<?=$row_rec_por['nome']; ?>
            </td>
        </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Data Rec.:</td>
            <td height="15" class="linhaBranca">
				<?=$data->formataDataBR($linha['dataRecebimento']); ?>
            </td>
            <td height="15" class="negrito">&nbsp;Horário de Rec.:</td>
            <td height="15" class="linhaBranca">
            	<?=$linha['horaRecebimento']; ?>
            </td>
        </tr>
        <tr>
            <td height="15" class="negrito">&nbsp;Assunto:</td>
            <td height="15" colspan="3" class="linhaBranca">
				<?=$linha['assunto']; ?>
            </td>
    </table>
<br />
    <br />
     <!-- Histórico da Tramitação-->
<?php   
    // LISTAGEM de Tramitação INTERNA
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
		$currentPage = $_SERVER["PHP_SELF"];
		
		$maxRows_listaInscricoes = 10;
		$pageNum_listaInscricoes = 0;
		if (isset($_GET['pageNum_listaInscricoes'])) {
		  $pageNum_listaInscricoes = $_GET['pageNum_listaInscricoes'];
		}
		$startRow_listaInscricoes = $pageNum_listaInscricoes * $maxRows_listaInscricoes;
		
		mysql_select_db($database_tecnologia, $tecnologia);
		
		$query_listaInscricoes = "SELECT 
									cod_tra_ext AS cod_tramite, 
									data_cadastro, 
									hora_cadastro, 
									usuario_cadastro, 
									assunto, 
									status, 
									CONCAT(dest_externo_1,':',dest_externo_2) as destino
								FROM tramite_externo
								WHERE num_documento = '".$id_tramite."'
		
								union all
		
								SELECT 
									cod_tra_int AS cod_tramite, 
									data_cadastro, 
									hora_cadastro, 
									usuario_cadastro, 
									assunto, 
									status, 
									dest_interno as destino
								FROM tramite_interno
								WHERE num_documentoo = '".$id_tramite."'
							
								ORDER BY data_cadastro, hora_cadastro ASC";

		$query_limit_listaInscricoes = sprintf("%s LIMIT %d, %d", $query_listaInscricoes, $startRow_listaInscricoes, $maxRows_listaInscricoes);
		$listaInscricoes = mysql_query($query_limit_listaInscricoes,$tecnologia) or die(mysql_error());
		$row_listaInscricoes = mysql_fetch_assoc($listaInscricoes);
		
		if (isset($_GET['totalRows_listaInscricoes'])) {
		  $totalRows_listaInscricoes = $_GET['totalRows_listaInscricoes'];
		} else {
		  $all_listaInscricoes = mysql_query($query_listaInscricoes);
		  $totalRows_listaInscricoes = mysql_num_rows($all_listaInscricoes);
		}
		$totalPages_listaInscricoes = ceil($totalRows_listaInscricoes/$maxRows_listaInscricoes)-1;
		
		$queryString_listaInscricoes = "";
		if (!empty($_SERVER['QUERY_STRING'])) {
		  $params = explode("&", $_SERVER['QUERY_STRING']);
		  $newParams = array();
		  foreach ($params as $param) {
			if (stristr($param, "pageNum_listaInscricoes") == false && 
				stristr($param, "totalRows_listaInscricoes") == false) {
			  array_push($newParams, $param);
			}
		  }
		  if (count($newParams) != 0) {
			$queryString_listaInscricoes = "&" . htmlentities(implode("&", $newParams));
		  }
		}
		$queryString_listaInscricoes = sprintf("&totalRows_listaInscricoes=%d%s", $totalRows_listaInscricoes, $queryString_listaInscricoes);
    ?>
    <table width="770" border="0" align="center" class="borda-fina">
    <?php if(!$row_listaInscricoes): ?>
    	<tr>
   	 		<td align="center" style="padding:20px"><p class="msg">Não existe Histórico da Tramitação no Código do documento: <?=$id_tramite;?></p></td>
    	</tr>
    <?php else:?>
    	<tr>
    		<td colspan="7" align="center" class="titulo">Hist&oacute;rico da Tramita&ccedil;&atilde;o - Geral</td>
    	</tr>
    	<tr>
            <td width="80" class="tituloLista">Data</td>
            <td width="80" class="tituloLista">Hora</td>
            <td width="140" class="tituloLista">Usu&aacute;rio</td>
            <td width="170" class="tituloLista">Assunto</td>
            <td width="170" class="tituloLista">Destino</td>
            <td width="70" class="tituloLista">Status</td>
            <td width="60" class="tituloLista">Detalhes</td>
    	</tr>
    <?php $color = 0; ?> 
    <?php do { ?>
    	<tr class="<?php echo ($color % 2 == 1) ? "cinza" : ""; ?>">
            <!-- Data que foi cadastrado -->
            <td align="center"><?=$data->formataDataBR($row_listaInscricoes['data_cadastro']); ?></td>
            
             <!-- horário que foi cadastrado -->
            <td align="center"><?=$row_listaInscricoes['hora_cadastro']; ?></td>
            
             <!-- Usuário que cadastrou -->
             <td>
            <!--usuário que cadastrou o documento-->
				<?php // varro as informações do banco de dados
                    $sql = sprintf("SELECT * FROM usuarios WHERE STATUS = 'ATIVO' AND codUsuario =".$row_listaInscricoes['usuario_cadastro']);
                    $rs = mysql_query($sql);
                    // Obtém o resultado de uma linha como um objeto
                while($row = mysql_fetch_object($rs)):?>                           
                <!-- deixo checado apenas o combo que está no banco de dados -->
                    <?=limita_caracteres($row->nomeUsuario,18); ?>
                <?php endwhile;?>   
           </td>
            
            <!-- Assunto -->
            <td><?=limita_caracteres($row_listaInscricoes['assunto'],22); ?></td>
        	
			 <!-- Destino do Trâmite -->
            <?php 
            		list($destino, $origem2) = explode(':', $row_listaInscricoes['destino']);
					// caso a variável que foi concatenada no select retorne dois número, então efetuo esse select            
            		if($destino && $origem2):
 					
						// ORIGEM 1
						$sql_origem1 = sprintf("SELECT * FROM origem1 WHERE status_origem1 = 'ATIVO' AND cod_origem1 = '".$destino."'");
						$rs_origem1 = mysql_query($sql_origem1);
						$row_origem1 = mysql_fetch_array($rs_origem1);
						
						// ORIGEM 2
						$sql_origem2 = sprintf("SELECT * FROM origem2 WHERE status_origem2 = 'ATIVO' AND cod_origem2 = '".$origem2."'");
						$rs_origem2 = mysql_query($sql_origem2);
						$row_origem2 = mysql_fetch_array($rs_origem2);
						
						// crio um link para o visualizar no tramite externo
						$link_visualizar = "../tramite/externo/visualizarTraExt.php?id_tra_ext=".$row_listaInscricoes['cod_tramite'];
            ?>
            <td height="15">
				<?=limita_caracteres($row_origem1['sigla_origem1'],8)?>
                	&nbsp;<img src="../imagens/seta.gif">&nbsp;
                <?=limita_caracteres($row_origem2['sigla_origem2'],8);?>
            </td>
          <?php 
					else:	
						// Caso o array retorne apenas um valor listo informações dessa tabela - Destino Interno, busca da tabela destino interno 
						// DESTINO INTERNO
						$sql_dest1 = sprintf("SELECT * FROM destino_interno WHERE status_dest_int = 'ATIVO' AND cod_dest_int = '".$destino."'");
						$rs_dest1 = mysql_query($sql_dest1);
						$linha_dest_int = mysql_fetch_array($rs_dest1);
						
						// crio um link para o visualizar no tramite interno
						$link_visualizar = "../tramite/interno/visualizarTraInt.php?id_tra_int=".$row_listaInscricoes['cod_tramite'];
            ?>
            <td align="center"><?=limita_caracteres($linha_dest_int['nome'],22); ?></td>
            <?php endif;?>
        	<!-- Status em que se encontra o trâmite -->
            <td><?=$row_listaInscricoes['status']; ?></td>
            
             <!-- Visualizar detalhes -->
            <td align="center">
            	<a href="<?=$link_visualizar?>" class="mascara">
            		Visualizar
                </a>
            </td>
    	</tr>
    <?php $color++; ?>
    <?php } while ($row_listaInscricoes = mysql_fetch_assoc($listaInscricoes)); ?>
    	<tr>
    	<td colspan="7" style="padding:20px;">
        	<div align="center">
    		<table width="440" align="center" height="22" border="0" cellpadding="0" cellspacing="0"  class="lista">
    			<tr>
                    <td width="110" align="left">
                        <a class="btnPaginacao" href="<?php printf("%s?pageNum_listaInscricoes=%d%s", 
        $currentPage, max(0, $pageNum_listaInscricoes - 1), $queryString_listaInscricoes); ?>">&lt;&lt; Anterior </a>
                      
                    </td>
                    <td width="450">
                        <div align="center"> 
                            <?php echo ($startRow_listaInscricoes + 1) ?> at&eacute; 
                            <?php echo min($startRow_listaInscricoes + $maxRows_listaInscricoes, $totalRows_listaInscricoes) ?> total de 
                            <?php echo $totalRows_listaInscricoes ?> 
                        </div>
                    </td>
                    <td width="110" align="right">
                       <a class="btnPaginacao"  href="<?php printf("%s?pageNum_listaInscricoes=%d%s", $currentPage, 
                            min($totalPages_listaInscricoes, $pageNum_listaInscricoes + 1),
                            $queryString_listaInscricoes); ?>">Pr&oacute;ximo &gt;&gt;</a>                              
                       </td>
    			</tr>
    		</table>
            </div>
            <?php endif; ?>
    	</td>
    </tr>
    </table>
    </div>
    </body>
</html>