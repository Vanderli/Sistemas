<?php
/******
*
* Versão: 1.0 - 03/12/2006
* Autor: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
*
* upload de imagens incluindo nomes das mesmas no banco de dados
*
* *****/

// upload da imagem com insert no bd
if(!mysql_select_db($db['database'], $db['con']))
{
	retornaErro('bd');
 	return;
}
$selectIdSQL = "SELECT MAX(`id`) FROM `noticia`";
$selectId = mysql_query($selectIdSQL, $db['con']) or die(mysql_error());
$row = mysql_fetch_assoc($selectId);
$id = $row['MAX(`id`)'] + 1;
for($i = 0;  $i < count($arquivo['name']); $i++)
{		
 $Nome    = $arquivo['name'][$i];
 $Tamanho = $arquivo['size'][$i];
 $Tipo    = $arquivo['type'][$i];
 $Tmpname = $arquivo['tmp_name'][$i];	
 // verifica se tem arquivo enviado
 if($Tamanho   > 0   && strlen($Nome) > 1)
 {						 
	if(is_uploaded_file($Tmpname))
	{
 		if(verifica_image($Tipo))
 		{
			$dimensaoImage = getimagesize($Tmpname);
//====================================================================================================
			// verifica se a imagem esta na horizontal ou na vertical
			$dimensiona = verifica_dimensao_image($dimensaoImage);
			// se na horizontal, inverte os valores de altura e largura
     if($dimensiona == 'altura')
      {
       $auxImagex = $img['max_image_x'];
			 $auxImagey = $img['max_image_y'];
			 $auxImagexx = $img['max_image_xx'];
			 $auxImageyy = $img['max_image_yy'];
			 $auxImagexxx = $img['max_image_xxx'];
			 $auxImageyyy = $img['max_image_yyy'];

       //imagem pequena
       $aux = $auxImagex;
       $auxImagex = $auxImagey;
       $auxImagey = $aux;

       //imagem grande
       $aux = $auxImagexx;
       $auxImagexx = $auxImageyy;
       $auxImageyy = $aux;

       //imagem de tamanho mínimo permitido para a imagem grande
       $aux = $auxImagexxx;
       $auxImagexxx = $auxImageyyy;
       $auxImageyyy = $aux;
     }
     else
     {
      $auxImagex = $img['max_image_x'];
      $auxImagey = $img['max_image_y'];
      $auxImagexx = $img['max_image_xx'];
      $auxImageyy = $img['max_image_yy'];
      $auxImagexxx = $img['max_image_xxx'];
      $auxImageyyy = $img['max_image_yyy'];
     }
     
     if(!dimensionar($dimensaoImage, $auxImagexx, $auxImageyy))
     {
      //imagem grande
      $auxImagexx = $dimensaoImage[0];
      $auxImageyy = $dimensaoImage[1];
     }
						
      // Fim verifica se a imagem esta na horizontal ou na vertical
//====================================================================================================


 			// tamanho da imagem em bytes
			if(!verifica_tamanho_aceito($Tamanho, $dimensaoImage, $img))
			{
        retornaErro('errTamAceit');
 	      return;
      }
          
					$extensao = strtolower(verifica_extensao_image($Nome));
          $img['nomefotoBD']  = ('imagem_' . time() . $i . '.' .  $extensao);
          $endFotoPequena =  $img['diretorioImgPequena'] . 'P' . $img['nomefotoBD'];
					$endFotoGrande =  $img['diretorioImgGrande'] . 'G' . $img['nomefotoBD'];
					
					if(dimensionar($dimensaoImage, $auxImagex, $auxImagey))
					{
          if(reduz_imagem($Tmpname, $endFotoPequena, $extensao, $dimensaoImage, $auxImagex, $auxImagey))
	        {
            if(dimensionar($dimensaoImage, $auxImagexxx, $auxImageyyy))
					  {
    	      if(reduz_imagem($Tmpname, $endFotoGrande, $extensao, $dimensaoImage, $auxImagexx, $auxImageyy))
	        	{
	
//===================================================================================						
// cadastrar imagem no bd

		$nomeBd = $img['nomefotoBD'];
		$insertSQL2 = "INSERT INTO `fotos` ( `id` , `id_noticia` , `foto` ) VALUES (NULL , '$id', '$nomeBd')";
		$Result1 = mysql_query($insertSQL2, $db['con']) or die(mysql_error());
		if($Result1 > 0)
		{
			echo('Imagem enviada com sucesso: ' . $Nome . '<br/>');
			$imgsEnviadas[] = $nomeBd;
			if((count($arquivo['name']) - 1) == $i)
			{				
				echo('Final envio Imagens!<br/>');
			}
		}
		else
		{
			//========= Excluir imagens enviadas por causa de erro no cadastro =========//
			if(file_exists($endFotoPequena))
			{
			 $excFoto = @unlink ($endFotoPequena);
			 if(!$excFoto)
 	 		 {
 	 			echo('Erro ao excluir P' . $nomeBd . '. - Anote o nome da foto e a exclua manualmente!<br/>');
  		 }
			}
			if(file_exists($endFotoGrande))
			{
				$excFoto1 = @unlink ($endFotoGrande);
				if(!$excFoto1)
  			{
  				echo('Erro ao excluir G' . $nomeBd . '. - Anote o nome da foto e a exclua manualmente!<br/>');
  			}
			}
			//========= Fim excluir imagens enviadas por causa de erro no cadastro =========//
		}

// Fim cadastrar imagem no bd	
//======================================================================================
						}	//reduzImagem 2
						else
						{
					//========= Excluir imagens enviadas por causa de erro no cadastro =========//
						 	echo('Falha no envio da imagem grande: ' . $Nome . '<br/>');
							//excluir foto pequena enviada
							$excFoto = @unlink ($endFotoPequena);
							if(!$excFoto)
  						{
  							echo('Erro ao excluir ' . $endFotoPequena . '. - Anote o nome da foto e passe ao administrador do sistema para que exclua manualmente!<br/>');
  						}	
						}
				//========= Fim excluir imagens enviadas por causa de erro no cadastro =========//
            } // dimensionar() -  reduzImagem 2
            else
            {
              echo('Falha no envio da imagem grande: ' . $Nome . ' - Tamanho menor que o permitido.<br/>');
            }
        	}  //reduzImagem 1
					else
					{
						echo('Falha no envio das imagens: ' . $Nome . '<br/>');
					}
					} // dimensionar() - reduzImagem 1
					else
					{
					  echo('Falha no envio das imagens: ' . $Nome . ' - Imagem de tamanho muito pequeno.<br/>');
					}
			}// tamanho aceito
			else
			{
				echo('Tamanho para imagem' . $Nome . ' - inválido, envie uma imagem de menor tamanho!<br/>');
			}
    } // verifica_imagem
		else
		{
			echo('O arquivo não é uma imagem válida: ' . $Nome . '<br/>');
		}
  } // is_upload
	else
	{
		echo('Falha no envio do arquivo: ' . $Nome . '<br/>');
	}
}//fim for

// Fim upload da imagem com insert no bd

?>
