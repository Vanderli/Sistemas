<? # conexão com banco de dados
	include("../conexao_db/conexaoTecnologia.php");
	# id da noticia   
	if (isset($_GET['not_id'])) { $not_id = $_GET['not_id']; }	
	# Transformo o recurso em um array	
	$sql = sprintf("SELECT * FROM noticias WHERE not_id=$not_id");	
	$query = @mysql_query($sql) or die($msg[2]);
	$linha = @mysql_fetch_assoc($query);
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- CSS Notícia -->
<link href="../css/print_noticia.css" lang="pt-BR" media="print, screen" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon" />
 
<div id="not_print_container">  

  <div id="not_print_topo">    
    <img src="../img/topo/topo_brasao_menor.png" alt="Imagem PF" />
  </div>  
  
    <div id="not_print_conteudo">
        <h4><?=utf8_encode($linha['not_titulo'])?></h4>
        <p id="not_print_subdesc"><?=utf8_encode($linha['not_comentario'])?></p>
        <p><?=utf8_encode($linha['not_descricao'])?></p>  
    </div> 
   
    <div id="not_print_rdp">
        <p>PF - http://</p>
        <div id="not_btn">   
            <a href="javascript: window.print();" id="not_print_btn">Imprimir</a>
            <a href="javascript: window.close();" id="not_close_btn">Fechar</a>
        </div>   
    </div>
  
</div>