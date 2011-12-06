<?php 
		/* conexão com banco de dados */
		include("../../../conexao_db/conexaoTecnologia.php");
		# inicializo a sessão.
		if (!isset($_SESSION)){	session_start();}			
		# impede que seja acessado alguma página sem passar pelo login 
		@include("../../login/protege_pagina.php");		
		# biblioteca com funções PHP
		@include("../../lib_PHP/biblioteca.php");	
		
		# será inserida no titulo da página
		$title = "Notícias";	
		// insiro o cabecalho da página
		include("../../includes/cabecalho/adm_meta-css-js.php"); 	
		
		# endereço de onde está a biblioteca para gerar o thumbnail
		$thumbnail = "../../lib_PHP/thumbnail.php?gd=2&src=../../noticia/not_foto/not_id_";
	
		# LISTAGEM
		$pag_atual = $_SERVER["PHP_SELF"];
		
		# totap de registros por páginas
		$max_pag = 20;
		$pag_ini = 0;
		
		if (isset($_GET['ini'])) { $pag_ini = $_GET['ini']; }
		
		$row_list = $pag_ini * $max_pag;
		
		$sql = "SELECT A.sec_id, A.sec_nome, B.*
				FROM noticias B
				INNER JOIN secretarias A ON A.sec_id = B.not_sec_id
				ORDER BY B.not_id DESC";
		$sql_limit = sprintf("%s LIMIT %d, %d", $sql, $row_list, $max_pag);
		
		$query = @mysql_query($sql_limit,$conn) or die($msg[2]);
		
				
		if (isset($_GET['tot'])) {
			$tot = $_GET['tot'];
		} else {
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
			if (count($newParams) != 0) {
				$lista_insc = "&" . htmlentities(implode("&", $newParams));
			}
		}
		$lista_insc = sprintf("&tot=%d%s", $tot, $lista_insc);
?>
<div class="sig_container">
    <!-- Menu -->
    <div class="sig_menu"><?php @include("../../menu/menu.php");?></div>
    <div class="listagem">
        <table>
        <? if( !mysql_num_rows($query) ) { ?>
        <thead>
            <tr>
                <td id="msg_vazio">Não existem noticias cadastradas!</td>
            </tr>
        </thead>
        <? }else{ ?>   
        <caption><?=$title?></caption>
        <thead>
            <tr>
                <th colspan="2">Opções</th>
                <th>Bloco</th>
                <th class="list_tit_not">Título</th>
                <th class="list_pub_em">Publ. em</th>   
                <th class="list_status">Status</th>
                <th class="list_imagem">Imagem</th>
                <th class="list_detalhes">Detalhes</th>
            </tr>
        </thead>    
        <tbody>
            <? while ($row = mysql_fetch_assoc($query)) : ?>
                <tr>
                    <td class="list_editar">
                        <p><a href="cad_noticias.php?not_id=<?=$row['not_id']?>&edit=true" title="Editar">Editar</a></p>
                    </td>
                    <td class="list_excluir">  
                    	<p>                        
                        <input type="button" name="btn_excluir" id="btn_excluir" value="Excluir" 
                        onClick="if(confirm('Deseja realmente excluir a notícia?'))window.location='deletar_noticias.php?not_id=<?=$row['not_id']?>';"/>
                        </p>  
                    </td>
                    <td><p><?=$row['not_blo_id']?></p></td>
                    <td class="list_tit_not"><p><?=limita_caracteres($row['not_titulo'],10)?></p></td>
                    <td class="list_pub_em"><p><?=formataDatatimeBR($row['not_publicado_em'])?></p></td>                
                    <td class="list_status"><p><?=$row['not_status']?></p></td>           
                    <td class="list_imagem">		
                        <img src="<?=$thumbnail?><?=$row['not_id']?>/<?=$row['not_img']?>&maxw=100" border="0" />
                    </td>        
                    <td class="list_detalhes"><p><a href="cad_noticias.php?not_id=<?=$row['not_id']?>&v=true" title="Visualizar">Visualizar</a></p></td>
                </tr>    
            <? endwhile; ?>
        </tbody>   
        <tfoot>
            <tr>
                <td colspan="8">
                    <table class="list_btns">
                        <tr>
                            <td colspan="2">            
                                <a href="<? printf("%s?ini=%d%s", $pag_atual, max(0, $pag_ini - 1), $lista_insc)?>" title="Anterior">
                                    << Anterior 
                                </a>
                            </td>
                            <td colspan="2" class="list_link">
                            <?=($row_list + 1)?> até <?=min($row_list + $max_pag, $tot)?> total de <?=$tot?>                       
                            </td>
                            <td colspan="2">
                                <a href="<? printf("%s?ini=%d%s", $pag_atual, min($tot_pag, $pag_ini + 1), $lista_insc)?>"  title="Próximo">
                                Próximo >>
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tfoot>
        <? } ?>
    </table>
    </div>
   
</div><!-- fecha div sig_container -->

</body>
</html>
