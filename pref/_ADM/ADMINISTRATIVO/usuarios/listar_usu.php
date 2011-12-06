<?php 
		/* conex�o com banco de dados */
		include("../../../conexao_db/conexaoTecnologia.php");
		# inicializo a sess�o.
		if (!isset($_SESSION)){	session_start();}			
		# impede que seja acessado alguma p�gina sem passar pelo login 
		@include("../../login/protege_pagina.php");		
		# biblioteca com fun��es PHP
		@include("../../lib_PHP/biblioteca.php");	
		
		# ser� inserida no titulo da p�gina
		$title = "Usu�rios";	
		// insiro o cabecalho da p�gina
		include("../../includes/cabecalho/adm_meta-css-js.php"); 	
	
		# LISTAGEM
		$pag_atual = $_SERVER["PHP_SELF"];
		
		# totap de registros por p�ginas
		$max_pag = 20;
		$pag_ini = 0;
		
		if (isset($_GET['ini'])) { $pag_ini = $_GET['ini']; }
		
		$row_list = $pag_ini * $max_pag;
		
		$sql = "SELECT A.mdu_id, A.mdu_nome, B.* 
				FROM usuarios B 
					INNER JOIN modulo_usu A ON A.mdu_id = B.usu_mdu_id
				    ORDER BY A.mdu_nome, B.usu_id ASC";
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
        	<td id="msg_vazio">N�o existem usu�rios cadastrados!</td>
        </tr>
    </thead>
    <? }else{ ?>   
    <caption><?=$title?></caption>
    <thead>
        <tr>
            <th class="list_editar">Editar</th>
            <th>M�dulo</th>
            <th>Nome</th>
            <th>Login</th>
            <th class="list_status">Status</th>
            <th class="list_detalhes">Detalhes</th>
        </tr>
    </thead>    
    <tbody>
		<? while ($row = mysql_fetch_assoc($query)) : ?>
            <tr>
                <td class="list_editar">
                	<a href="cad_usu.php?id=<?=$row['usu_id']?>&edit=true" title="Editar">Editar</a>
                </td>
                <td><?=limita_caracteres($row['mdu_nome'],15)?></td>
                <td><?=limita_caracteres($row['usu_nome'],25)?></td>
                <td><?=limita_caracteres($row['usu_login'],10)?></td>
                <td class="list_status"><?=$row['usu_status']?></td>
                <td class="list_detalhes"><a href="cad_usu.php?id=<?=$row['usu_id']?>&v=true" title="Visualizar">Visualizar</a></td>
            </tr>    
        <? endwhile; ?>
    </tbody>   
    <tfoot>
        <tr>
            <td colspan="6">
                <table class="list_btns">
                    <tr>
                        <td colspan="2">            
                            <a href="<? printf("%s?ini=%d%s", $pag_atual, max(0, $pag_ini - 1), $lista_insc)?>" title="Anterior">
                            	<< Anterior 
                            </a>
                        </td>
                        <td colspan="2" class="list_link">
                        <?=($row_list + 1)?> at� <?=min($row_list + $max_pag, $tot)?> total de <?=$tot?>                       
                        </td>
                        <td colspan="2">
                            <a href="<? printf("%s?ini=%d%s", $pag_atual, min($tot_pag, $pag_ini + 1), $lista_insc)?>"  title="Pr�ximo">
                            Pr�ximo >>
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
