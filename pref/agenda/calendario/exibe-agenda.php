<?	require_once("xajax/xajax_core/xajax.inc.php");/*busca livraria do XAJAX*/
	include("funcoes.php");//inclui as funçoes
	if (!isset($_SESSION)) { session_start(); }
	//session_start();//inicia a sessão do ano
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

<!--Chama o estilo da pagina-->
<link rel="stylesheet" type="text/css" href="agenda.css">
<!-- Responde ao browser -->
<? $xajax->printJavascript("xajax/"); ?>
<!--Exibe a mensagem carregando -->
<script type="text/javascript">
  xajax.callback.global.onRequest = function() {xajax.$('carregando').style.display = 'block';}
  xajax.callback.global.beforeResponseProcessing = function() {xajax.$('carregando').style.display='none';}
</script>

<body onLoad="xajax_Agenda()"><!-- Sai bunbando o calendario -->

<?
	/*Gera as divs onde serão exibidos os dados requisitados */	
	 print "<div id=\"conteudo\"></div>"; 
	 print "<div id=\"eventos\"></div>";
	 print "<div id=\"carregando\"></div>";
?>

</body>