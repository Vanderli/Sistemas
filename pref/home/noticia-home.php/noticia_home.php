<div id="apresenta_home">
    <ul>
        <li>
            <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not1['not_id']?>" title="<?=utf8_encode($linha_bloco_not1['not_comentario'])?>">
            	<img src="<?=$thumbnail?><?=$linha_bloco_not1['not_id']?>/<?=$linha_bloco_not1['not_img']?>&maxw=6000" border="0" />            
            </a>
            <p>
                <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not1['not_id']?>"> 
                	<?=utf8_encode($linha_bloco_not1['not_comentario'])?>
                </a>            
            </p>
        </li>
        
        <li>
            <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not2['not_id']?>" title="<?=utf8_encode($linha_bloco_not2['not_comentario'])?>">
            	<img src="<?=$thumbnail?><?=$linha_bloco_not2['not_id']?>/<?=$linha_bloco_not2['not_img']?>&maxw=6000" />            
            </a>
            <p>
                <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not2['not_id']?>"> 
                	<?=utf8_encode($linha_bloco_not2['not_comentario'])?>
                </a>            
            </p>
        </li>
        
        <li>
            <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not3['not_id']?>" title="<?=utf8_encode($linha_bloco_not3['not_comentario'])?>">
            	<img src="<?=$thumbnail?><?=$linha_bloco_not3['not_id']?>/<?=$linha_bloco_not3['not_img']?>&maxw=6000" />
            </a>
            <p>
                <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not3['not_id']?>"> 
                	<?=utf8_encode($linha_bloco_not3['not_comentario'])?>
                </a>            
            </p>
        </li>
        
        <li>
            <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not4['not_id']?>" title="<?=utf8_encode($linha_bloco_not4['not_comentario'])?>">
            	<img src="<?=$thumbnail?><?=$linha_bloco_not4['not_id']?>/<?=$linha_bloco_not4['not_img']?>&maxw=6000" border="0" />            
            </a>
            <p>
                <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not4['not_id']?>"> 
                	<?=utf8_encode($linha_bloco_not4['not_comentario'])?>
                </a>            
            </p>
        </li>
        
        <li>
            <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not5['not_id']?>" title="<?=utf8_encode($linha_bloco_not5['not_comentario'])?>">
            	<img src="<?=$thumbnail?><?=$linha_bloco_not5['not_id']?>/<?=$linha_bloco_not5['not_img']?>&maxw=6000" border="0" />            
            </a>
            <p>
                <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_not5['not_id']?>"> 
					<?=utf8_encode($linha_bloco_not5['not_comentario'])?>
                </a>            
            </p>
        </li>
    </ul>
    
    <!-- Botões -->
    <div id="apresenta_botoes">
        <a id="link_ant" title="Notícia Anterior">Anterior</a>
        <div id="ap_home_btn"></div>
        <a id="link_prox" title="Próxima Notícia">Próximo</a>
    </div>
    
</div>