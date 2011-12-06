<?php

 // Headers

	header("Content-Type: text/html; charset=ISO-8859-1", true);	



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

* Fim Créditos - Fábio - www.imasters.com

*

*******/





/******

*

* Créditos: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br

*

* excluir notícias da base de dados

*

* ******/



	

	

	function invertData($data)

	{

		$data_mysql = explode(" ", $data);

		$data_mysql1 = implode("/", array_reverse(explode("-", $data_mysql[0])));

		return ($data_mysql1 . " " . $data_mysql[1]);

	}

	

	require_once('include/configBd.php');
	require_once('include/config.php');

	mysql_select_db($db['database'], $db['con']);

	if(isset($_GET['passo']) && isset($_GET['id']))

	{

		$id = anti_injection(trim($_GET['id']));

		if(anti_injection($_GET['passo']) == 1)

		{  

			$selectIdSQL = "SELECT * FROM (`noticia`) WHERE `id`='$id'";
			$selectFotoSQL = "SELECT * FROM (`fotos`) WHERE `id_noticia`='$id' ORDER BY `id` ASC";

			$selectId = mysql_query($selectIdSQL, $db['con']) or die(mysql_error());
			$selectFoto = mysql_query($selectFotoSQL, $db['con']) or die(mysql_error());
			$selectTotalFotos = mysql_num_rows($selectFoto);

			$row = mysql_fetch_assoc($selectId);
			$rowFoto = mysql_fetch_assoc($selectFoto);
?>

  <form name="excluir" enctype="application/x-www-form-urlencoded">

		<label class="titulo">T&iacute;tulo</label><br/>

		<input name="titulo" type="text" size="60" readonly="readonly" 

 	  value="<?php echo($row['titulo']); ?>"/><br/><br/>

		

		<label class="titulo">Chamada</label><br/>

		<textarea name="chamada" cols="45" rows="3" readonly="readonly"><?php echo($row['chamada']); ?></textarea><br/><br/>

		

		<label class="titulo">Texto</label><br/>

		<textarea name="texto" cols="45" rows="7" readonly="readonly"><?php echo($row['texto']); ?></textarea><br/><br/>

		

		<label class="titulo">Data</label><br/>

		<input name="data" type="text" size="60" readonly="readonly" value="<?php echo(invertData($row['data'])); ?>" />
		<br/><br/>
		
        <label class="titulo">
        <?php 
			if($selectTotalFotos > 1)
			{
				echo(Imagens);
			}
			else
			{
				echo(Imagem);
			}
		?>        
        </label><br/>
		
        <?php do{ ?>
					
		<input name="foto" type="text" size="60" readonly="readonly" value="<?php echo($rowFoto['foto']); ?>" /><br/>
			
		<?php  } while ($rowFoto = mysql_fetch_assoc($selectFoto)); ?>
        
        <br />
        <label class="titulo">Ordem de visualização da notícia:</label>
		<input name="ordem" type="text" size="5" readonly="readonly" value="<?php echo($row['ordem']); ?>" />
		<br/>
        
        
		<input name="id" type="hidden" value="<?php echo($row['id']); ?>" />

		<ul class="menu">

			<li><a href='javascript:action("excluir")'>Excluir</a></li>

		</ul>	

</form>		

<?php		

		}

		else

		{

			if((anti_injection($_GET['passo'])) == 2)

			{
				// excluir as fotos da pasta images
				$selectFotoSQL = "SELECT * FROM (`fotos`) WHERE `id_noticia`='$id' ORDER BY `id` ASC";
				$selectFoto = mysql_query($selectFotoSQL, $db['con']) or die(mysql_error());
				$rowFoto = mysql_fetch_assoc($selectFoto);
				do
				{
					unlink($img['diretorioImgPequena'].'P'.$rowFoto['foto']);	
					unlink($img['diretorioImgGrande'].'G'.$rowFoto['foto']);
				} while ($rowFoto = mysql_fetch_assoc($selectFoto));
				// excluir a notícia do banco de dados
				$deleteIdSQL = "DELETE FROM `noticia` WHERE `id`='$id'";
				$deleteId = mysql_query($deleteIdSQL, $db['con']) or die(mysql_error());
				// Excluir os nomes das fotos do banco de dados
				$deleteIdFotoSQL = "DELETE FROM `fotos` WHERE `id_noticia`='$id'";				
				$deleteIdFoto = mysql_query($deleteIdFotoSQL, $db['con']) or die(mysql_error());

				if($deleteId > 0)			

				{

					echo('Informação excluída de nossa base de dados!');

				}

				else

				{

					echo('Erro ao excluir informação - Tente novamente!');

				}

			}

			else

			{

				echo('Erro no envio dos dados - Tente novamente!');

			}

		}

	}

	else

	{

		echo('Erro no envio dos dados - Tente novamente!');

	}	

?>

