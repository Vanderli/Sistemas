<?php
/*
=============================================================================================
Script Name:	      thumbnail.php
Version:	      1.1
Author:		      Ian Anderson
Date:		      November 2002
Original:	      http://www.hotscripts.com/Detailed/18727.html 
Modificado/Traduzido: Mauricio Maciel <mauricio@vendomicro.com.br>
Mode de usar:

<img src="/path/to/thumbnail.php?gd=N&src=/path/to/image.EXT&maxw=NNN" />

onde 	N 	= a vers�o da library GD (valores 1 ou 2)
	EXT	= a extens�o do arquivo da imagem
			(os valores podem ser gif (se o gd = 2), jpg e png)
	NNN	= o tamanho m�ximo da largura do thumbnail

=============================================================================================
*/
function ErrorImage ($text) {
	global $maxw;
	$len = strlen ($text);
	if ($maxw < 154) $errw = 154;
	$errh = 30;
	$chrlen = intval (5.9 * $len);
	$offset = intval (($errw - $chrlen) / 2);
	$im = imagecreate ($errw, $errh); 
	$bgc = imagecolorallocate ($im, 153, 63, 63);
	$tc = imagecolorallocate ($im, 255, 255, 255);
	imagefilledrectangle ($im, 0, 0, $errw, $errh, $bgc);
	imagestring ($im, 2, $offset, 7, $text, $tc);
	header ("Content-type: image/jpeg");
	imagejpeg ($im);
	imagedestroy ($im);
	exit;
}

// Mude o valor de $maxw=190 para que o thumbnail tenha a largura desejada

function thumbnail ($gdver, $src, $maxw=190) {
	
	$gdarr = array (1,2);
	for ($i=0; $i<count($gdarr); $i++) {
		if ($gdver != $gdarr[$i]) $test.="|";
	}
	$exp = explode ("|", $test);
	if (count ($exp) == 3) {
		ErrorImage ("Vers�o incorreta do GD!");
	}

	if (!function_exists ("imagecreate") || !function_exists ("imagecreatetruecolor")) {
		ErrorImage ("Nenhuma fun��o para criar imagens!");
	}

	$size = @getimagesize ($src);
	if (!$size) {
		thumbnail (2, "./../img/thumbnail/sem_imagem.jpg", 100);
		//ErrorImage ("Sem foto");
	} else {

		if ($size[0] > $maxw) {
			$newx = intval ($maxw);
			$newy = intval ($size[1] * ($maxw / $size[0]));
		} else {
			$newx = $size[0];
			$newy = $size[1];
		}

		if ($gdver == 1) {
			$destimg = imagecreate ($newx, $newy );
		} else {
			$destimg = @imagecreatetruecolor ($newx, $newy ) or die (ErrorImage ("N�o pode usar GD2 aqui!"));
		}
		
		if ($size[2] == 1) {
			if (!function_exists ("imagecreatefromgif")) {
				ErrorImage ("Imagem GIF n�o pode ser usada!");
			} else {
				$sourceimg = imagecreatefromgif ($src);

				if ($gdver == 1)
					imagecopyresized ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]);
				else
					@imagecopyresampled ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]) or die (ErrorImage ("N�o pode usar GD2 aqui!"));

				header ("content-type: image/gif");
				imagegif ($destimg);
			}
		}
		elseif ($size[2]==2) {
			$sourceimg = imagecreatefromjpeg ($src);

			if ($gdver == 1)
				imagecopyresized ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]);
			else
				@imagecopyresampled ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]) or die (ErrorImage ("N�o pode usar GD2 aqui!"));

			header ("content-type: image/jpeg");
			imagejpeg ($destimg);
		}
		elseif ($size[2] == 3) {
			$sourceimg = imagecreatefrompng ($src);

			if ($gdver == 1)
				imagecopyresized ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]);
			else
				@imagecopyresampled ($destimg, $sourceimg, 0,0,0,0, $newx, $newy, $size[0], $size[1]) or die (ErrorImage ("N�o pode usar GD2 aqui!"));

			header ("content-type: image/png");
			imagepng ($destimg);
		}
		else {
			ErrorImage ("Tipo de imagem n�o compat�vel!");
		}
	}

	imagedestroy ($destimg);
	imagedestroy ($sourceimg);
}

thumbnail ($_GET["gd"], $_GET["src"], $_GET["maxw"]);
?>
