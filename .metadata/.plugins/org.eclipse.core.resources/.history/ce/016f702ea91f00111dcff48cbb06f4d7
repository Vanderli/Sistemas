<? include("conexao_db/conexaoTecnologia.php");//Conexão

########################################  Função para voltar os meses do ano  ########################################
function Antes($antes){
	$resposta = new xajaxResponse();	
	$dia = date('d');
	$month = $antes;
	$_SESSION['ano'];
	# dia corrente
	$hoje = date('j');

	# Caso antes de janeiro
	if($month == 0){
		$month = 12;
		$_SESSION['ano'] = $_SESSION['ano'] - 1;
	}
	# declaro o ano 
	$ano = $_SESSION['ano'];

	# duas variaveis para o switch para identificar dia e limitar numero de dias
	switch($month.$n){
		case 1: $mes = "Janeiro";
				$n = 31;
		break;
		case 2: $mes = "Fevereiro"; # todo ano bixesto fev tem 29 dias
				$bi = $ano % 4;# anos multiplos de 4 são bixestos
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
	# primeiros dias do mes
	$pdianu = mktime(0,0,0,$month,1,$_SESSION['ano']);
	# escolhe pelo dia da semana
	$dialet = date('D', $pdianu);

	switch($dialet){# verifica que dia cai
		case "Sun": $branco = 0; break;
		case "Mon": $branco = 1; break;
		case "Tue": $branco = 2; break;
		case "Wed": $branco = 3; break;
		case "Thu": $branco = 4; break;
		case "Fri": $branco = 5; break;
		case "Sat": $branco = 6; break;
	}

	$res    .= '<table class="agenda_tabela" cellspacing="0">';//construção do calendario
	$res    .= '<tr>';
	$antes   = $month - 1;   // diminui um mes
	$proximo = $month + 1;   // aumenta um mes
	
	$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Antes($antes);' 
						title='Mês Anterior'>
					<img src='../img/agenda/ant.png' border='0'>
				</a>
			  </td>"; # mês anterior
			  
	 // Volta a dia atual			
	$res .=  '<td class="mes_txt" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta a data Atual\'>
					'.$mes.' de '.$_SESSION['ano'].
				'</a>
			   </td>'; # mes atual e ano
	   
	$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Proximo($proximo);' 
						title='Próximo Mês'>
					<img src='../img/agenda/prox.png' border='0'>
				</a>
			  </td>"; #Proximo mês

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
		   /* 
			* imprime os dias normais
			* zebrar o calendário
			*/
			( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 
			$res .=  '<td class="'.$td.'">&nbsp;</td>';/*preenche os espaços em branco*/
			$dt++;
		}
	}
	/* agora vou no banco de dados verificar os eventos */
	for($i = 1; $i <= $n; $i++ ){
		$age_data_evento = $_SESSION['ano']."-".$month."-".$i;
		mysql_query("SET CHARACTER SET utf8");
		$sqlag = mysql_query("SELECT * FROM agenda WHERE age_data_evento = '$age_data_evento'") or die(mysql_error());
		$num = mysql_num_rows($sqlag);/*quantos eventos tem para o mes*/
		$age_id = @mysql_result($sqlag, 0, "age_id");
		$idev = @mysql_result($sqlag, 0, "age_data_evento");
		$eve = @mysql_result($sqlag, 0, "age_titulo");
		
	   /* 
		* imprime os dias normais
		* zebrar o calendário
		*/
		( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 
		/* prevalece qualquer dia especial do calendario, por isso está em primeiro */
		if($num > 0){
			$res .=  '<td class="'.$td.'" id="evt">';         
			$res .=  "<a href=\"agenda.php?age_id=$age_id\" title='$eve'>".$i."</a>";
			$res .=  '</td>';
			$dt++; /*incrementa os dias da semana*/
			$qt++; /*quantos eventos tem no mes*/
		}
		elseif($dt == 1){/*imprime os domingos*/
		$res .=  '<td class="'.$td.'">';
		$res .=  $i;
		$res .=  '</td>';
		$dt++;
	}else{
		$res .=  '<td class="'.$td.'">';
		$res .=  $i;
		$res .=  '</td>';
		$dt++;
	}
	if($dt > 7){/*faz a quebra no sabado*/
		$res .=  '</tr><tr>';
		$dt = 1;
	}
	} // fecha for

	$res .=  '</tr>';
	$res .=  '</table>';
	$resposta->assign("conteudo", "innerHTML", $res);//Registra os valores
	$resposta->clear("eventos", "innerHTML");//apaga o evento mostrado
	return $resposta;//Retorna os valores
}

########################################   Funçao que avança entre os meses   ########################################
function Proximo($proximo){
	$resposta = new xajaxResponse();
	$dia = date('d');
	$month = $proximo;
	$_SESSION['ano'];    
	$hoje = date('j');//função importante pego o dia corrente
	
	//caso o mes for maior que dezembro
	if($month == 13){
		$month = 1;
		$_SESSION['ano'] = $_SESSION['ano'] + 1;
	}
	  
	$ano = $_SESSION['ano'];

	/* duas variaveis para o switch para identificar dia e limitar numero de dias*/
	switch($month.$n){
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

	$pdianu = mktime(0,0,0,$month,1,$_SESSION['ano']);//primeiros dias do mes
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

	$res .=  '<table class="agenda_tabela" cellspacing="0">';//construção do calendario
	$res .=  '<tr>';
	
	$antes = $month - 1;
	$proximo = $month + 1;
	
		$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Antes($antes);' 
						title='Mês Anterior'>
					<img src='../img/agenda/ant.png' border='0'>
				</a>
			  </td>"; # mês anterior
			  
	 // Volta a dia atual			
	$res .=  '<td class="mes_txt" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta a data Atual\'>
					'.$mes.' de '.$_SESSION['ano'].
				'</a>
			   </td>'; # mes atual e ano
	   
	$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Proximo($proximo);' 
						title='Próximo Mês'>
					<img src='../img/agenda/prox.png' border='0'>
				</a>
			  </td>"; #Proximo mês
			  
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
			/* 
			* imprime os dias normais
			* zebrar o calendário
			*/
			( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 
			 $res .=  '<td class="'.$td.'">&nbsp;</td>';/*preenche os espaços em branco*/
			$dt++;
		}
	}

	for($i = 1; $i <= $n; $i++ ){/*agora vamos no banco de dados verificar os evendos*/
		$age_data_evento = $_SESSION['ano']."-".$month."-".$i;
		mysql_query("SET CHARACTER SET utf8");
		$sqlag = mysql_query("SELECT * FROM agenda WHERE age_data_evento = '$age_data_evento'") or die(mysql_error());
		$num = mysql_num_rows($sqlag);/*quantos eventos tem para o mes*/
		$age_id = @mysql_result($sqlag, 0, "age_id");
		$idev = @mysql_result($sqlag, 0, "age_data_evento");
		$eve = @mysql_result($sqlag, 0, "age_titulo");
	
		/* 
		* imprime os dias normais
		* zebrar o calendário
		*/
		( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 		
		
		if($num > 0){/*prevalece qualquer dia especial do calendario, por isso está em primeiro*/
			$res .=  '<td class="'.$td.'" id="evt">';                
			$res .=  "<a href=\"agenda.php?age_id=$age_id\" title='$eve'>".$i."</a>";
			$res .=  '</td>';
			$dt++;/*incrementa os dias da semana*/
			$qt++;/*quantos eventos tem no mes*/
		}
		elseif($dt == 1){/*imprime os domingos*/
			$res .=  '<td class="'.$td.'">';
			$res .=  $i;
			$res .=  '</td>';
			$dt++;
		}else{			
			$res .=  '<td class="'.$td.'">';
			$res .=  $i;
			$res .=  '</td>';
			$dt++;
		}
		if($dt > 7){/*faz a quebra no sabado*/
			$res .=  '</tr><tr>';
			$dt = 1;
		}
	} // fecha for
	
	$res .=  '</tr>';
	$res .=  '</table>';
	$resposta->assign("conteudo", "innerHTML", $res);//Registra os valores
	$resposta->clear("eventos", "innerHTML");//apaga o evento mostrado
	
	//Retorna os valores
	return $resposta;
}

############################# Função que cria o Calendário e registra o Ano  #############################
function Agenda(){
    $resposta = new xajaxResponse();
	$dia = date('d');
    $month = ltrim(date('m'),"0");
    session_register('ano');//Regitra a sessão
    $_SESSION['ano']= date('Y');//Registra o ano corrente
    $hoje = date('j');//função importante pego o dia corrente
    
	// registra o ano
	$ano = $_SESSION['ano'];
	
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

	$pdianu = mktime(0,0,0,$month,1,$_SESSION['ano']);//primeiros dias do mes
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

    $res .=  '<table class="agenda_tabela" cellspacing="0">';//construção do calendario
    $res .=  '<tr>';
    $antes = $month - 1;//diminui um mes quando volta
    $proximo = $month + 1;// aumenta um mes quando avança
	
	$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Antes($antes);' 
						title='Mês Anterior'>
					<img src='../img/agenda/ant.png' border='0'>
				</a>
			  </td>"; # mês anterior
			  
	 // Volta a dia atual			
	$res .=  '<td class="mes_txt" colspan="5">
				<a href=\'javascript:void(0);\'
					onclick=\'xajax_Agenda()\' 
					title=\'Volta a data Atual\'>
					'.$mes.' de '.$_SESSION['ano'].
				'</a>
			   </td>'; # mes atual e ano
	   
	$res .=  "<td class='mes'>
				<a href='javascript:void(0);' 
					onclick='xajax_Proximo($proximo);' 
						title='Próximo Mês'>
					<img src='../img/agenda/prox.png' border='0'>
				</a>
			  </td>"; #Proximo mês
			
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
			/* 
			* imprime os dias normais
			* zebrar o calendário
			*/
			( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 			
             $res .=  '<td class="'.$td.'">&nbsp;</td>';// preenche os espaços em branco
            $dt++;
        }
    }

	# agora vamos no banco de dados verificar os evendos
	for($i = 1; $i <= $n; $i++ ){
		$age_data_evento = $_SESSION['ano']."-".$month."-".$i;
		mysql_query("SET CHARACTER SET utf8");
		
		$sqlag = mysql_query("SELECT * FROM agenda WHERE age_data_evento = '$age_data_evento'") or die(mysql_error());
		$num = mysql_num_rows($sqlag);// quantos eventos tem para o mes
		$age_id = @mysql_result($sqlag, 0, "age_id");
		$idev = @mysql_result($sqlag, 0, "age_data_evento");
		$eve = @mysql_result($sqlag, 0, "age_titulo");
		
		/* 
		* imprime os dias normais
		* zebrar o calendário
		*/
		( ($dt % 2) != 0   ) ? $td='td_claro' : $td='td_esc'; 
		
		# prevalece qualquer dia especial do calendario, por isso está em primeiro
		if($num > 0){
			$res .=  '<td class="'.$td.'" id="evt">';           
			$res .=  "<a href=\"agenda.php?age_id=$age_id\" title='$eve'>".$i."</a>";
			$res .=  '</td>';
			$dt++; // incrementa os dias da semana
			$qt++; // quantos eventos tem no mes
			
        }elseif($i == $hoje){ // imprime os dia corrente
            $res .=  '<td class="'.$td.'" id="hj">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;

        }elseif($dt == 1){ // imprime os domingos
            $res .=  '<td class="'.$td.'">';
            $res .=  $i;
            $res .=  '</td>';
            $dt++;
        }else{	
			$res .=  '<td class="'.$td.'">';
			$res .=  $i;
			$res .=  '</td>';
			$dt++;
		}
        if($dt > 7){ // faz a quebra no sabado
			$res .=  '</tr><tr>';
			$dt = 1;
        }
    }
	
    $res .=  '</tr>';
    $res .=  '</table>';
    $resposta->assign("conteudo", "innerHTML", $res);# Recebe os valore os valores
	
	# Retorna os valores
    return $resposta;
}
?>
