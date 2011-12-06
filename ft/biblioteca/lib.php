<?
##################### CONVERTE PARA MAIÚSCUL ########################
	function maiusculo($texto) {
         $texto = strtoupper ($texto);
         $texto = str_replace ("á", "Á", $texto); 
		 $texto = str_replace ("é", "É", $texto); 
		 $texto = str_replace ("í", "Í", $texto); 
		 $texto = str_replace ("ó", "Ó", $texto); 
		 $texto = str_replace ("ú", "Ú", $texto); 
		 $texto = str_replace ("â", "Â", $texto); 
		 $texto = str_replace ("ê", "Ê", $texto); 
		 $texto = str_replace ("ô", "Ô", $texto); 
		 $texto = str_replace ("Î", "I", $texto); 
		 $texto = str_replace ("Û", "U", $texto); 
		 $texto = str_replace ("ã", "Ã", $texto); 
		 $texto = str_replace ("õ", "Õ", $texto); 
		 $texto = str_replace ("ç", "Ç", $texto); 
		 $texto = str_replace ("à", "A", $texto);

   		return($texto);
   }
   
##################### LIMITA CARACTERES ########################  
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


?>