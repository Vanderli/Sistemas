<?php
require_once("xajax/xajax_core/xajax.inc.php");/*busca livraria do XAJAX*/
include "funcoes.php";//inclui as funçoes
session_start();//inicia a sessão do ano
$xajax = new xajax();//Gera a classe
$xajax->setCharEncoding('ISO-8859-1');//Caracteres especiais

/*Registra cada uma das funçoes em PHP*/
$xajax->registerFunction("Antes");
$xajax->registerFunction("Proximo");
$xajax->registerFunction("Agenda");
$xajax->registerFunction("Mostrar");
$xajax->configure('decodeUTF8Input',true);
$xajax->processRequest();//Processa a requisiçao AJAX
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Agenda de Eventos</title>
<!--Chama o estilo da pagina-->
<link rel="stylesheet" type="text/css" href="estilo.css">
<!-- Responde ao browser -->
<?php $xajax->printJavascript("xajax/"); ?>
<!--Exibe a mensagem carregando -->
<script type="text/javascript">
  xajax.callback.global.onRequest = function() {xajax.$('carregando').style.display = 'block';}
  xajax.callback.global.beforeResponseProcessing = function() {xajax.$('carregando').style.display='none';}
</script>
 <noscript>SEU NAVEGADOR NÃO SUPORTA JAVASCRIPT</noscript>
</head>

<body onload="xajax_Agenda()"><!-- Sai bunbando o calendario -->

<?php
include "sql.php";//conexão com o banco de dados

@mysql_select_db($db);//selecione o banco de dados
/*Gera as divs onde serão exibidos os dados requisitados */
 print "<div id=\"carregando\"><img src=\"load.gif\"/> carregando...</div>";
 print "<div id=\"conteudo\"></div>"; 
 print "<div id=\"eventos\"></div>";

?>

</body>
</html>