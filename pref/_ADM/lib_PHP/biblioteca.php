<?
########################### EXIBE QTDE. MÁXIMA DE CARACTERES ###########################
function limita_caracteres($texto, $limite, $quebra = true) {
    $tamanho = strlen($texto);
	
    // Verifica se o tamanho do texto é menor ou igual ao limite
    if ($tamanho <= $limite) {
        $novo_texto = $texto;
		
    // Se o tamanho do texto for maior que o limite
    } else {
        // Verifica a opção de quebrar o texto
        if ($quebra == true) {
            $novo_texto = trim(substr($texto, 0, $limite)).'...';
        // Se não, corta $texto na última palavra antes do limite
        } else {
            // Localiza o útlimo espaço antes de $limite
            $ultimo_espaco = strrpos(substr($texto, 0, $limite), ' ');
            // Corta o $texto até a posição localizada
            $novo_texto = trim(substr($texto, 0, $ultimo_espaco)).'...';
        }
    }
    // Retorna o valor formatado
    return $novo_texto;
}

########################### FORMATA HORA FORMATOS BR E USA ###########################
//Formata a data no formato BR dd/mm/aaaa
function formataDataBR($data){

	$dia = substr($data,8,2);
	$mes = substr($data,5,2);
	$ano = substr($data,0,4);
	
	return("$dia/$mes/$ano");	
}

// Formata a data no formato USA aaaa/mm/dd
function formataDataUSA($data){

	$dia = substr($data,0,2);
	$mes = substr($data,3,2);
	$ano = substr($data,6,4);
	
	return("$ano-$mes-$dia");
}

// Formata a datatime em formato BR com hora separada
function formataDatatimeBR($data){

	$dia = substr($data,8,2);
	$mes = substr($data,5,2);
	$ano = substr($data,0,4);	
	$horas = substr($data,11,19);
	
	if($data == '0000-00-00 00:00:00'){
		$datatime = 'Nao publicado';
	}else{$datatime = "$dia/$mes/$ano às $horas";}

		
	return(utf8_decode($datatime));	
}
##################################### SAUDAÇÃO #####################################
function exibeSaudacao(){
	// reparto o nome toda vez que ouver um espaço
	$nome_em_partes = explode(" ", $_SESSION['usu_nome']);
		// pego o primeiro nome, deixando de lado o sobrenome
		$nome_usuario = $nome_em_partes[0];
		// hora atual
		$hora = date("H");
	
		// Madrugada
		if ($hora >= 0 && $hora < 6) {
			$saudacao = "BOA MADRUGADA $nome_usuario";
	
		// Dia	
		} elseif ($hora >= 6 && $hora < 12){
			$saudacao = "BOM DIA $nome_usuario";
	
		// Tarde
		} elseif ($hora >= 12 && $hora < 18) {
			$saudacao = "BOA TARDE $nome_usuario";
	
		// Noite
		}else {
			$saudacao = "BOA NOITE  $nome_usuario";
	
		}		
	// retorno a variável
	return($saudacao);	
}
############################ GERAR DIAS, MESES E ANOS #################################

	# Gerar array Dia
	for ( $i=1; $i <=31; $i++ ){ $dias[$i] = $i; }
	
	# Gerar array Mes
	$meses = array( '01'=> "Janeiro",
					'02'=> "Fevereiro",
					'03'=> "Mar&ccedil;o",
					'04'=> "Abril",
					'05'=> "Maio",
					'06'=> "Junho",
					'07'=> "Julho", 
					'08'=> "Agosto",
					'09'=> "Setembro",
					'10'=> "Outubro",
					'11'=> "Novembro",
					'12'=> "Dezembro");	
	
	$ano_atual = date('Y');
	// Gerar array Ano	
	$anoIni = 2009;
	$anoFim = $ano_atual;
	for ( $i=$anoFim; $i >=($anoIni); $i-- ){
		$anos[$i] = $i;
	}

?>