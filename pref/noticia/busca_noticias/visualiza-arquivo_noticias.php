<? 	# conexão com banco de dados 
	include("../../conexao_db/conexaoTecnologia.php");
	# biblioteca com funções PHP
	@include("../../lib_PHP/biblioteca.php");	
	
	# guardo o texto em uma variável
	$busca_noticia    = $_GET['campo_busca'];
	# para ver as ultimas noticias cadastradas
	$ultimas_noticias = $_GET['ult_not'];	

		# LISTAGEM
		$pag_atual = $_SERVER["PHP_SELF"];		
		# totap de registros por páginas
		$max_pag = 7;
		$pag_ini = 0;
		
		if (isset($_GET['ini'])) { $pag_ini = $_GET['ini']; }		
		$row_list = $pag_ini * $max_pag;
		
		if($ultimas_noticias == 'true'){	
			$sql = "SELECT * FROM noticias WHERE not_status = 'ATIVO' ORDER BY not_publicado_em DESC";
		}else{	
			$sql = "SELECT * FROM noticias 
					WHERE not_descricao LIKE '%".$busca_noticia."%' 
					AND not_status = 'ATIVO'
					ORDER BY not_publicado_em DESC";
		}		
				
		$sql_limit = sprintf("%s LIMIT %d, %d", $sql, $row_list, $max_pag);		
		$query = @mysql_query($sql_limit) or die($msg[2]);
		$res_not = mysql_num_rows($query);
		
		if (isset($_GET['tot'])){ $tot = $_GET['tot']; } 
		else {
			$insc_geral = mysql_query($sql);
			$tot = mysql_num_rows($insc_geral);
		}
		$tot_pag = ceil($tot/$max_pag)-1;
		$lista_insc = "";
		if (!empty($_SERVER['QUERY_STRING'])) {
			$params = explode("&", $_SERVER['QUERY_STRING']);
			$newParams = array();
		
			foreach ($params as $param) {
				if (stristr($param, "ini") == false &&	stristr($param, "tot") == false) {
					array_push($newParams, $param);
				}
			}
			if (count($newParams) != 0) { $lista_insc = "&" . htmlentities(implode("&", $newParams)); }
		}
		$lista_insc = sprintf("&tot=%d%s", $tot, $lista_insc);
		
		$msg_noticia = '';
		if( empty($busca_noticia) && ($ultimas_noticias != 'true') ){	
			$msg_noticia = 'Favor digitar a notícia que você deseja!';
		
		}else if(!$res_not){
			$msg_noticia = 'Não foi encontrado nenhuma notícia similar a sua pesquisa!';
		}		
		
?>

<div id="cont_arq_noticias">
	<h3>Arquivo de Notícias</h3>
    
<? if( $msg_noticia ) { ?>
	<div id="msg_vazio"><?=$msg_noticia?></div>
<? }else{ ?>         
	<ul class="arquivo_noticias">
	<? while ($linha = mysql_fetch_assoc($query)) :?>
		<li>
        	<h4>
            	<a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha['not_id']?>">
					<?=utf8_encode($linha['not_comentario'])?>
                 </a>
            </h4>
            <p class="data_atualizacao">
            	Ultima atualização em <?=utf8_encode(formataDatatimeBR($linha['not_publicado_em']))?>
            </p>
            <p class="descreve_not">
            	<a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha['not_id']?>" title="<?=utf8_encode($linha['not_comentario'])?>">
					<?=utf8_encode($linha['not_titulo'])?>
                </a>
        	</p>
        </li>
	<? endwhile; ?>
	</ul>

    <div id="arq_noticias_paginacao">
        <a href="<? printf("%s?ini=%d%s", $pag_atual, max(0, $pag_ini - 1), $lista_insc)?>" title="Anterior" id="paginacao_ant">
            Anterior 
        </a>
        <p><?=($row_list + 1)?> até <?=min($row_list + $max_pag, $tot)?> total de <?=$tot?></p>
        <a href="<? printf("%s?ini=%d%s", $pag_atual, min($tot_pag, $pag_ini + 1), $lista_insc)?>"  title="Próximo" id="paginacao_prox">
            Próximo
        </a>
    </div>
<? } ?>

</div><!-- fecha div cont_arq_noticias -->