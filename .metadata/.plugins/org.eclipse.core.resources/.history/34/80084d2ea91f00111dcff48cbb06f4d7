<?php
	# inicializo a sessão.
	if (!isset($_SESSION)){	session_start();}		
	# impede que seja acessado alguma página sem passar pelo login 
	@include("../../../login/protege_pagina.php");
	$title = "Alterar Senha Pessoal";
	# insiro o cabecalho da página
	include("../../../includes/cabecalho/adm_meta-css-js.php"); 
?>
<div class="sig_container">

    <!-- Menu -->
    <div class="sig_menu"><?php @include("../../../menu/menu.php");?></div>
    
    <div class="admin">
        <form name="alt_senha_usu" id="alt_senha_usu" method="post" action="editar_senha.php">
            <ul>
                <li>
                	<h3>Alterar Senha Pessoal</h3>
                </li>
                
                <li>
                	<label>Digite sua Senha Atual</label>
                	<input type="password" id="senha_atual" maxlength="100" name="senha_atual" />        
                </li>
                <li>
                    <label>Escolha uma Nova Senha</label>
                    <input type="password" id="nova_senha" maxlength="100" name="nova_senha" />       
                </li>
                <li>
                    <label>Confirme sua Nova senha</label>
                    <input type="password" name="conf_nova_senha" id="conf_nova_senha" />
                </li>
          
                <li>
                    <p id="msg_vazio">	                	
						<? if ($_GET['action'] == 'notEqual'){ 
                        	echo "<br>A Senha Atual não confere!"; 
                        }else if ($_GET['action'] == 'pwd_equal'){
                        	echo "<br>A Nova Senha é igual a Senha Atual, favor informar uma Senha diferente!"; 
                        }
                        ?>
                    </p>
                </li>
                <li class="admin_btns">
                    	<input class="btn_cadastrar" name="usu_cadastrar" type="submit" value="Editar" />           
                </li>
            </ul>
        </form>
    </div>
    
    
</div><!-- fecha div sig_container -->

</body>
</html>