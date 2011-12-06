<?php
/******
* Créditos - Fábio - www.imasters.com
*
*******/

	function anti_injection($sql)
	{
	// remove palavras que contenham sintaxe sql
	$sql = preg_replace(sql_regcase("/(from|select|insert|delete|where|drop table|show 		tables|#|\*|--|\\\\)/"),"",$sql);
	$sql = trim($sql);//limpa espaços vazio
	$sql = strip_tags($sql);//tira tags html e php
	$sql = addslashes($sql);//Adiciona barras invertidas a uma string
	return $sql;
	}

/******
* Use a vontade mas coloque meu nome nos créditos. Dúvidas, me mande um email.
* Versão: 1.0 - 03/12/2006
* Autor: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
* 
* function retornaErro($tipoErro)
*			- Envio de erro para o usuário
*
* function verifica_image($verificaTipo)
*     - Verificar se é uma imagem
* 
* function verifica_tamanho_aceito($verificaTamanho, $taman, $IMAGE)
*     - Verificar tamanhos válidos para a imagem
*
* function verifica_dimensao_image($dimensaoImage)
*     - Verificar se a imagem está na vertical ou na horizontal
*
* function dimensionar($dimensaoImage, $IMAGES, $IMAGES1)
*     - Verificar se a imagem vai ser dimensionada ou não
*
* function verifica_extensao_image($verificaExtensao)
*     - verificar e retornar a extensão da imagem
*
********/

/*******
*  Créditos para http://phpweb.hostnet.com.br/manual/it/function.imagecreatefromgif.php
*
* function gif2jpeg($p_fl, $p_new_fl='', $bgcolor=false, $imgge , $x, $y, $xx, $yy)
*     - Transformar uma imagem gif e jpeg,
*
*******/
/*******
* Créditos para Fabyo Guimaraes de Oliveira - http://imasters.com.br
*	Pequena modificação, fazendo testes se os servidores existem suporte as devidas funções do sitema,
* por	Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br	
* function gif2jpeg($p_fl, $p_new_fl='', $bgcolor=false, $imgge , $x, $y, $xx, $yy)
*     - Transformar uma imagem gif e jpeg,
*
*******/

?>

<?php	
	
	function retornaErro($tipoErro)
	{
		switch($tipoErro)
		{
			case 'up':
			echo('Upload não permitido para este servidor!<br>');
 			echo('<script> parent.document.getElementById("iframe").style.display = "block"; </script>');
			echo('<script> parent.resetForm(2); </script>');
			break;
			case 'dados':
			echo('Falha no envio de informações necessárias para o bom funcionamento do sistema - Aguarde alguns instantes e tente novamente!<br>');
 			echo('<script> parent.document.getElementById("iframe").style.display = "block"; </script>');
 			echo('<script> parent.resetForm(2); </script>');
			break;
			case 'fotoDefaul':
			echo('Seu sistema não está configurado para cadastrar informações com foto default!<br>');
			break;
      case 'errTamAceit':
      echo('Tamanho de imagem não aceito pelo sistema!<br>');
      echo('<script> parent.document.getElementById("iframe").style.display = "block"; </script>');
 			echo('<script> parent.resetForm(2); </script>');
      break;
			case 'bd':
      echo('Banco de dados não pode ser selecionado - entre em contato com o administrador do sistema e comunique o erro!<br>');
      echo('<script> parent.document.getElementById("iframe").style.display = "block"; </script>');
 			echo('<script> parent.resetForm(2); </script>');
      break;
		}
	}
	
  function verifica_image($verificaTipo)
  {
    // Verifica se o mime-type do arquivo é de imagem
    if(eregi("^image\/(pjpeg|jpeg|png|gif)$", $verificaTipo))
    {
      return (TRUE);
    }
    return (FALSE);
  }// fim verifica_image
    
	function verifica_tamanho_aceito($verificaTamanho, $taman, $IMAGE)
	{
		$retorno = false;
		if($verificaTamanho <= $IMAGE['max_image_bytes'])
		{
			if($taman[0] <= $IMAGE['max_image_xxxx'])
			{ 
				if($taman[1] <= $IMAGE['max_image_yyyy'])
				{
					$retorno = true;
				}
			}	
		}
		return ($retorno);
	}
	
	function verifica_dimensao_image($dimensaoImage)
    {
        $dimensao = '';
        // Verifica largura
        if($dimensaoImage[0] > $dimensaoImage[1])
        {
          $dimensao = 'largura';
        }
        else
        {
            if($dimensaoImage[0] < $dimensaoImage[1])
            {
              $dimensao = 'altura';
            }
            else
            {
               if($dimensaoImage[0] == $dimensaoImage[1])
               {
                  $dimensao = 'largura';
               }
            }
        }
        return ($dimensao);        
    }//fim verifica_dimensao_image
    
		function dimensionar($dimensaoImage, $IMAGES, $IMAGES1)
		{
			$dimensinar  = false;
			if($dimensaoImage[0] >=  $IMAGES || $dimensaoImage[1] >= $IMAGES1)
			{
				$dimensinar  = true;
			}
			return($dimensinar);
		}
 	
    function verifica_extensao_image($verificaExtensao)
    {
        // Pega extensão do arquivo
        preg_match("/\.(gif|png|jpg|jpeg){1}$/i", $verificaExtensao, $ext);
        return ($ext[1]);
    }//fim verifica_extensao_imag    
    
    
       // Código tirado de http://phpweb.hostnet.com.br/manual/it/function.imagecreatefromgif.php
    function gif2jpeg($p_fl, $p_new_fl='', $bgcolor=false, $imgge , $x, $y, $xx, $yy)
    {
      //list($wd, $ht, $tp, $at)=getimagesize($p_fl);
      $img_src=imagecreatefromgif($p_fl);
      //$img_dst=imagecreatetruecolor($wd,$ht);
      $clr['red']=255;
      $clr['green']=255;
      $clr['blue']=255;
      if(is_array($bgcolor))
      {
          $clr=$bgcolor;
      }
      $kek=imagecolorallocate($imgge, $clr['red'], $clr['green'], $clr['blue']);
      imagefill($imgge,0,0,$kek);  
      imagecopyresampled($imgge, $img_src, 0, 0, 0, 0, $x, $y, $xx, $yy);
      $draw=true;
      if(strlen($p_new_fl)>0)
        {
          if($hnd=fopen($p_new_fl,'w'))
          {
            $draw=false;
            fclose($hnd);
         }
      }
      if(true==$draw)
      {
           header("Content-type: image/jpeg");
           $im = imagejpeg($imgge);
      }
      else
      {  
         $im = imagejpeg($imgge, $p_new_fl);
      }
      imagedestroy($imgge);
      imagedestroy($img_src);
      return $im;
   }   // Fim gif2jpeg
    
    
    function reduz_imagem($verificaTmpname, $nome_foto, $extensaoo, $tamano, $larg, $altu)
    {
       //pega o tamanho da imagem ($original_x, $original_y)
        list($width, $height) = $tamano;
        $original_x = $width;
        $original_y = $height;
        // se a largura for maior que altura
        if($original_x > $original_y) {
               $porcentagem = (100 * $larg) / $original_x;      
        }
        else {
               $porcentagem = (100 * $altu) / $original_y;
        }
        
        $tamanho_x = $original_x * ($porcentagem / 100);
        $tamanho_y = $original_y * ($porcentagem / 100);
        
        $image_p = imagecreatetruecolor($tamanho_x, $tamanho_y);
        
        if($extensaoo == 'jpeg' || $extensaoo == 'jpg'|| $extensaoo == 'pjpeg')
        {
            if (function_exists('imagejpeg'))
            {
                $image   = imagecreatefromjpeg($verificaTmpname);
                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $tamanho_x, $tamanho_y, $width, $height);
                return imagejpeg($image_p, $nome_foto, 100);
            }
            else
            {
                echo('Sem suporte para este tipo de imagem - ' . $extensaoo . '<br/>');
                return false;
            }
        }
        else
        {
        if($extensaoo == 'png')
        {
            if (function_exists('imagepng'))
            {
                $image   = imagecreatefrompng($verificaTmpname);
                imagealphablending($image_p, false);
                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $tamanho_x, $tamanho_y, $width, $height);
                imagesavealpha($image_p, true);
                return imagejpeg($image_p, $nome_foto);
            }
            else
            {
                echo('Sem suporte para este tipo de imagem - ' . $extensaoo . '<br/>');
                return false;
            }
        }
        else
        {
        if($extensaoo == 'gif')
        {        
            if (function_exists('imagegif'))
            {
                $image   = imagecreatefromgif($img);
                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $tamanho_x, $tamanho_y, $width, $height);
                return imagegif($image_p, $nome_foto, 100);
               }
            else
            {                
                   $clr['red']=255;
                   $clr['green']=255;
                   $clr['blue']=255;
                   $imagEN = gif2jpeg($verificaTmpname, $nome_foto, $clr, $image_p, $tamanho_x, $tamanho_y, $width, $height);
                   if($imagEN)        
                   {
                       return $imagEN;
                   }
                   else
                   {
                       echo('Sem suporte para este tipo de imagem - ' . $extensaoo . '<br/>');
                   }
                
            }
        }
        }
        }        
    }//fim reduz_imagem  

?>
