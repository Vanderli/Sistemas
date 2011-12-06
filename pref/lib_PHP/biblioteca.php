<?php
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
########################### EXIBE QTDE. MÁXIMA DE CARACTERES ###########################
function limita_caracteres_1($texto, $limite, $quebra = true) {
    $tamanho = strlen($texto);
	
    // Verifica se o tamanho do texto é menor ou igual ao limite
    if ($tamanho <= $limite) {
        $novo_texto = $texto;
		
    // Se o tamanho do texto for maior que o limite
    } else {
        // Verifica a opção de quebrar o texto
        if ($quebra == true) {
            $novo_texto = trim(substr($texto, 0, $limite));
        // Se não, corta $texto na última palavra antes do limite
        } else {
            // Localiza o útlimo espaço antes de $limite
            $ultimo_espaco = strrpos(substr($texto, 0, $limite), ' ');
            // Corta o $texto até a posição localizada
            $novo_texto = trim(substr($texto, 0, $ultimo_espaco));
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
		$datatime = 'não publicado';
	}else{$datatime = "$dia/$mes/$ano às $horas";}

		
	return(utf8_decode($datatime));	
}
?>