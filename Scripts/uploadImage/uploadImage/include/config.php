<?php
/******
*
* Créditos: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
*
* ******/

//Configurações da imagem
$img['diretorioImgPequena'] = 'images/pqn/';//diretório onde serão armazenadas as imagens pequenas
$img['diretorioImgGrande'] = 'images/grd/';//diretório onde serão armazenadas as imagens grandes

$img['max_image_bytes'] = 200000;// tamanho máximo aceito para imagem, em bytes
$img['max_image_x'] = 128;//tamanho em que a largura da imagem pequena será redimensionada em pixels
$img['max_image_y'] = 96;//tamanho em que a altura da imagem pequena será redimensionada em pixels
$img['max_image_xx'] = 640;//tamanho em que a largura da imagem grande será redimensionada em pixels
$img['max_image_yy'] = 480;//tamanho em que a altura da imagem grande será redimensionada em pixels
$img['max_image_xxx'] = 400;//tamanho mínimo aceito para largura da imagem grande em pixels
$img['max_image_yyy'] = 300;//tamanho mínimo aceito para altura da imagem grande em pixels
$img['max_image_xxxx']=1000;//tamanho máximo aceito para largura da imagem grande em pixels 
$img['max_image_yyyy'] = 750;//tamanho máximo aceito para altura da imagem grande em pixels
$img['nomefotoBD'] = '';//será usado para armazenar o nome da imagem que irá para o bd
$img['setFotoDefault'] = true;//true para vincular foto default aos dados, e false para não vincular
$img['nomefotoDefault'] = 'fotodefault.jpg';//nome da foto default a ser vinculada aos dados 

$imgsEnviadas[] = '';// guardará imagens enviadas para o servidor e cadastradas no bd




?>
