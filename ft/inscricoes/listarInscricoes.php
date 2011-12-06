<? 
	include_once('../conexao/ft.php');
	# insiro sess�o para poder acessar as p�ginas
    include_once("../login/protege_pagina.php");

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

$query_listaInscricoes = "SELECT * FROM inscricoes ORDER BY id desc";
$query_limit_listaInscricoes = sprintf("%s LIMIT %d, %d", $query_listaInscricoes, $startRow_listaInscricoes, $maxRows_listaInscricoes);
$listaInscricoes = mysql_query($query_limit_listaInscricoes) or die(mysql_error());
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
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>..:: FT ::..</title>
<link href="../css/estilo.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="container">
    <div id="menu">
        <?php @include('../menu/menu.php'); ?>
    </div>
        <table width="778" border="0" cellpadding="0" align="center">
        <?php if(!$row_listaInscricoes): ?>
	   		<tr>
	   			<td align="center"><b>N�o existem dados cadastrados!</b></td>
			</tr>
	 	<?php else:?>
            <tr>
              <th width="69" class="cabecalhoLista" scope="col"><div align="center">Editar</div></th>
              <th width="100" class="cabecalhoLista" scope="col">Inscri��o</th>
              <th width="344" class="cabecalhoLista" scope="col">Nome do Candidato</th>
              <th width="122" class="cabecalhoLista" scope="col">CPF</th>
              <th width="122" class="cabecalhoLista" scope="col">Despesa Familiar</th>
              <th width="67" class="cabecalhoLista" scope="col">2&ordm; via</th>
          </tr>
        <?php $color = 0; ?>
        <?php do { ?>
            <tr class="<?php echo ($color % 2 == 1) ? "cinza" : ""; ?>">
                <td>
                <div align="center">
                    <a href="alterarCandidato.php?id=<?php echo $row_listaInscricoes['id']; ?>" class="mascara">Editar</a>
                </div>
                </td>
                <td><div align="center"><?php echo $row_listaInscricoes['id']; ?></div></td>
                <td><?php echo $row_listaInscricoes['nome']; ?></td>
                <td><div align="left"><?php echo $row_listaInscricoes['cpf']; ?></div></td>
                <td><div align="left">R$:&nbsp;<?php echo $row_listaInscricoes['despesa_familiar']; ?></div></td>
                <td><div align="center"><a href="../imprime_ficha/form_ficha.php?id=<?php echo $row_listaInscricoes['id']; ?>" class="mascara">Imprimir</a></div></td>
            </tr>
            <?php $color++; ?>
            <?php } while ($row_listaInscricoes = mysql_fetch_assoc($listaInscricoes)); ?>
            <tr>
                <td colspan="6">
                    <div align="center" id="msg">
                        <?php if ($_GET['action'] == 'success') { echo "Cargo exclu&iacute;do com sucesso!"; } ?>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <table width="323" height="22" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="97">
                                <a href="<?php printf("%s?pageNum_listaInscricoes=%d%s", 
                                    $currentPage, max(0, $pageNum_listaInscricoes - 1), $queryString_listaInscricoes); ?>">&lt;&lt; Anterior
                                </a>
                           </td>
                            <td width="136">
                                <div align="center"> 
                                    <?php echo ($startRow_listaInscricoes + 1) ?> at&eacute; 
                                    <?php echo min($startRow_listaInscricoes + $maxRows_listaInscricoes, $totalRows_listaInscricoes) ?> total de 
                                    <?php echo $totalRows_listaInscricoes ?> 
                                </div>
                            </td>
                            <td width="90">
                            <div align="right">
                                <a href="<?php printf("%s?pageNum_listaInscricoes=%d%s", $currentPage, 
                                min($totalPages_listaInscricoes, $pageNum_listaInscricoes + 1),
                                $queryString_listaInscricoes); ?>">Pr&oacute;ximo &gt;&gt;</a>
                            </div>
                       </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <?php endif;?>
    </div>
</body>
</html>