<?   /* conexão com banco de dados */
  include_once("conexao_db/conexaoTecnologia.php");
   
    /* ------------------------------- EXIBIDOS NO MENU ROTATIVO DE NOTICIAS ------------------------------- */
    # Bloco 01
    $sql_bloco_not1   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 1 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_not1 = @mysql_query($sql_bloco_not1) or die($msg[2]);
    $linha_bloco_not1 = @mysql_fetch_assoc($query_bloco_not1);
	 
	# Bloco 02
    $sql_bloco_not2   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 2 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_not2 = @mysql_query($sql_bloco_not2) or die($msg[2]);
    $linha_bloco_not2 = @mysql_fetch_assoc($query_bloco_not2);
    
    # Bloco 03
    $sql_bloco_not3   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 3 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_not3 = @mysql_query($sql_bloco_not3) or die($msg[2]);
    $linha_bloco_not3 = @mysql_fetch_assoc($query_bloco_not3);
    
    # Bloco 04
    $sql_bloco_not4   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 4 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_not4 = @mysql_query($sql_bloco_not4) or die($msg[2]);
    $linha_bloco_not4 = @mysql_fetch_assoc($query_bloco_not4);
    
    # Bloco 05
    $sql_bloco_not5   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 5 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_not5 = @mysql_query($sql_bloco_not5) or die($msg[2]);
    $linha_bloco_not5 = @mysql_fetch_assoc($query_bloco_not5);
     /* ------------------------------- FIM EXIBIDOS NO MENU ROTATIVO DE NOTICIAS ------------------------------- */
	
    # Bloco 06
    $sql_bloco_6   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 6 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_6 = @mysql_query($sql_bloco_6) or die($msg[2]);
    $linha_bloco_6 = @mysql_fetch_assoc($query_bloco_6);
    
    # Bloco 07
    $sql_bloco_7   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 7 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_7 = @mysql_query($sql_bloco_7) or die($msg[2]);
    $linha_bloco_7 = @mysql_fetch_assoc($query_bloco_7);
    
    # Bloco 08
    $sql_bloco_8   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 8 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_8 = @mysql_query($sql_bloco_8) or die($msg[2]);
    $linha_bloco_8 = @mysql_fetch_assoc($query_bloco_8);
    
    # Bloco 09
    $sql_bloco_9   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 9 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_9 = @mysql_query($sql_bloco_9) or die($msg[2]);
    $linha_bloco_9 = @mysql_fetch_assoc($query_bloco_9);
    
    # Bloco 10
    $sql_bloco_10   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 10 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_10 = @mysql_query($sql_bloco_10) or die($msg[2]);
    $linha_bloco_10 = @mysql_fetch_assoc($query_bloco_10);
    
    # Bloco 11
    $sql_bloco_11   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 11 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_11 = @mysql_query($sql_bloco_11) or die($msg[2]);
    $linha_bloco_11 = @mysql_fetch_assoc($query_bloco_11);
    
    # Bloco 12
    $sql_bloco_12   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 12 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_12 = @mysql_query($sql_bloco_12) or die($msg[2]);
    $linha_bloco_12 = @mysql_fetch_assoc($query_bloco_12);
    
    # Bloco 13
    $sql_bloco_13   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 13 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC"); 
    $query_bloco_13 = @mysql_query($sql_bloco_13) or die($msg[2]);
    $linha_bloco_13 = @mysql_fetch_assoc($query_bloco_13);
    
    # Bloco 14
    $sql_bloco_14   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 14 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC");   
    $query_bloco_14 = @mysql_query($sql_bloco_14) or die($msg[2]);
    $linha_bloco_14 = @mysql_fetch_assoc($query_bloco_14);
    
    # Bloco 15
    $sql_bloco_15   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 15 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC");   
    $query_bloco_15 = @mysql_query($sql_bloco_15) or die($msg[2]);
    $linha_bloco_15 = @mysql_fetch_assoc($query_bloco_15);
    
    # Bloco 16
    $sql_bloco_16   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 16 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC");   
    $query_bloco_16 = @mysql_query($sql_bloco_16) or die($msg[2]);
    $linha_bloco_16 = @mysql_fetch_assoc($query_bloco_16);
    
    # Bloco 17
    $sql_bloco_17   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 17 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC");   
    $query_bloco_17 = @mysql_query($sql_bloco_17) or die($msg[2]);
    $linha_bloco_17 = @mysql_fetch_assoc($query_bloco_17);
    
    # Bloco 18
    $sql_bloco_18   = sprintf("SELECT * FROM noticias  WHERE not_blo_id = 18 AND not_publicado = 'SIM' AND not_status = 'ATIVO' ORDER BY not_publicado_em DESC");   
    $query_bloco_18 = @mysql_query($sql_bloco_18) or die($msg[2]);
    $linha_bloco_18 = @mysql_fetch_assoc($query_bloco_18);
    
    # endereço de onde está a biblioteca para gerar o thumbnail
    $thumbnail = "lib_PHP/thumbnail.php?gd=2&src=../noticia/not_foto/not_id_";
?>

    <!-- Início do Home-Conteúdo -->
    <div id="cont_home">
    
      <!-- Início Apresentação de Notícias -->
      <div id="apresentacao_rapida">
            <div id="galeria_apresentacao">
				<? @include_once("noticia-home.php/noticia_home.php");?>
            </div>
            <ul id="apresenta_list_not">
                <li>
                    <h3><?=utf8_encode($linha_bloco_6['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_6['not_id']?>">   
                    	<?=utf8_encode($linha_bloco_6['not_comentario'])?>      
                    </a>
                </li>
                <li>
                    <h3><?=utf8_encode($linha_bloco_7['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_7['not_id']?>">  
                        <?=utf8_encode($linha_bloco_7['not_comentario'])?>
                    </a>
                </li>
                <li>
                    <h3><?=utf8_encode($linha_bloco_8['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_8['not_id']?>"> 
                        <?=utf8_encode($linha_bloco_8['not_comentario'])?>
                    </a>
                </li>
                <li>
                    <h3><?=utf8_encode($linha_bloco_9['not_titulo'])?></h3>
                   <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_9['not_id']?>"> 
                    	<?=utf8_encode($linha_bloco_9['not_comentario'])?>
                    </a>
                </li>
            </ul>
      </div>
      <!-- Fim Apresentação de Notícias -->
      
      <!-- Início da Classe de destaque -->
      <div id="destaques">
        <h2>DESTAQUES</h2>        
            <ul>
                <li class="destaque_cont1">
                    <h3><?=utf8_encode($linha_bloco_10['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_10['not_id']?>">  
                    	<img src="<?=$thumbnail?><?=$linha_bloco_10['not_id']?>/<?=$linha_bloco_10['not_img']?>&maxw=100" border="0" />
                        <span><?=utf8_encode($linha_bloco_10['not_comentario'])?></span>
                    </a>
                </li>
                <li class="destaque_cont2">
                <h3><?=utf8_encode($linha_bloco_11['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_11['not_id']?>"> 
                        <img src="<?=$thumbnail?><?=$linha_bloco_11['not_id']?>/<?=$linha_bloco_11['not_img']?>&maxw=100" border="0" />
                        <span><?=utf8_encode($linha_bloco_11['not_comentario'])?></span>
                	</a>
                </li>
                <li class="destaque_cont3">
                    <h3><?=utf8_encode($linha_bloco_12['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_12['not_id']?>">  
                        <img src="<?=$thumbnail?><?=$linha_bloco_12['not_id']?>/<?=$linha_bloco_12['not_img']?>&maxw=100" border="0" />
                        <span><?=utf8_encode($linha_bloco_12['not_comentario'])?></span>
                    </a>
                </li>
                <li class="destaque_cont4">
                <h3><?=utf8_encode($linha_bloco_13['not_titulo'])?></h3>
                    <a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_13['not_id']?>"> 
                        <img src="<?=$thumbnail?><?=$linha_bloco_13['not_id']?>/<?=$linha_bloco_13['not_img']?>&maxw=100" border="0" />
                        <span><?=utf8_encode($linha_bloco_13['not_comentario'])?></span>
                    </a>
                </li>
            </ul>
      </div>
      

    <div id="agencia_noticias">
        <h2>AGENCIA DE NOTÍCIAS</h2>
        <ul>
            <li><a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_14['not_id']?>"> <?=utf8_encode($linha_bloco_14['not_comentario'])?></a></li>
            <li><a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_15['not_id']?>"> <?=utf8_encode($linha_bloco_15['not_comentario'])?></a></li>
            <li><a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_16['not_id']?>"> <?=utf8_encode($linha_bloco_16['not_comentario'])?></a></li>
            <li><a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_17['not_id']?>"> <?=utf8_encode($linha_bloco_17['not_comentario'])?></a></li>
            <li><a href="<?=URL?>/noticia/noticia.php?not_id=<?=$linha_bloco_18['not_id']?>"> <?=utf8_encode($linha_bloco_18['not_comentario'])?></a></li>
        </ul>
    </div>
          
    </div>
    <?  # fecha conexão com db
		mysql_close($conn);
	?>