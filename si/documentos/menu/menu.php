<?php 
		// NOMES QUE ESTO NO COMBO
		$adm = "ADMINISTRADOR";
		$cad_con = "CADASTRAR E CONSULTAR";
		$con = "CONSULTAR";
		$tra = "TRAMITES";
		// NOME DO GRUPO QUE EST LOGADO
		$grupo = $_SESSION['grupo'];	
?>
<!--efeito do menu-->
<script type="text/javascript" src="http://<?=$_SERVER['SERVER_NAME']?>/sig/documentos/js/menu_load.js"></script>
<!--estilo do menu-->
<link rel="stylesheet" type="text/css" href="http://<?=$_SERVER['SERVER_NAME']?>/sig/documentos/estilo/estiloMenu.css">

    <!--link na imagem do topo, para a pgina bemVindo.php-->
    <div align="center">
        <a href="http://<?=$_SERVER['SERVER_NAME']?>/sig/documentos/bemVindo.php">
            <img src="http://<?=$_SERVER['SERVER_NAME']?>/sig/documentos/imagens/topos/topo_sadti.jpg" width="778" height="110" border="0" 
                alt="Clique aqui para ir a pgina de Apresentao do Sistema">
        </a>
    </div>
    <!--######################################## INICIO DO MENU ########################################-->
    <!-- deixo o menu 5px abaixo do banner -->
    <table style="margin-top:5px" align="center" class="centralizar">
        <tr>
        	<td>
                <table width="777" align="center">
                <tr>
                    <td>
                    <!--######################################## DOCUMENTOS ########################################-->
                    <ul id="barra" class="menubar">                
                        <li class="menuvertical">
                            <a href="#">Documentos</a>
                            <ul id="nav" class="menu">
                                <!-- Grupo Tramitar -->
                                <?php if($grupo != $tra):?>  
                                <!-- Grupo Consultar -->
                                <?php if($grupo != $con):?>                           	
                                <li>
                                    <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/documento/formCadDoc.php">
                                        Cadastrar
                                    </a>
                                </li>
                                <?php endif;?>
                                <?php endif;?> <!-- fecho Consultar -->
                                <li>
                                    <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/documento/listarInscricoes.php">
                                        Listar
                                    </a>
                                </li>
                            </ul>
                        </li> 
                    <!--######################################## TRAMITES ########################################-->                               
                    <li class="menuvertical">
                        <a href="#">Trmites</a>
                        <ul id="nav" class="menu">
                            <!--Externo-->
                            <li>                                            
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/tramite/externo/formConTraExt.php">
                                    Externo
                                </a>    
                            </li>
                            <!--Interno-->
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/tramite/interno/formConTraInt.php">
                                    Interno
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--######################################## CONSULTAS ########################################-->
                    <li class="menuvertical">
                        <a href="#">Consultas</a>
                        <ul id="nav" class="menu">
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/consulta/formConGeral.php">
                                    Geral
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--######################################## RELATRIOS ########################################-->
                    <li class="menuvertical"><a href="#">Relatrios</a>
                        <ul id="nav" class="menu">
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/relatorio/rel_documento/formConRelDoc.php">
                                    Documentos
                                </a>
                            </li>
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/relatorio/rel_tra_externo/formConRelTraExt.php">
                                    Trmite Externo
                                </a>
                            </li>
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/relatorio/rel_tra_interno/formConRelTraInt.php">
                                    Trmite Interno
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!--######################################## FERRAMENTAS ########################################-->
                    <li class="menuvertical"><a href="#">Ferramentas</a>
                    	<ul id="nav" class="menu">
                            <!--Altera Senha-->
                            <li>
                            	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/alterar_senha/formAltSenha.php">
                                	Alterar Senha
                                </a>
                            </li>
                            <?php if(($grupo != $tra)):?>  
                            <?php if(($grupo != $con)):?> 
                            <!--Destino Externo-->
                            <li class="submenu"><a href="#">Orig/Dest. Ext.</a>
                        <ul>
                            <li class="submenu"><a href="#">Cadastrar</a>
                            <ul>
                                <li>
                                	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_externo/secretaria/formCadSec.php">
                                    	Sec. / rgo
                                    </a>
                                </li>
                                <li>
                                	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_externo/departamento/formCadDep.php">
                                    	Depto / rgo
                                    </a>
                                </li>
                            </ul>
                            </li>
                            <li class="submenu"><a href="#">Listar</a>
                        <ul>
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_externo/secretaria/formListarSec.php">
                                    Sec. / rgo
                                </a>
                            </li>
                            <li>
                                <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_externo/departamento/formListarDep.php">														 									Depto / rgo
                                </a>
                            </li>
						</ul>
                    </li>
            	</ul>
            </li>
            <!--Destino Interno-->
            <li class="submenu"><a href="#">Destino Interno</a>
                <ul>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_interno/formCadDesInt.php">
                        	Cadastrar
                        </a>
                    </li>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/destino_interno/formListarDesInt.php">
                        	Listar
                        </a>
                    </li>
                </ul>
            </li>
            <!--Tipo de Documento-->
            <li class="submenu"><a href="#">Tipo de Docum.</a>
                <ul>
                    <li>
                        <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/tipo_documento/formCadTipoDoc.php">
                        	Cadastrar
                        </a>
                    </li>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/tipo_documento/formListarTipoDoc.php">
                        	Listar
                        </a>
                   	</li>
                </ul>
            </li>
            <!--Recebido-->
            <li class="submenu"><a href="#">Recebido</a>
                <ul>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/recebido_por/formCadRecPor.php">
                        	Cadastrar
                        </a>
                    </li>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/recebido_por/formListarRecPor.php">
                        	Listar
                        </a>
                    </li>
                </ul>
            </li>
            <!-- Grupo Cadastro e Consultar -->
            <?php if($grupo != $cad_con):?> 
            <!--Login e Senha-->
            <li class="submenu"><a href="#">Login e Senha</a>
                <ul>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/login_senha/formCadLoginSenha.php">
                        	Cadastrar
                        </a>
                   	</li>
                    <li>
                    	<a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/login_senha/formListarLoginSenha.php">
                        	Listar
                        </a>
                    </li>
                </ul>
            </li>
            <?php endif; ?><!--fecho Cadastro e Consultar-->
            <?php endif; ?>
            <?php endif; ?>  <!--fecho verificao de grupo-->
            </ul>
            </li>
            <!--######################################## AJUDA ########################################-->
            <li class="menuvertical">
            <a href="#">Ajuda</a>
                <ul id="nav" class="menu">
                    <li>
                        <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/ajuda/portaria_siglas.php">
                            Portaria de Siglas
                        </a>
                    </li>
                    <li>
                        <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/ajuda/manual_sigd.php">
                            Manual
                        </a>
                    </li>
                </ul>
            </li>
            <!--######################################## SAIR ########################################-->
                <li class="menuvertical">
                    <a href="http://<?=$_SERVER['SERVER_NAME'];?>/sig/documentos/login/logout.php">
                        Sair
                    </a>
                </li>
            </ul>
    					</td>
                    </tr>
                </table>
    		</td>
    	</tr>
    </table>
    <!--######################################## FIM DO MENU ########################################-->
</div>