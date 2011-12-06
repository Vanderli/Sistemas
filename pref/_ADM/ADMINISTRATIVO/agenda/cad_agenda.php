<?php
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");	
	# inicializo a sessão.
	if (!isset($_SESSION)){	session_start();}		
	# impede que seja acessado alguma página sem passar pelo login 
	@include("../../login/protege_pagina.php");
	// funções prontas em php
	include("../../lib_PHP/biblioteca.php");
	
	/* ---------------------------- EDITAR E VISUALIZAR  ---------------------------- */ 
	$v = "-1";	
	if (isset($_GET['age_id'])) { $age_id = $_GET['age_id']; }	
	/* 
	 * Desabilito o campo caso seja para visualizar
	 * Edito o título
	 */
	if ($_GET['v'] == 'true') {
		$dis = "disabled='disabled'";
		$title = "Visualizar Agenda";
		
	}else if ($_GET['edit'] == 'true') {
		$title = "Editar Agenda";
		$red = "editar_agenda.php?age_id=$age_id";
				
	/* Cadastro novo */
	} else { 
		$title = "Cadastrar Agenda";
		$red = "inserir_agenda.php";
	}
			
	// Transformo o recurso em um array	
	$sql = sprintf("SELECT * FROM agenda WHERE age_id='$age_id'");	
	$query = @mysql_query($sql, $conn) or die($msg[2]);
	$linha = @mysql_fetch_assoc($query);	 

	
	/* ---------------------------- FIM EDITAR E VISUALIZAR  ---------------------------- */
	
		
	# insiro o cabecalho da página
	include("../../includes/cabecalho/adm_meta-css-js.php"); 
	
	# endereço de onde está a biblioteca para gerar o thumbnail
	$thumbnail = "../../lib_PHP/thumbnail.php?gd=2&src=../../agenda/age_foto/age_id_";
	
?>

<div class="sig_container">

    <!-- Menu -->
    <div class="sig_menu"><?php @include("../../menu/menu.php");?></div>
     
    <div class="admin">
    	<form id="admin_agenda"  method="post" name="admin_agenda" enctype="multipart/form-data" action="<?=$red?>">
            <ul>
                <li><h3>Agenda</h3></li>
                <li>
               		<p class="admin_tam_fotos">As fotos precisam ter dimensões de: Altura de 300px até 357px. Largura de 450px até 536px.</p>
                </li>
                <li>
                    <label>Imagem</label>           
					<? if ($_GET['v'] != 'true'):?>
                        <input type="hidden" name="age_img_db" value="<?=$linha['age_img']?$linha['age_img']:null?>"/>
                        <input type="file" id="age_img" name="age_img" size="40"
                        	value="<?=$linha['age_img']?$linha['age_img']:null?>" <?=$dis?>/>
                    <? endif; ?>
                    <? if ($age_id):?>
                    	<img id="thumb_img" src="<?=$thumbnail?><?=$age_id?>/<?=$linha['age_img']?>&maxw=100" border="0" />  
                    <? endif; ?>     
                </li>
                <li>
                    <label>Titulo</label>
                    <input id="age_titulo" maxlength="255" name="age_titulo" type="text" 
                    	value="<?=$linha['age_titulo']?$linha['age_titulo']:null?>" <?=$dis?>/>      
                </li>
                <li>
                    <label>Data</label>
                    <input id="age_data_evento" name="age_data_evento" type="text"
                    	value="<?=$linha['age_data_evento']?$linha['age_data_evento']:null?>" <?=$dis?>/>    
                </li>
                <li>
                    <label>Hora</label>
                    <input id="age_hora_evento" name="age_hora_evento" type="text" 
                    	value="<?=$linha['age_hora_evento']?$linha['age_hora_evento']:null?>" <?=$dis?>/>    
                </li>
                <li>
                    <label>Local</label>
                    <input id="age_local_evento" maxlength="255" name="age_local_evento" type="text" 
                    	value="<?=$linha['age_local_evento']?$linha['age_local_evento']:null?>" <?=$dis?>/>                   
                </li>
                <li>
                    <label>Descrição</label>
                    <textarea id="age_desc_evento" name="age_desc_evento" rows="10" <?=$dis?>><?=$linha['age_desc_evento']?$linha['age_desc_evento']:null?></textarea>
                </li>
                <li>
					<label>Status</label>
					<select name="age_status" class="admin_status" <?=$dis?>>
                    	<option value="INATIVO" <?=($linha['age_status'] == 'INATIVO')?'selected':null;?>>INATIVO</option> 
						<option value="ATIVO"   <?=($linha['age_status'] == 'ATIVO')?'selected':null;?>>ATIVO</option>						
					</select>
				</li>
                <li>
                    <p id="msg_vazio">	                	
                    	<?=($_GET['msg'])?$_GET['msg']:null;?>
                    </p>
                </li>
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