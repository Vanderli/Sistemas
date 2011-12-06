<?php 
// Headers
	header("Content-Type: text/html; charset=ISO-8859-1", true);	

/******
*
* Créditos: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
*
* Listar notícias da base de dados
*
* ******/

require_once('include/configBd.php'); 

///////////////////////////////////////////////////////////////////////////////

/* Inicio parte 1 paginação */
$pulo = 2; 
$totalPorPagina = 5; // total de linhas por pagina
if(isset($_GET['pag']) && !empty($_GET['pag']))
{
	$pagina = $_GET['pag'] ; // pagina atual
}
else
{
	$pagina = 0;
}
$inicio = ($pagina * $totalPorPagina); // linha que inicia a paginação

//select de tudo no bd
mysql_select_db($db['database'], $db['con']);
$query_total = "SELECT * FROM noticia";
$total = mysql_query($query_total, $db['con']) or die(mysql_error());
$total_rows = mysql_num_rows($total);
$totalPaginas = ceil($total_rows/$totalPorPagina); 

$query_listar = "SELECT * FROM noticia ORDER BY `data` DESC LIMIT $inicio,$totalPorPagina";
$listar = mysql_query($query_listar, $db['con']) or die(mysql_error());
$row_listar = mysql_fetch_assoc($listar);
$totalRows_listar = mysql_num_rows($listar);

/* Fim parte 1 paginação */

////////////////////////////////////////////////////////////////////////////////

function invertData($data)
{
	$data_mysql = explode(" ", $data);
	$data_mysql1 = implode("/", array_reverse(explode("-", $data_mysql[0])));
	return ($data_mysql1 . " " . $data_mysql[1]);
}

?>

<div id="listar">
<?php if ($totalRows_listar > 0) { // Show if recordset not empty ?>
<table class="list" border="1">
  <tr class="topo">
    <th scope="col">Data</th>
    <th scope="col">T&iacute;tulo</th>
    <th scope="col">Ordem</th>
    <th scope="col">&nbsp;</th>
    <th scope="col">&nbsp;</th>
  </tr>
<?php do{ ?>
  <tr class="tab">
      <td class="data"> <?php echo(invertData($row_listar['data'])); ?></td>
      <td class="tit"> <?php echo($row_listar['titulo']); ?> </td>
      <td class="ord"> <?php echo($row_listar['ordem']); ?> </td>
      <td class="alt">
				<a href='#'>
					<img src="images/alterar.gif" border="0" 
					onclick='ajaxGet("alterar.php?passo=1&id=<?php echo($row_listar['id']); ?>",document.getElementById("acao"),true)'/>
				</a>
			</td>
      <td class="exc">
				<a href='#'>
					<img src="images/excluir.gif" border="0" 
					onclick='ajaxGet("excluir.php?passo=1&id=<?php echo($row_listar['id']); ?>",document.getElementById("acao"),true)'/>
				</a>
			</td>
  </tr>
  <?php  } while ($row_listar = mysql_fetch_assoc($listar)); 
	}	
	else
	{
		echo('Nenhuma informação encontrada em nossa base de dados!');
	}
	?>
</table>
<div id=navega>
<?php
// Anterior
if($pagina > 0) 
{
 $z = $pagina - 1;
 ?>
<a href='#' onclick='ajaxGet("listar.php?pag=<?php echo($z); ?>" ,document.getElementById("acao"),true);' class="antProx"> << </a>
<?php
}

// links com números
for($i = 0; $i < $totalPaginas; $i++) {
  $z = $i + 1;
  if($i != $pagina)
	{
		?>
		<a href="#" onclick='ajaxGet("listar.php?pag=<?php echo($i); ?>" ,document.getElementById("acao"),true);' class="num"> <?php echo($z); ?> </a>
		<?php
	}
  else
	{
    echo '<a href="#" class="num1">' . $z . '</a>';
	}
}


// próximo
if($pagina < $totalPaginas-1) 
{
 $z = $pagina + 1;
?>
<a href="#" onclick='ajaxGet("listar.php?pag=<?php echo($z); ?>" ,document.getElementById("acao"),true);' class="antProx"> >> </a>
<?php
}
?>
</div>
</div>
<?php
mysql_free_result($listar);
?>
