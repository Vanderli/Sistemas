<?php
/******
*
* Cr�ditos: hcar - Hamilcar Ant�nio Vieira da Silva - hcar_1@yahoo.com.br
*
* ******/

//Configura��es da imagem
$img['diretorioImgPequena'] = 'images/pqn/';//diret�rio onde ser�o armazenadas as imagens pequenas
$img['diretorioImgGrande'] = 'images/grd/';//diret�rio onde ser�o armazenadas as imagens grandes

$img['max_image_bytes'] = 200000;// tamanho m�ximo aceito para imagem, em bytes
$img['max_image_x'] = 128;//tamanho em que a largura da imagem pequena ser� redimensionada em pixels
$img['max_image_y'] = 96;//tamanho em que a altura da imagem pequena ser� redimensionada em pixels
$img['max_image_xx'] = 640;//tamanho em que a largura da imagem grande ser� redimensionada em pixels
$img['max_image_yy'] = 480;//tamanho em que a altura da imagem grande ser� redimensionada em pixels
$img['max_image_xxx'] = 400;//tamanho m�nimo aceito para largura da imagem grande em pixels
$img['max_image_yyy'] = 300;//tamanho m�nimo aceito para altura da imagem grande em pixels
$img['max_image_xxxx']=1000;//tamanho m�ximo aceito para largura da imagem grande em pixels 
$img['max_image_yyyy'] = 750;//tamanho m�ximo aceito para altura da imagem grande em pixels
$img['nomefotoBD'] = '';//ser� usado para armazenar o nome da imagem que ir� para o bd
$img['setFotoDefault'] = true;//true para vincular foto default aos dados, e false para n�o vincular
$img['nomefotoDefault'] = 'fotodefault.jpg';//nome da foto default a ser vinculada aos dados 

$imgsEnviadas[] = '';// guardar� imagens enviadas para o servidor e cadastradas no bd




?>
