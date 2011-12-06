<?php
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");	
	# inicializo a sessão.
	if (!isset($_SESSION)){	session_start();}		
	# impede que seja acessado alguma página sem passar pelo login 
	@include("../../login/protege_pagina.php");
	
	/* ---------------------------- EDITAR E VISUALIZAR  ---------------------------- */ 
	$v = "-1";	
	if (isset($_GET['id'])){ $id = $_GET['id']; }
	
	/* 
	 * Desabilito o campo caso seja para visualizar
	 * Edito o título
	 */
	if ($_GET['v'] == 'true') {
		$dis = "disabled='disabled'";
		$title = "Visualizar usuário";
		
	}else if ($_GET['edit'] == 'true') {
		$title = "Editar usuário";
		$red = "editar_usu.php?id=$id";
		
	/* Cadastro novo */
	} else { 
		$title = "Cadastro de usuários";
		$red = "inserir_usu.php";
	}
			
	// Transformo o recurso em um array	
	$sql = sprintf("SELECT A.mdu_id, A.mdu_nome, B.* 
					FROM usuarios B 
					INNER JOIN modulo_usu A ON A.mdu_id = B.usu_mdu_id
					WHERE usu_id='".$id."'");	
	$query = @mysql_query($sql) or die($msg[2]);
	$linha = @mysql_fetch_assoc($query);	 
	
	/* ---------------------------- FIM EDITAR E VISUALIZAR  ---------------------------- */
	
		
	# insiro o cabecalho da página
	include("../../includes/cabecalho/adm_meta-css-js.php"); 
	
?>
<div class="sig_container">

    <!-- Menu -->
    <div class="sig_menu"><?php @include("../../menu/menu.php");?></div>
    
   <div class="admin">
        <form name="admin_usuarios" id="admin_usuarios" method="post" action="<?=$red?>">
        <ul>
            <li>
            	<h3>Usuários</h3>
            </li>
            <li>
                <label>Módulo</label>
                <select name="usu_mdu_id" id="usu_mdu_id" <?=$dis?> >
                    <option value="">- - - - - - - - - -</option>
                    <?php 
						// varro as informações do banco de dados
						$sql = sprintf("SELECT * FROM modulo_usu WHERE mdu_status='ATIVO' ORDER BY mdu_nome ASC");
						$rs = mysql_query($sql);
						// Obtém o resultado de uma linha como um objeto
						while($row = mysql_fetch_array($rs)):?>
                    	<option value="<?=$row['mdu_id']?>"<?=($linha['mdu_id'] == $row['mdu_id'])?'selected':null;?>>	                       				
						<?=$row['mdu_nome']?></option>
                    <?php endwhile;?>
                </select>
            </li>
            <li>
                <label>Nome</label>
                <input id="usu_nome" maxlength="100" name="usu_nome" type="text" 
                		value="<?=$linha['usu_nome']?$linha['usu_nome']:null?>" <?=$dis?> />        
            </li>
            <li>
            	<label>Login</label>
            	<input id="usu_login" maxlength="100" name="usu_login" type="text" 
                	value="<?=$linha['usu_login']?$linha['usu_login']:null?>" <?=$dis?> />       
            </li>
            <li>
            	<label>Senha</label>
                <!-- dendro do onclick é passado o tamanho da senha desejada -->
                <input type="button" id="usu_gerar_senha" name="usu_gerar_senha" value="Gerar Senha" onClick="popular(6)" <?=$dis?>/>
                <input type="text" name="usu_senha" id="usu_senha" readonly="readonly"  
                		onfocus="senha_texto(this)" 
                        onblur="senha_texto(this)" 
                        <?=(   ($_GET['action']!='equal') && (!empty($_GET))   )?"value='NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!'":null;?>
                        <?=$dis?>/>  
            </li>
            <li>
            	<label>Status</label>
                <select name="usu_status" class="admin_status" <?=$dis?>>
                    <option value="ATIVO" <?=($linha['usu_status'] == 'ATIVO')?'selected':null;?>>ATIVO</option>
                    <option value="INATIVO" <?=($linha['usu_status'] == 'INATIVO')?'selected':null;?>>INATIVO</option>                   	
                </select>
            </li>
            <li>
                <p id="msg_vazio">	                	
					<?=($_GET['action']=='equal')?"<br />Esse login já existe no Banco de Dados, favor informar um Login diferente!":null;?>
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