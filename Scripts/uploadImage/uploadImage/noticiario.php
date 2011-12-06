<?php require_once('include/configBd.php'); ?>
<?php
if(!@mysql_select_db($db['database'], $db['con']) )
{
	echo('Falha ao secionar BD!');
}

$query_rsNoticias = "SELECT * FROM `noticia` WHERE ordem > 0 ORDER BY `ordem` ASC LIMIT 0 , 5";
$rsNoticias = mysql_query($query_rsNoticias, $db['con']) or die(mysql_error());
$totalRows_rsNoticias = mysql_num_rows($rsNoticias);
$row_rsNoticias1 = mysql_fetch_assoc($rsNoticias);
$noticia = $row_rsNoticias1['id'];

mysql_select_db($db['database'], $db['con']);
$query_rsImagem = "SELECT * FROM `fotos` WHERE `id_noticia` = '$noticia'" ;
$rsImagem = mysql_query($query_rsImagem, $db['con']) or die(mysql_error());
$row_rsImagem = mysql_fetch_assoc($rsImagem);
$totalRows_rsImagem = mysql_num_rows($rsImagem); 

if($totalRows_rsNoticias > 0)
{
	$row_rsNoticias2 = mysql_fetch_assoc($rsNoticias);
	$row_rsNoticias3 = mysql_fetch_assoc($rsNoticias);
	$row_rsNoticias4 = mysql_fetch_assoc($rsNoticias);
	$row_rsNoticias5 = mysql_fetch_assoc($rsNoticias); 
?>

<!------------------------------------------------------------------------------------->
<script language="JavaScript" type="text/javascript">	
function someFoto()
{
	document.getElementById("mostraFoto").style.display ='none';
	document.getElementById("overlay").style.display ='none';			
	document.getElementById("mostraFoto").innerHTML  = '';	
}

function loadFoto(foto)
{
	document.getElementById("teste").innerHTML = '<img src="' +foto+ '" onLoad="mostraFoto(\''+foto+'\')" height="1" width="1" id="foto">';
}

function mostraFoto(foto){
	var imagem = new Image();
	imagem.src = foto;
	var x = imagem.height;
	var y = imagem.width;
	
	
	var mostra = '';
	mostra += '<br><div align="center"><img src="'+foto+'"><br><br>';
	mostra += '<a href="javascript:someFoto()" title="Fechar"><span style="background-color:#FFFFFF;">Fechar</span></a><br></div>';
	
	document.getElementById("mostraFoto").style.height = (x);
	document.getElementById("mostraFoto").style.width = (y+30);
	
	//Pegar tamanho da tela
	w = screen.availWidth;
	h = screen.availHeight;
	
	document.getElementById("overlay").style.width = w;
	document.getElementById("overlay").style.height = h;
	document.getElementById("overlay").style.display ='block';
	
	//Posicionar a foto na tela
	document.getElementById("mostraFoto").style.top = (20);
	document.getElementById("mostraFoto").style.left = ((w/2)-(y/2));
	
	//Mostrar a foto
	document.getElementById("mostraFoto").innerHTML = mostra;
	document.getElementById("mostraFoto").style.display ='block';
}

</script>
<!------------------------------------------------------------------------------------->


<style type="text/css">
<!--
 * {
	margin:0px; pading:0px;
}
  .formata { /* esta classe é somente 
               para formatar a fonte */
  font: 12px arial, verdana, helvetica, sans-serif;
  }
  a.dcontexto{
  position:relative; 
  font:12px arial, verdana, helvetica, sans-serif; 
  padding:0;
  color: #FFFF00;
  text-decoration:none;
  background-color:#006633;
  z-index:24;
  }
 
  #overlay {
	display: none;
	position: absolute;
	left: 0 px;
	top: 0 px;
	background-image: url(images/overlay.png);
	z-index:26;
	filter: Alpha(Opacity=65);
} 

  a.dcontexto:hover{
  background: #009900;
  z-index:25; 
  }
  a.dcontexto span{display: none}
  a.dcontexto:hover span{ 
  display:block;
  position: absolute;
  width:170px; 
  top:3em;
  text-align:justify;
  left:0;
  font: 12px arial, verdana, helvetica, sans-serif; 
  padding:5px 10px;
  border:1px solid #999;
  background:#e0ffff; 
  color:#000;
  }
.tabela #mostraFoto {
	background-color: #FFFFFF;
	display: none;
	padding-bottom: 40px;
	border: 15px; color:#FFFFFF;
	position: absolute;
	z-index:27;
}
#teste {
	display: none;
}
-->
</style>

<table width="100%"border="0" align="center" class="tabela">
<tr>
  <td width="100%"><table width="100%" align="center">
    <tr>
      <td colspan="2" align="center">
	  
<!----- Abaixo a div que conterá a foto grande, e a div que contém o link fechar -------------->
	  <div id="teste"></div>	  
	  <div id="overlay" onclick="javascript:someFoto()"></div>	  
      <div id="mostraFoto"> </div>			
<!----- Acima a div que conterá a foto grande, e a div que contém o link fechar -------------->

			
		</td>
    </tr>
    <tr>
      <td colspan="2" bgcolor="#CCCCCC" align="center"><font size="3" face="Verdana, Arial, Helvetica, sans-serif"><strong> <?php echo $row_rsNoticias1['titulo']; ?> </strong></font></td>
    </tr>
    <tr>
      <td width="89%" bgcolor="#DEF3E2"><a href="noticia.php?id=<?php echo $row_rsNoticias1['id']; ?>" target="_self"><?php echo $row_rsNoticias1['chamada']; ?></a><a href="noticia.php?id=<?php echo $row_rsNoticias1['id']; ?>" target="_self"></a></td>
      <td width="11%"><?php
			$fileExiste = 'images/grd/'; // coloque o caminho da imagens grandes
			$fileExiste .= 'G' . $row_rsImagem['foto'];
			if(!file_exists($fileExiste))
			{
				$fileExiste = 'naoExisteFoto';
			}
		?>
		
		
<!---------------------------- Abaixo o link --------------------------------------->	
 
            <div class="formata"><a class="dcontexto" href="#"><img src="images/pqn/<?php echo('P' . $row_rsImagem['foto']); ?>" width="80" height="96" 
			onclick="loadFoto('<?php echo($fileExiste); ?>')"  border="0"/>	
		<?php	                  
			if($fileExiste != 'naoExisteFoto')
			{
			?>
                  <span>Clique na foto para ampliá-la.</span>
            <?php
			}
			?>
          </a></div>
<!-------------------------- Acima o link ----------------------------------------->		
  
	    </td>
    </tr>
  </table>
      <table width="100%" align="center">
        <tr align="center" >
          <td width="50%" align="center" bgcolor="#CCCCCC"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong> <?php echo $row_rsNoticias2['titulo']; ?> </strong></font></td>
          <td bgcolor="#CCCCCC" align="center" width="50%"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong> <?php echo $row_rsNoticias3['titulo']; ?> </strong></font></td>
        </tr>
        <tr>
          <td align="left" bgcolor="#DEF3E2"><a href="noticia.php?id=<?php echo $row_rsNoticias2['id']; ?>" target="_self"> <?php echo $row_rsNoticias2['chamada'];	
		?></a> </td>
          <td align="left" bgcolor="#DEF3E2"><a href="noticia.php?id=<?php echo $row_rsNoticias3['id']; ?>" target="_self"> <?php echo $row_rsNoticias3['chamada'];
	  ?></a> </td>
        </tr>
        <tr>
          <td colspan="2" align="center" bgcolor="#CCCCCC"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong> <?php echo $row_rsNoticias4['titulo']; ?> </strong></font></td>
        <tr>
          <td colspan="2" bgcolor="#DEF3E2" align="left"><a href="noticia.php?id=<?php echo $row_not[3]['id']; ?>" target="_self"><?php echo $row_rsNoticias4['chamada'];
	  ?></a></td>
        </tr>
        <tr>
        <tr>
          <td colspan="2" align="center" bgcolor="#CCCCCC"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong><?php echo $row_rsNoticias5['titulo']; ?></strong></font></td>
        <tr>
          <td colspan="2" bgcolor="#DEF3E2" align="left"><a href="noticia.php?id=<?php echo $row_not[4]['id']; ?>" target="_self"><?php echo $row_rsNoticias5['chamada'];
	  ?></a></td>
        </tr>
      </table>
    <?php
}
else
{
	echo('<br><br><br><br><center><b> Notícia não encontrada, <br />ou<br />
 nenhuma notícia selecionada para exibição na tela principal </b></center>');
}

mysql_free_result($rsNoticias);
mysql_free_result($rsImagem);
?>
