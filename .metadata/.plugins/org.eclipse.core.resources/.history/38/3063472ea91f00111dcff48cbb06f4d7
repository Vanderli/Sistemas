<?php
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");	
	# inicializo a sessão.
	if (!isset($_SESSION)){	session_start();}		
	# impede que seja acessado alguma página sem passar pelo login 
	@include("../../login/protege_pagina.php");
	
	/* ---------------------------- EDITAR E VISUALIZAR  ---------------------------- */ 
	$v = "-1";	
	if (isset($_GET['not_id'])) { $not_id = $_GET['not_id']; }	
	/* 
	 * Desabilito o campo caso seja para visualizar
	 * Edito o título
	 */
	if ($_GET['v'] == 'true') {
		$dis = "disabled='disabled'";
		$title = "Visualizar Notícias";
		
	}else if ($_GET['edit'] == 'true') {
		$title = "Editar Notícias";
		$red = "editar_noticias.php?not_id=$not_id";
				
	/* Cadastro novo */
	} else { 
		$title = "Cadastrar Notícias";
		$red = "inserir_noticias.php";
	}
			
	// Transformo o recurso em um array	
	$sql = sprintf("SELECT * FROM noticias WHERE not_id='$not_id'");	
	$query = @mysql_query($sql, $conn) or die($msg[2]);
	$linha = @mysql_fetch_assoc($query);	 

	
	/* ---------------------------- FIM EDITAR E VISUALIZAR  ---------------------------- */
	
		
	# insiro o cabecalho da página
	include("../../includes/cabecalho/adm_meta-css-js.php"); 
	
	# endereço de onde está a biblioteca para gerar o thumbnail
	$thumbnail = "../../lib_PHP/thumbnail.php?gd=2&src=../../noticia/not_foto/not_id_";
	
?>

<div class="sig_container">

    <!-- Menu -->
    <div class="sig_menu"><?php @include("../../menu/menu.php");?></div>
  
	<div class="admin">
		<form id="admin_noticias"  method="post" name="admin_noticias" enctype="multipart/form-data" action="<?=$red?>">
			<ul>
				<li><h3>Notícias</h3></li>
        <li>
          <p class="admin_tam_fotos">As fotos precisam ter dimensões de: Altura de 300px até 357px. Largura de 450px até 536px.</p>
        </li>
				<li>
					<label>Secretaria</label>     
					<select name="not_sec_id" id="not_sec_id" <?=$dis?>>
					<option value="">- - - - - - - - - -</option>						  
					<?php 
					// varro as informações do banco de dados
					$sql = sprintf("select * from secretarias WHERE sec_status='ATIVO' ORDER BY sec_nome ASC");
					$rs = mysql_query($sql);
					// Obtém o resultado de uma linha como um objeto
					while($row = mysql_fetch_array($rs)):?>
					<option value="<?=$row['sec_id']?>"<?=($linha['not_sec_id'] == $row['sec_id'])?'selected':null;?>>	                       				
					<?=$row['sec_nome']?></option>
					<?php endwhile;?>
					</select>
				</li>
				<li>
					<label>Bloco</label>
					<select name="not_blo_id" id="not_blo_id" <?=$dis?>>
                        <option value="1"  <?=($linha['not_blo_id'] == '1')?'selected':null;?>>Bloco 1</option>				  
                        <option value="2"  <?=($linha['not_blo_id'] == '2')?'selected':null;?>>Bloco 2</option>
                        <option value="3"  <?=($linha['not_blo_id'] == '3')?'selected':null;?>>Bloco 3</option>
                        <option value="4"  <?=($linha['not_blo_id'] == '4')?'selected':null;?>>Bloco 4</option>
                        <option value="5"  <?=($linha['not_blo_id'] == '5')?'selected':null;?>>Bloco 5</option>
                        <option value="6"  <?=($linha['not_blo_id'] == '6')?'selected':null;?>>Bloco 6</option>
                        <option value="7"  <?=($linha['not_blo_id'] == '7')?'selected':null;?>>Bloco 7</option>
                        <option value="8"  <?=($linha['not_blo_id'] == '8')?'selected':null;?>>Bloco 8</option>
                        <option value="9"  <?=($linha['not_blo_id'] == '9')?'selected':null;?>>Bloco 9</option>
                        <option value="10" <?=($linha['not_blo_id'] == '10')?'selected':null;?>>Bloco 10</option>
                        <option value="11" <?=($linha['not_blo_id'] == '11')?'selected':null;?>>Bloco 11</option>
                        <option value="12" <?=($linha['not_blo_id'] == '12')?'selected':null;?>>Bloco 12</option>
                        <option value="13" <?=($linha['not_blo_id'] == '13')?'selected':null;?>>Bloco 13</option>
                        <option value="14" <?=($linha['not_blo_id'] == '14')?'selected':null;?>>Bloco 14</option>
                        <option value="15" <?=($linha['not_blo_id'] == '15')?'selected':null;?>>Bloco 15</option>
                        <option value="16" <?=($linha['not_blo_id'] == '16')?'selected':null;?>>Bloco 16</option>
                        <option value="17" <?=($linha['not_blo_id'] == '17')?'selected':null;?>>Bloco 17</option>
                        <option value="18" <?=($linha['not_blo_id'] == '18')?'selected':null;?>>Bloco 18</option>
					</select>
				</li>
                <li>
                    <label>Imagem</label>                                       
                   <? if ($_GET['v'] != 'true'):?>
                   		<input type="hidden" name="not_img_db" value="<?=$linha['not_img']?$linha['not_img']:null?>"/>
                   		<input type="file" id="not_img" name="not_img" size="40"
                            value="<?=$linha['not_img']?$linha['not_img']:null?>" <?=$dis?>/>
                   <? endif; ?>
                   <? if ($not_id):?>
                    <img id="thumb_img" src="<?=$thumbnail?><?=$not_id?>/<?=$linha['not_img']?>&maxw=100" border="0" />  
                    <? endif; ?>                                  
                </li>
                <li>
                    <label>Titulo</label>
                    <input id="not_titulo" maxlength="20" name="not_titulo" type="text" style="text-transform:uppercase"
                    	value="<?=$linha['not_titulo']?$linha['not_titulo']:null?>" <?=$dis?>/>         
                </li>
                <li>
                    <label>Comentário</label>
                    <input id="not_comentario" maxlength="47" name="not_comentario" type="text"
                    	value="<?=$linha['not_comentario']?$linha['not_comentario']:null?>" <?=$dis?>/>            
                </li>
				<li>
					<label>Descrição</label>
                    <textarea id="not_descricao" name="not_descricao" rows="20" <?=$dis?>><?=$linha['not_descricao']?$linha['not_descricao']:null?></textarea>
                </li>
				<li>
					<label>Publicado</label>
					<select name="not_publicado" id="not_publicado" <?=$dis?>>
                    	<option value="NAO" <?=($linha['not_publicado'] == 'NAO')?'selected':null;?>>NAO</option> 
						<option value="SIM" <?=($linha['not_publicado'] == 'SIM')?'selected':null;?>>SIM</option>						
					</select>
				</li>
				<li>
					<label>Status</label>
					<select name="not_status" class="admin_status" <?=$dis?>>
                    	<option value="INATIVO" <?=($linha['not_status'] == 'INATIVO')?'selected':null;?>>INATIVO</option> 
						<option value="ATIVO"   <?=($linha['not_status'] == 'ATIVO')?'selected':null;?>>ATIVO</option>						
					</select>
				</li>
                <li>
                    <p id="msg_vazio">	                	
                    	<?=($_GET['msg'])?$_GET['msg']:null;?>
                    </p>
                </li>
				<li class="admin_btns">
				<? if ($_GET['v'] == 'true') {?>
				<input class="btn_cadastrar" name="visualizar" type="button" value="Voltar" onClick="javascript:history.go(-1);"/>
				<? } else if($_GET['edit'] == 'true'){ ?>
				<input class="btn_cadastrar" name="editar" type="submit" value="Editar" />
				<? } else{ ?>
				<input class="btn_cadastrar" name="cadastrar" type="submit" value="Cadastrar" <?=$dis?>/>
				<? } ?>
				</li>
			</ul>
		</form>
	</div>
  
</div><!-- fecha div sig_container -->
</body>
</html>