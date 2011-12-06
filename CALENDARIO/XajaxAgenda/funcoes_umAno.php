<?php
include "sql.php";//Conexão


########################################  Função para voltar os meses do ano  ########################################
	function Antes($antes){
    $resposta = new xajaxResponse();
    sleep(0); //habilite, caso queira ver ação do loading no localserver
    $dia = date('d');
    $month = $antes;
	
    //$_SESSION['ano'];
	$ano = date('Y');
	
    $hoje = date('j');//função importante pego o dia corrente
    if($month == 0){//Caso antes de janeiro
        $month = 12;
        $ano = $ano - 1;
    }
	switch($month.$n){/*notem duas variaveis para o switch para identificar dia e limitar numero de dias*/
		case 1: $mes = "Janeiro";
				$n = 31;
		break;
		case 2: $mes = "Fevereiro";// todo ano bixesto fev tem 29 dias
				$bi = $ano % 4;//anos multiplos de 4 são bixestos
				if($bi == 0){
					$n = 29;
				}else{
					$n = 28;
				}
		break;
		case 3: $mes = "Março";
				$n = 31;
		break;
		case 4: $mes = "Abril";
				$n = 30;
		break;
		case 5: $mes = "Maio";
				$n = 31;
		break;
		case 6: $mes = "Junho";
				$n = 30;
		break;
		case 7: $mes = "Julho";
				$n = 31;
		break;
		case 8: $mes = "Agosto";
				$n = 31;
		break;
		case 9: $mes = "Setembro";
				$n = 30;
		break;
		case 10: $mes = "Outubro";
				$n = 31;
		break;
		case 11: $mes = "Novembro";
				$n = 30;
		break;
		case 12: $mes = "Dezembro";
				$n = 31;
		break;
	}

	$pdianu = mktime(0,0,0,$month,1,$ano);//primeiros dias do mes
	$dialet = date('D', $pdianu);//escolhe pelo dia da semana
	
	switch($dialet){//verifica que dia cai
		case "Sun": $branco = 0; break;
		case "Mon": $branco = 1; break;
		case "Tue": $branco = 2; break;
		case "Wed": $branco = 3; break;
		case "Thu": $branco = 4; break;
		case "Fri": $branco = 5; break;
		case "Sat": $branco = 6; break;
	}

    $res .=  '<table class="tabela" >';//construção do calendario
    $res .=  '<tr>';
    $antes = $month - 1;// diminui um mes
    $proximo = $month + 1;// aumenta um mes
    $res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Antes($antes);\" 
						title=\"Mês anterior\">
					<img src=\"ant.gif\" border=\"0\">
				</a>
			  </td>";/*mês 	anterior*/
			  
    // Volta a dia atual			
	$res .=  '<td class="mes" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta ao dia de hoje\'>
					'.$mes.' de '.$ano.
				'</a>
			   </td>';/*mes atual e ano*/
	
    $res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Proximo($proximo);\" 
						title=\"Próximo mês\">
					<img src=\"prox.gif\" border=\"0\">
				</a>
			</td>";/*Proximo mês*/
    $res .=  '</tr><tr>';
    $res .=  '<td class="sem">dom</td>';
    $res .=  '<td class="sem">seg</td>';
    $res .=  '<td class="sem">ter</td>';
    $res .=  '<td class="sem">qua</td>';
    $res .=  '<td class="sem">qui</td>';
    $res .=  '<td class="sem">sex</td>';
    $res .=  '<td class="sem">sáb</td>';
    $res .=  '</tr><tr>';
    $dt = 1;
    if($branco > 0){
        for($x = 0; $x < $branco; $x++){
             $res .=  '<td>&nbsp;</td>';/*preenche os espaços em branco*/
            $dt++;
        }
    }

    for($i = 1; $i <= $n; $i++ ){/*agora vamos no banco de dados verificar os evendos*/
            $dtevento = $i."-".$month."-".$ano;
            mysql_query("SET CHARACTER SET utf8");
        $sqlag = mysql_query("SELECT * FROM agenda WHERE dtevento = '$dtevento'") or die(mysql_error());
                $num = mysql_num_rows($sqlag);/*quantos eventos tem para o mes*/
                $id = @mysql_result($sqlag, 0, "id");
                $idev = @mysql_result($sqlag, 0, "dtevento");
                $eve = @mysql_result($sqlag, 0, "evento");
                if($num > 0){/*prevalece qualquer dia especial do calendario, por isso está em primeiro*/
           $res .=  '<td class="evt">';           
           $res .=  "<a href=\"javascript:void(0);\" title='$eve' onclick=\"xajax_Mostrar($id);\">".$i."</a>";
           $res .=  '</td>';
           $dt++;/*incrementa os dias da semana*/
                   $qt++;/*quantos eventos tem no mes*/
        }
		/*
		elseif($i == $hoje){/*imprime os dia corrente
            $res .=  '<td class="hj">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }
		*/
		elseif($dt == 1){/*imprime os domingos*/
            $res .=  '<td class="dom">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }else{/*imprime os dias normais*/
            $res .=  '<td>';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
                }
        if($dt > 7){/*faz a quebra no sabado*/
        $res .=  '</tr><tr>';
        $dt = 1;
        }
    }
    $res .=  '</tr>';
    $res .=  '</table>';
    $resposta->assign("conteudo", "innerHTML", $res);//Registra os valores
    $resposta->clear("eventos", "innerHTML");//apaga o evento mostrado
    return $resposta;//Retorna os valores
}

########################################   Funçao que avança entre os meses   ########################################
	function Proximo($proximo){
    $resposta = new xajaxResponse();
    sleep(0);//habilite para ver loading no localserver
    $dia = date('d');
    $month = $proximo;
    
	//$_SESSION['ano']; 
	$ano = date('Y');
	   
    $hoje = date('j');//função importante pego o dia corrente
    if($month == 13){//caso o mes for maior que dezembro
        $month = 1;
        //$_SESSION['ano'] = $ano + 1;
		$ano = $ano + 1;
      }

	switch($month.$n){/*notem duas variaveis para o switch para identificar dia e limitar numero de dias*/
		case 1: $mes = "Janeiro";
				$n = 31;
		break;
		case 2: $mes = "Fevereiro";// todo ano bixesto fev tem 29 dias
				$bi = $ano % 4;//anos multiplos de 4 são bixestos
				if($bi == 0){
					$n = 29;
				}else{
					$n = 28;
				}
		break;
		case 3: $mes = "Março";
				$n = 31;
		break;
		case 4: $mes = "Abril";
				$n = 30;
		break;
		case 5: $mes = "Maio";
				$n = 31;
		break;
		case 6: $mes = "Junho";
				$n = 30;
		break;
		case 7: $mes = "Julho";
				$n = 31;
		break;
		case 8: $mes = "Agosto";
				$n = 31;
		break;
		case 9: $mes = "Setembro";
				$n = 30;
		break;
		case 10: $mes = "Outubro";
				$n = 31;
		break;
		case 11: $mes = "Novembro";
				$n = 30;
		break;
		case 12: $mes = "Dezembro";
				$n = 31;
		break;
	}

	$pdianu = mktime(0,0,0,$month,1,$ano);//primeiros dias do mes
	$dialet = date('D', $pdianu);//escolhe pelo dia da semana
	switch($dialet){//verifica que dia cai
		case "Sun": $branco = 0; break;
		case "Mon": $branco = 1; break;
		case "Tue": $branco = 2; break;
		case "Wed": $branco = 3; break;
		case "Thu": $branco = 4; break;
		case "Fri": $branco = 5; break;
		case "Sat": $branco = 6; break;
	}

    $res .=  '<table class="tabela" >';//construção do calendario
    $res .=  '<tr>';
    $antes = $month - 1;
    $proximo = $month + 1;
    $res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Antes($antes);\" 
						title=\"Mês anterior\">
					<img src=\"ant.gif\" border=\"0\">
				</a>
			  </td>";/*mês anterior*/
			  
     // Volta a dia atual			
	$res .=  '<td class="mes" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta ao dia de hoje\'>
					'.$mes.' de '.$ano.
				'</a>
			   </td>';/*mes atual e ano*/
	   
    $res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Proximo($proximo);\" 
						title=\"Próximo mês\">
					<img src=\"prox.gif\" border=\"0\">
				</a>
			  </td>";/*Proximo mês*/
    $res .=  '</tr><tr>';
    $res .=  '<td class="sem">dom</td>';//$res .= ar os dias da semana
    $res .=  '<td class="sem">seg</td>';
    $res .=  '<td class="sem">ter</td>';
    $res .=  '<td class="sem">qua</td>';
    $res .=  '<td class="sem">qui</td>';
    $res .=  '<td class="sem">sex</td>';
    $res .=  '<td class="sem">sab</td>';
    $res .=  '</tr><tr>';
    $dt = 1;
    if($branco > 0){
        for($x = 0; $x < $branco; $x++){
             $res .=  '<td>&nbsp;</td>';/*preenche os espaços em branco*/
            $dt++;
        }
    }

    for($i = 1; $i <= $n; $i++ ){/*agora vamos no banco de dados verificar os evendos*/
            $dtevento = $i."-".$month."-".$ano;
            mysql_query("SET CHARACTER SET utf8");
        $sqlag = mysql_query("SELECT * FROM agenda WHERE dtevento = '$dtevento'") or die(mysql_error());
                $num = mysql_num_rows($sqlag);/*quantos eventos tem para o mes*/
                $id = @mysql_result($sqlag, 0, "id");
                $idev = @mysql_result($sqlag, 0, "dtevento");
                $eve = @mysql_result($sqlag, 0, "evento");
                if($num > 0){/*prevalece qualquer dia especial do calendario, por isso está em primeiro*/
           $res .=  '<td class="evt">';           
           $res .=  "<a href=\"javascript:void(0);\" title='$eve' onclick=\"xajax_Mostrar($id);\">".$i."</a>";
           $res .=  '</td>';
           $dt++;/*incrementa os dias da semana*/
                   $qt++;/*quantos eventos tem no mes*/
        }
		/*
		elseif($i == $hoje){/*imprime os dia corrente
            $res .=  '<td class="hj">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }
		*/
		
		elseif($dt == 1){/*imprime os domingos*/
            $res .=  '<td class="dom">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }else{/*imprime os dias normais*/
                    $res .=  '<td class="td">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
                }
        if($dt > 7){/*faz a quebra no sabado*/
        $res .=  '</tr><tr>';
        $dt = 1;
        }
    }
    $res .=  '</tr>';
    $res .=  '</table>';
    $resposta->assign("conteudo", "innerHTML", $res);//Registra os valores
    $resposta->clear("eventos", "innerHTML");//apaga o evento mostrado
    return $resposta;//Retorna os valores
}

############################# Função que cria o Calendário e registra o Ano  #############################
function Agenda(){
    $resposta = new xajaxResponse();
    sleep(0);//Habilite para ver o loading no localserver
    $dia = date('d');
    $month = ltrim(date('m'),"0");
    //session_register('ano');//Regitra a sessão
    //$_SESSION['ano']= date('Y');//Registra o ano corrente
	//$_SESSION['ano']; 
	$ano = date('Y');
	
    $hoje = date('j');//função importante pego o dia corrente
    
	switch($month.$n){/*notem duas variaveis para o switch para identificar dia e limitar numero de dias*/
		case 1: $mes = "Janeiro";
				$n = 31;
		break;
		case 2: $mes = "Fevereiro";// todo ano bixesto fev tem 29 dias
				$bi = $ano % 4;//anos multiplos de 4 são bixestos
				if($bi == 0){
					$n = 29;
				}else{
					$n = 28;
				}
		break;
		case 3: $mes = "Março";
				$n = 31;
		break;
		case 4: $mes = "Abril";
				$n = 30;
		break;
		case 5: $mes = "Maio";
				$n = 31;
		break;
		case 6: $mes = "Junho";
				$n = 30;
		break;
		case 7: $mes = "Julho";
				$n = 31;
		break;
		case 8: $mes = "Agosto";
				$n = 31;
		break;
		case 9: $mes = "Setembro";
				$n = 30;
		break;
		case 10: $mes = "Outubro";
				$n = 31;
		break;
		case 11: $mes = "Novembro";
				$n = 30;
		break;
		case 12: $mes = "Dezembro";
				$n = 31;
		break;
	}

	$pdianu = mktime(0,0,0,$month,1,$ano);//primeiros dias do mes
	$dialet = date('D', $pdianu);//escolhe pelo dia da semana
	
	
	switch($dialet){//verifica que dia cai
		case "Sun": $branco = 0; break;
		case "Mon": $branco = 1; break;
		case "Tue": $branco = 2; break;
		case "Wed": $branco = 3; break;
		case "Thu": $branco = 4; break;
		case "Fri": $branco = 5; break;
		case "Sat": $branco = 6; break;
	}

    $res .=  '<table class="tabela" >';//construção do calendario
    $res .=  '<tr>';
    $antes = $month - 1;//diminui um mes quando volta
    $proximo = $month + 1;// aumenta um mes quando avança
	
    $res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Antes($antes);\" 
						title=\"Mês Anterior\">
					<img src=\"ant.gif\" border=\"0\">
				</a>
				</td>";/*mês 	anterior*/
	
	    // Volta a dia atual			
	$res .=  '<td class="mes" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta ao dia de hoje\'>
					'.$mes.' de '.$ano.
				'</a>
			   </td>';/*mes atual e ano*/
    
	$res .=  "<td class=\"mes\">
				<a href=\"javascript:void(0);\" 
					onclick=\"xajax_Proximo($proximo);\" 
						title=\"Próximo Mês\">
					<img src=\"prox.gif\" border=\"0\">
				</a>
			</td>";/*Proximo mês*/
			
    $res .=  '</tr><tr>';
    $res .=  '<td class="sem">dom</td>';
    $res .=  '<td class="sem">seg</td>';
    $res .=  '<td class="sem">ter</td>';
    $res .=  '<td class="sem">qua</td>';
    $res .=  '<td class="sem">qui</td>';
    $res .=  '<td class="sem">sex</td>';
    $res .=  '<td class="sem">sáb</td>';
    $res .=  '</tr><tr>';
    $dt = 1;
	
    if($branco > 0){
        for($x = 0; $x < $branco; $x++){
             $res .=  '<td>&nbsp;</td>';/*preenche os espaços em branco*/
            $dt++;
        }
    }

    for($i = 1; $i <= $n; $i++ ){/*agora vamos no banco de dados verificar os evendos*/
            $dtevento = $i."-".$month."-".$ano;
            mysql_query("SET CHARACTER SET utf8");
        $sqlag = mysql_query("SELECT * FROM agenda WHERE dtevento = '$dtevento'") or die(mysql_error());
                $num = mysql_num_rows($sqlag);/*quantos eventos tem para o mes*/
                $id = @mysql_result($sqlag, 0, "id");
                $idev = @mysql_result($sqlag, 0, "dtevento");
                $eve = @mysql_result($sqlag, 0, "evento");
                if($num > 0){/*prevalece qualquer dia especial do calendario, por isso está em primeiro*/
           $res .=  '<td class="evt">';           
           $res .=  "<a href=\"javascript:void(0);\" title='$eve' onclick=\"xajax_Mostrar($id);\">".$i."</a>";
           $res .=  '</td>';
           $dt++;/*incrementa os dias da semana*/
                   $qt++;/*quantos eventos tem no mes*/
        }elseif($i == $hoje){/*imprime os dia corrente*/
            $res .=  '<td class="hj">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;

        }elseif($dt == 1){/*imprime os domingos*/
            $res .=  '<td class="dom">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }else{/*imprime os dias normais*/
                    $res .=  '<td class="td">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
                }
        if($dt > 7){/*faz a quebra no sabado*/
        $res .=  '</tr><tr>';
        $dt = 1;
        }
    }
    $res .=  '</tr>';
    $res .=  '</table>';
    $resposta->assign("conteudo", "innerHTML", $res);//Recebe os valore os valores
    return $resposta;//Retorna os valores
}


##################################  Funçao que mostra os eventos relacionados  ##################################
function Mostrar($id){
    $resposta = new xajaxResponse();
    sleep(2); //Habilite para ver no servidor local
    mysql_query("SET CHARACTER SET utf8");/* Configura os caracteres especiais do banco*/
    $select = mysql_query("SELECT * FROM agenda WHERE id = '$id'");
    $mais = @mysql_result($select, 0, "dtevento");    
    $sqlev = mysql_query("SELECT * FROM agenda WHERE dtevento = '$mais' ORDER BY hora ASC") or die(mysql_error());
    $numev = mysql_num_rows($sqlev);
    for($j = 0; $j < $numev; $j++){/*caso no mesmo dia tenha mais eventos continua imprimindo */
    $eve = @mysql_result($sqlev, $j, "evento");/*pegando os valores do banco referente ao evento*/
    $dev = @mysql_result($sqlev, $j, "dtevento");
    $dsev = @mysql_result($sqlev, $j, "conteudo");
    $auev = @mysql_result($sqlev, $j, "autor");
    $lev = @mysql_result($sqlev, $j, "local");
    $psev = @mysql_result($sqlev, $j, "data");
    $nowev = date('d/m/Y - H:i', strtotime($psev));/*transforma a data para data padrão brazil*/
    $hev = @mysql_result($sqlev, $j, "hora");
    $res .=  '<table width="300" cellspacing="0" cellpadding="0">';/*monta a tabela de eventos*/
    $res .=  '<tr><td class="show">'.$dev.' - '.$eve.'</td></tr>';
    $res .=  '<tr><td class="linha"><b>Hora: </b>'.$hev.'hs</td></tr>';
    $res .=  '<tr><td class="linha"><b>Local: </b>'.$lev.'</td></tr>';
    $res .=  '<tr><td class="linha"><b>Descrição: </b>'.nl2br($dsev).'</td></tr>';/*mantem o quebra da linha para dascriçao do evento*/
    $res .=  '<tr><td class="linha"><b>Postado: </b><small>'.$nowev.'hs por '.$auev.'</small></td></tr>';
    $res .=  '</table>';
    }
    $resposta->assign("eventos", "innerHTML", $res);//Registra os valores e destinos
    return $resposta;//Retorna os valores
}
?>
