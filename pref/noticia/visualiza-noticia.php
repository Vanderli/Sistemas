<? /* conexão com banco de dados */
   include("../conexao_db/conexaoTecnologia.php");
   # biblioteca com funções PHP
   @include("../lib_PHP/biblioteca.php");
   
   if (isset($_GET['not_id'])) { $not_id = $_GET['not_id']; }	
      
	// Transformo o recurso em um array	
	$sql = sprintf("SELECT * FROM noticias WHERE not_id=$not_id");	
	$query = @mysql_query($sql) or die($msg[2]);
	$linha = @mysql_fetch_assoc($query);
	
	// Libera um resultado da memória
	mysql_free_result($query);
	
	# endereço de onde está a biblioteca para gerar o thumbnail
	$thumbnail = "../lib_PHP/thumbnail.php?gd=2&src=../noticia/not_foto/not_id_";
?>
<script language="javascript">
	imprimir = function(not_id) {
		window.open('imprime-noticia.php?not_id='+not_id,'imprimir','width=800,height=800,resizable=0');
	}
</script>

<div id="cont_noticia">  
    <h3>Notícia</h3>
    <div id="not_tam_font">
        <a href="#" title="Aumentar Fonte" id="acs_aumenta_fonte_not">
        	<img src="<?=URL?>/img/acessibilidade/icons/a_mais_2.png" alt="+ A" title="Aumentar Fonte" />
        	<span>A+</span>
        </a>
        <a href="#" title="Diminuir Fonte" id="acs_reduz_fonte_not">
        	<img src="<?=URL?>/img/acessibilidade/icons/a_menos_2.png" alt="- A" title="Diminuir Fonte" />
        	<span>A-</span>
        </a>
    </div>
    <p id="noticia_data_pub">Publicado em <?=utf8_encode(formataDatatimeBR($linha['not_publicado_em']))?></p>
    <h4><?=utf8_encode($linha['not_titulo'])?></h4>
    <p id="noticia_subdesc"><?=utf8_encode($linha['not_comentario'])?></p>
    
    <div id="noticia_ilustra">      
        <img src="<?=$thumbnail?><?=$linha['not_id']?>/<?=$linha['not_img']?>&maxw=600" alt="Imagem Notícia" /> 
    </div>
    
    <div id="noticia_descreve">
    	<?=utf8_encode($linha['not_descricao'])?>
    </div>    
    	<a href="javascript: imprimir(<?=$linha['not_id']?>);" title="Imprimir Notícia" id="noticia_print">Imprimir</a> 

</div>
<?  # fecha conexão com db
	mysql_close($conn);
?>