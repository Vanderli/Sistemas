<?php

// Headers

header("Content-Type: text/html; charset=ISO-8859-1", true);

?>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>

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

* Fim Créditos - Fábio - www.imasters.com

*

*******/

	



/******

*

* Créditos: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br

*

* Alterar informações das notícias na base de dados

*

* ******/



	function invertData($data)

	{

		$data_mysql = explode(" ", $data);

		$data_mysql1 = implode("/", array_reverse(explode("-", $data_mysql[0])));

		return ($data_mysql1 . " " . $data_mysql[1]);

	}

	

	require_once('include/configBd.php');

	mysql_select_db($db['database'], $db['con']);

	if(isset($_GET['passo']) && isset($_GET['id']))

	{

		$id = anti_injection($_GET['id']);

		if((anti_injection($_GET['passo'])) == 1)

		{  
			
			
			

			$selectIdSQL = "SELECT * FROM (`noticia`) WHERE `id`='$id'";
			$selectFotoSQL = "SELECT * FROM (`fotos`) WHERE `id_noticia`='$id' ORDER BY `id` ASC";
			
			$selectId = mysql_query($selectIdSQL, $db['con']) or die(mysql_error());
			$selectFoto = mysql_query($selectFotoSQL, $db['con']) or die(mysql_error());

			$row = mysql_fetch_assoc($selectId);
			$selectTotalFotos = mysql_num_rows($selectFoto);
			$rowFoto = mysql_fetch_assoc($selectFoto);


?>

  <form id="form_alterar" name="form_alterar">

		<label class="titulo">T&iacute;tulo</label><br/>

		<input name="titulo" type="text" size="60"

 	  value="<?php echo($row['titulo']); ?>"/><br/><br/>

		

		<label class="titulo">Chamada</label><br/>

		<textarea name="chamada" cols="45" rows="3"><?php echo($row['chamada']); ?></textarea><br/><br/>

		

		<label class="titulo">Texto</label><br/>

		<textarea name="texto" cols="45" rows="7"><?php echo($row['texto']); ?></textarea><br/><br/>

		

		<label class="titulo">Data</label><br/>

		<input name="data" type="text" size="60" readonly="readonly"

		value="<?php echo(invertData($row['data'])); ?>"/><br/><br/>
		
        
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
        
        
        <br/>
		<label id="texto" class="txt">Escolha a ordem de visualização das notícias:</label>		

		<select name="ordem">

	  	  <option value="0" 

				<?php if($row['ordem'] == 0)

				{

					echo('selected="selected"');

				}

				?>

				>0</option>

	  	  <option value="1"

				<?php if($row['ordem'] == 1)

				{

					echo('selected="selected"');

				}

				?>

				>1</option>

	  	  <option value="2"

				<?php if($row['ordem'] == 2)

				{

					echo('selected="selected"');

				}

				?>

				>2</option>

	  	  <option value="3"

				<?php if($row['ordem'] == 3)

				{

					echo('selected="selected"');

				}

				?>

				>3</option>

	  	  <option value="4"

				<?php if($row['ordem'] == 4)

				{

					echo('selected="selected"');

				}

				?>

				>4</option>

				<option value="5"

				<?php if($row['ordem'] == 5)

				{

					echo('selected="selected"');

				}

				?>

				>5</option>

 	</select><br/><br/>

	<input name="id" type="hidden" value="<?php echo($row['id']); ?>" />

	<ul class="menu">

		<li><a href='javascript:validaForm2()'>Alterar</a></li>

	</ul>	

</form>

<?php		

		}

		else

		{

			if((anti_injection($_GET['passo'])) == 2)

			{

				if(isset($_GET['titulo']) && isset($_GET['chamada']) && isset($_GET['texto'])

					&& $_GET['titulo'] != '' && $_GET['chamada'] != '' && $_GET['texto'] != ''

					&& isset($_GET['ordem']) && isset($_GET['id']) && isset($_GET['browser']) &&

					$_GET['ordem'] != '' && $_GET['id'] != '' && $_GET['browser'] != '' )

				{

					//se browser for IE

					if($_GET['browser'] == 1)

					{

						$titulo = anti_injection(trim($_GET['titulo']));

						$chamada = anti_injection(trim($_GET['chamada']));

						$texto = anti_injection(trim($_GET['texto']));

						$ordem = anti_injection(trim($_GET['ordem']));

						$id = anti_injection(trim($_GET['id']));

				}

					else

					{

						$titulo = utf8_decode(anti_injection(trim($_GET['titulo'])));

						$chamada = utf8_decode(anti_injection(trim($_GET['chamada'])));

						$texto = utf8_decode(anti_injection(trim($_GET['texto'])));

						$ordem = utf8_decode(anti_injection(trim($_GET['ordem'])));

						$id = utf8_decode(anti_injection(trim($_GET['id'])));

					}

			

					$ordemSQL = "SELECT * FROM (`noticia`) WHERE `id`='$id'";

					$ordemId = mysql_query($ordemSQL, $db['con']) or die(mysql_error());

					$rowOrdem = mysql_fetch_assoc($ordemId);

					$ordemAntiga = $rowOrdem['ordem'];					

					$alterando = $ordemAntiga;

					$updateOrdem = "UPDATE `noticia` SET `ordem` = '$alterando' WHERE `ordem` = '$ordem' LIMIT 1";

		 			$Result2 = mysql_query($updateOrdem, $db['con']) or die(mysql_error());

					if($Result2 > 0)

					{

						$alteraIdSQL = "UPDATE `noticia` SET titulo='$titulo', chamada='$chamada', texto='$texto', ordem='$ordem' WHERE id='$id'";				

						$alteraId = mysql_query($alteraIdSQL, $db['con']) or die(mysql_error());

						if($alteraId > 0)			

						{

							echo('Informação alterada em nossa base de dados!');

						}

						else

						{

							echo('Erro ao alterar informação - Tente novamente!');

						}

					}

					else

					{

						echo('Erro ao alterar informação - Tente novamente!');

					}					

				}

				else

				{

					echo('Erro no envio dos dados - Tente novamente!');

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

