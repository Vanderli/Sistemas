<?
##############################
#   Relógio Digital em GD    #
##############################
# Versão: 1.0                #
# Autor: Hans Bonini         #
##############################
# Código disponivél apenas   #
# para estudos, proibida a   #
# reprodução ou venda!       #
##############################

# Cabeçalho
header("Content-Type: image/png"); // Indica ao Navegador que o Contéudo é uma imagem!

# Váriavéis
$horas = date('h:i:s'); // Usamos a função date() para chamar as horas
$imagem = imageCreate(128, 32); // Cria uma Imagem 128x32

 # Paleta de Cores
 $preto = imagecolorallocate($imagem, 0, 0 ,0); // Adciona a Imagem a Cor Preta

 # Desenhando o Relógio
 imageRectangle($imagem, 0, 0, 127, 31, $preto); // Desenha um Retângulo com Borda Preta

 # Preenchendo com Gradiente (3d) Laranja
 for ($i=0; $i <= 30; $i++) { // Inicia um Loop
  $cor_i = imagecolorallocate($imagem, (254-($i*2)), (155-($i*2)), 0); // Faz com que a cor laranja diminua gradualmente até a cor preta
  imagefilledrectangle($imagem, 1, ($i+1), 126, ($i+1), $cor_i); // Desenha linha por linha com a cor graduada do laranja
 }

 # Escrevendo as Horas no Relógio
 imagestring($imagem, 80, 30, 8, $horas, $preto); // Escreve as horas na imagem, com a fonte tahoma, na cor preta

  # Exibindo o Relógio
  imagePNG($imagem); // Exibe o Relógio como uma Imagem PNG,
                     // caso queira salvar use:
                     // imagePNG($imagem, 'local/destino/arquivo');
                     // lembrando de que o diretório deve ter CHMOD 777

 # Finalizando
 imagedestroy($imagem); // Destrói a Imagem e libera o buffer!

?>