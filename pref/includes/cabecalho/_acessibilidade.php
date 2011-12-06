<?  # Previsao do Tempo de 
    # http://www.google.com/ig/api?weather=SaoPauloBrazil&hl=pt-br
    # Localizacao
    $cidade = 'Sao Paulo';
    $pais   = 'Brazil';
    $idioma = 'pt-br';   
    # URL principal da API
    $googleWeather = 'http://www.google.com/ig/api';
    # urlencode() para substituir caracteres especiais
    $apiUrl = $googleWeather.'?weather='.urlencode($cidade).','.urlencode($pais).'&hl='.$idioma;
    # resultado da API
    $resultado = file_get_contents($apiUrl);
    # O SimpleXML precisa receber valores em UTF-8
    $xml = simplexml_load_string(utf8_encode($resultado));   
    # Separando as informacoes encontradas
    $atual = $xml->xpath('/xml_api_reply/weather/current_conditions');
	
	/*
	 *	fog, haze                           => nevoa.png
	 *	rain                                => chuva.png	
	 *	chance_of_rain                      => possibilidade_de_chuva.png	
	 *	chance_of_storm                     => possibilidade_de_tempestade.png		 	
	 * 	mist                                => chuva_fraca.png	
	 *	cloudy  ou mostly_cloudy            => nublado.png
	 *  partly_cloudy.gif	                => parcialmente_nublado.png
	 *	sunny                               => sol.png	
	 *	mostly_sunny                        => parcialmente_ensolarado.png
	 *	thunderstorm                        => pancada_de_chuva_com_trovoada.png
	 * <img src="http://www.google.com<?=$atual[0]->icon['data']?>" />
	*/
	
	switch ( $atual[0]->icon['data'] ) :
	
		case "/ig/images/weather/fog.gif":
			$meteorologia = URL."/img/meteorologia/nevoa.png";
		break;
		
		case "/ig/images/weather/haze.gif":
			$meteorologia = URL."/img/meteorologia/nevoa.png";
		break;
		
		case "/ig/images/weather/rain.gif":
			$meteorologia = URL."/img/meteorologia/chuva.png";
		break;
		
		case "/ig/images/weather/chance_of_rain.gif":
			$meteorologia = URL."/img/meteorologia/possibilidade_de_chuva.png";
		break;
		
		case "/ig/images/weather/chance_of_storm.gif":
			$meteorologia = URL."/img/meteorologia/possibilidade_de_tempestade.png";
		break;
		
		case "/ig/images/weather/mist.gif":
			$meteorologia = URL."/img/meteorologia/chuva_fraca.png";
		break;
		
		case "/ig/images/weather/cloudy.gif":
			$meteorologia = URL."/img/meteorologia/nublado.png";
		break;
		
		case "/ig/images/weather/mostly_cloudy.gif":
			$meteorologia = URL."/img/meteorologia/nublado.png";
		break;
		
		case "/ig/images/weather/partly_cloudy.gif":
			$meteorologia = URL."/img/meteorologia/parcialmente_nublado.png";
		break;
			
		case "/ig/images/weather/sunny.gif":
			$meteorologia = URL."/img/meteorologia/sol.png";
		break;	
				
		case "/ig/images/weather/mostly_sunny.gif":
			$meteorologia = URL."/img/meteorologia/parcialmente_ensolarado.png";
		break;		
		
		case "/ig/images/weather/thunderstorm.gif":
			$meteorologia = URL."/img/meteorologia/pancada_de_chuva_com_trovoada.png";
		break;
		
	endswitch;
    
?>


<div id="tempo_itap">	
    <a href="http://www.climatempo.com.br/previsao-do-tempo/cidade/" title="Clique aqui para ver a Previsão do Tempo" target="_blank"> 
        <img src="<?=$meteorologia?>"/> 
        <? 
			$txt_tempo = strtolower($atual[0]->condition['data']);
			
			if( $atual[0]->condition['data'] == "Névoa::" ){
				$txt_tempo = "névoa";
			}		
		?>
        <?=$atual[0]->temp_c['data']?>&deg; <?=$txt_tempo?>    
    </a> 
</div>