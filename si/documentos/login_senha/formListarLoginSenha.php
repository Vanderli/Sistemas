<?php 
		/* conexo com banco de dados */
		include("../conexao_db/conexaoTecnologia.php");
		/* insiro sesso para poder acessar as pginas */ 
		include("../login/protege_pagina.php");
		/* biblioteca */
		include("../Biblioteca/biblioteca.php");

		// LISTAGEM
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
		
		$maxRows_listaInscricoes = 20;
		$pageNum_listaInscricoes = 0;
		if (isset($_GET['pageNum_listaInscricoes'])) {
		  $pageNum_listaInscricoes = $_GET['pageNum_listaInscricoes'];
		}
		$startRow_listaInscricoes = $pageNum_listaInscricoes * $maxRows_listaInscricoes;
		
		mysql_select_db($database_tecnologia, $tecnologia);
		
		/* ocultar o login do usurio administrador */
		$query_listaInscricoes = "SELECT * FROM usuarios 
								  WHERE !(login = 'adm' AND codUsuario = 1)
								  ORDER BY codUsuario DESC";
								  
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>..:: Listagem de Logins - Sistema Administrativo ::..</title>
    <!-- icon do SIG -->
    <link rel="shortcut icon" href="../imagens/sgd_icon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<!-- estilos -->
    <link href="../estilo/estilo.css" rel="stylesheet" type="text/css" /> 
</head>
<body onLoad="vertical();horizontal();">

	<?php include('../menu/menu.php'); ?>
		<br />
        <div align="center">
        <table width="770" border="0" align="center" class="borda-fina">
        <?php if(!$row_listaInscricoes): ?>
	   		<tr>
	   			<td align="center" style="padding:20px"><p class="msg">No existem Logins cadastrados!</p></td>
			</tr>
	 	<?php else:?>
            <tr>
            	<td colspan="6" align="center" class="titulo"><h3>Listagem de  Logins </h3></td>
            </tr>
            <tr>
              <th width="70" class="cabecalhoLista" scope="col">Editar</th>
              <th  width="200"class="cabecalhoLista" scope="col">Nome</th>
              <td width="150" class="tituloLista">Login</td>
              <td width="170" class="tituloLista">Mdulo</td>
              <th  width="90"class="cabecalhoLista" scope="col">Status</th>
              <th  width="90"class="cabecalhoLista" scope="col">Detalhes</th>
          </tr>
        <?php $color = 0; ?>
        <?php do { ?>
            <tr class="<?php echo ($color % 2 == 1) ? "cinza" : ""; ?>">
            	<!--editar Login-->
                <td align="center">
                    <a href="formAltLoginSenha.php?id_login=<?php echo $row_listaInscricoes['codUsuario']; ?>" class="mascara">Editar</a>
                </td>
                <td align="left">   <?=limita_caracteres($row_listaInscricoes['nomeUsuario'],25); ?>					      </td>
                <td align="left">   <?=limita_caracteres($row_listaInscricoes['login'],20); ?>					   </td>
                <td align="center">   <?=$row_listaInscricoes['modulo']; ?>					   </td>
                <td align="center">   <?=$row_listaInscricoes['status']; ?>					   </td>
                <td align="center"><a href="formVisualizarLoginSenha.php?id_login=<?php echo $row_listaInscricoes['codUsuario']; ?>" class="mascara">Visualizar</a></td>
		</tr>
            <?php $color++; ?>
            <?php } while ($row_listaInscricoes = mysql_fetch_assoc($listaInscricoes)); ?>
            <tr>
                <td colspan="6">
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
                                $queryString_listaInscricoes); ?>">Pr&oacute;ximo &gt;&gt;</a>                              </td>
                        </tr>
                    </table>
                    </div>
              </td>
          </tr>
        </table>
        <?php endif;?>
        </div>
</body>
</html>