<?php

function calcula_idade(){
	// tempo desempregado
	$meses_des = $_POST['tempo_desempregado'];
	
	// formato a data no formato 11/05/2009
	$nascimento  = $_POST['diaNasc'].'/'.$_POST['mesNasc'].'/'.$_POST['anoNasc'];
	
	// Declara a data 
	$data = $nascimento;
	
	// Separa em dia, mês e ano
	list($dia, $mes, $ano) = explode('/', $data);
	
	
	// Descobre que dia é hoje e retorna a unix timestamp
	$hoje = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
	
	// Descobre a unix timestamp da data de nascimento do fulano
	$nascimento = mktime( 0, 0, 0, $mes, $dia, $ano);
	
	
	// 365.25 (por causa do 1/4 de dia que fica sobrando)
	// Aqui faço o cálculo
	$idade = floor((((($hoje - $nascimento) / 60) / 60) / 24) / 365.25);
}

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

class DataHora {

	//Formata a data no formato BR dd/mm/aaaa

	public function formataDataBR($data)
	{
		$dia = substr($data,8,2);
		$mes = substr($data,5,2);
		$ano = substr($data,0,4);
		return $dia."/".$mes."/".$ano;	
	}
	
	// Formata a data no formato USA aaaa/mm/dd
	
	public function formataDataUSA($data)
	{
		$dia = substr($data,0,2);
		$mes = substr($data,3,2);
		$ano = substr($data,6,4);
		return $ano."-".$mes."-".$dia;
	}
}

?>