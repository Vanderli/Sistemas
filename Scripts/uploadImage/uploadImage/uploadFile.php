<?php
	// Headers
	header("Content-Type: text/html; charset=ISO-8859-1", true);	

/******
*
* Versão: 1.0 - 03/12/2006
* Autor: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
*
* Incluir informações das notícias no banco de dados e chama o script de upload das imagens
*
* *****/

// incluir arquivos de configuração e de funções úteis ao sistema
require_once('include/config.php');
require_once('include/configBd.php');
require_once('include/functionsUpload.php');
// Fim incluir arquivos de configuração e de funções úteis ao sistema

/////////////////////////////////////////////////////////////////////////////////////////

//servidor configurado para aceitar upload
if(!ini_get('file_uploads'))
{
 	retornaErro('up');
	return;
}
// Fim servidor configurado para aceitar upload

//////////////////////////////////////////////////////////////////////////////////////////

//verificar dados enviados
if(isset($_POST['testaEnvio']) && $_POST['testaEnvio'] != '')
{
 	switch($_POST['testaEnvio'])
	{
		case 'texto':
			if(isset($_POST['titulo']) && isset($_POST['chamada']) && isset($_POST['texto'])  
					&& isset($_POST['data']) && $_POST['titulo'] != '' && $_POST['chamada'] != ''
					 && $_POST['texto'] != '' && $_POST['data'] != '')
			{
				$titulo = anti_injection($_POST['titulo']);
				$chamada = anti_injection($_POST['chamada']);
				$texto = anti_injection($_POST['texto']);
				$data = anti_injection($_POST['data']);
				if(isset($_POST['ordem']) && $_POST['ordem'] > 0 )
				{
					$ordem = anti_injection($_POST['ordem']);
				}
				else
				{
					$ordem = 0;
				}
			}
			else
			{
				retornaErro('dados');
	 			return;
			}
		break;
		case 'imagens':
			$arquivo = isset($_FILES["fotos"]) ? $_FILES["fotos"] : FALSE;
			if(!$arquivo)
			{
				retornaErro('dados');
	 			return;
			}
		break;
		case 'misto':
			if(isset($_POST['titulo']) && isset($_POST['chamada']) && isset($_POST['texto'])  
					&& isset($_POST['data']) && $_POST['titulo'] != '' && $_POST['chamada'] != ''
					 && $_POST['texto'] != '' && $_POST['data'] != '')
			{
				$titulo = anti_injection($_POST['titulo']);
				$chamada = anti_injection($_POST['chamada']);
				$texto = anti_injection($_POST['texto']);
				$data = anti_injection($_POST['data']);
				if(isset($_POST['ordem']) && $_POST['ordem'] > 0)
				{
					$ordem = anti_injection($_POST['ordem']);
				}
				else
				{
					$ordem = 0;
				}
			}
			else
			{
				retornaErro('dados');
	 			return;
			}
			
			$arquivo = isset($_FILES["fotos"]) ? $_FILES["fotos"] : FALSE;
			if(!$arquivo)
			{
				retornaErro('dados');
	 			return;
			}
		break;	
	}
}
else
{
	retornaErro('dados');
 	return;
}
// Fim verificar dados enviados

/////////////////////////////////////////////////////////

//envio de fotos
require_once('include/upload.php');

////////////////////////////////////////////////////////

//Cadastrar foto default caso o sistema esteja configurado para tal
if((!$arquivo) && ($img['setFotoDefault']) && ($img['nomefotoDefault'] != ''))
{	
	$fotoDefault = $img['nomefotoDefault'];
	$insertSQLDefault = "INSERT INTO `fotos` ( `id` , `id_noticia` , `foto` ) VALUES (NULL , '$id', '$fotoDefault')";
	$Result1 = mysql_query($insertSQLDefault, $db['con']) or die(mysql_error());
	if($Result1 > 0)
	{
		echo('Foto default anexada!<br/>');
	}
	else
	{
		echo('Falha ao anexar foto default!<br/>');
	}		
}
else
{
	if($_POST['testaEnvio'] == 'texto')
	{
		echo('Verifique se seu sistema está configurado para cadastrar informações com foto default, caso esteja, ocorreu um erro no envio destas informações para o banco de dados!<br>!');
	}
	else
	{
		if(!$img['setFotoDefault'])
		{
			retornaErro('fotoDefaul');
		}
		else
		{
			if($img['nomefotoDefault'] == '')
			{
				retornaErro('fotoDefaul');
			}
		}
	}
}

// Fim cadastrar foto default caso o sistema esteja configurado para tal

///////////////////////////////////////////////////////////////////////////////////////////

// cadastrar informação no bd
if($_POST['testaEnvio'] != 'imagens')
{
	if(($titulo != '') && ($chamada != '') && ($texto != '') && ($data != ''))
	{
		if($ordem > 0)
		{
			mysql_select_db($db['database'], $db['con']);
			$updateOrdem = "UPDATE `noticia` SET `ordem` = '0' WHERE `ordem` = '$ordem' LIMIT 1";
    	$Result = mysql_query($updateOrdem, $db['con']) or die(mysql_error());
			if(!($Result > 0))
			{
				echo('Falha ao Incluir Ordem da notícia - Corrija manualmente!');
			}
		}
	mysql_select_db($db['database'], $db['con']);
	$insertSQL = "INSERT INTO `noticia` ( `id` , `titulo` , `chamada` , `texto` , `data` , `ordem`) VALUES ('$id' , '$titulo', '$chamada', '$texto', '$data', '$ordem')";
	$Result = mysql_query($insertSQL, $db['con']) or die(mysql_error());
	if($Result > 0)
	{
		echo('Dados enviados com sucesso!<br/>');
		echo('<script> parent.resetForm(2); </script>');
	}
	else
	{
	 if(count($imgsEnviadas) > 0)
	 {
		for($i=0; $i < count($imgsEnviadas); $i++)
		{
			if(file_exists($img['diretorioImgPequena'] . 'P' . $imgsEnviadas[$i]))
			{
				$excFoto = @unlink ($img['diretorioImgPequena'] . 'P' . $imgsEnviadas[$i]);
				if(!$excFoto)
 	 			{
 	 				echo('Erro ao excluir P' . $imgsEnviadas[$i] . '. Anote o nome da foto e a exclua manualmente!');
  			}
			}
			if(file_exists($img['diretorioImgGrande'] . 'G' . $imgsEnviadas[$i]))
			{
				$excFoto1 = @unlink ($img['diretorioImgGrande'] . 'G' . $imgsEnviadas[$i]);
				if(!$excFoto1)
 	 			{
 	 				echo('Erro ao excluir G' . $imgsEnviadas[$i] . '. Anote o nome da foto e a exclua manualmente!');
  			}
			}
		}
	 }
	 echo('Falha no cadastro dos dados - Tente novamente!');
	 echo('<script> parent.resetForm(2); </script>');
	}
}
else
{
	if(count($imgsEnviadas) > 0)
	{
		for($i=0; $i < count($imgsEnviadas); $i++)
		{
			if(file_exists($img['diretorioImgPequena'] . 'P' . $imgsEnviadas[$i]))
			{
				$excFoto = @unlink ($img['diretorioImgPequena'] . 'P' . $imgsEnviadas[$i]);
				if(!$excFoto)
 	 			{
 	 				echo('Erro ao excluir P' . $imgsEnviadas[$i] . '. Anote o nome da foto e a exclua manualmente!');
  			}
			}
			if(file_exists($img['diretorioImgGrande'] . 'G' . $imgsEnviadas[$i]))
			{
				$excFoto1 = @unlink ($img['diretorioImgGrande'] . 'G' . $imgsEnviadas[$i]);
				if(!$excFoto1)
 	 			{
 	 				echo('Erro ao excluir G' . $imgsEnviadas[$i] . '. Anote o nome da foto e a exclua manualmente!');
  			}
			}
		}
	 }
	 
	retornaErro('dados');
	return;
}
}

/* echo('document.getElementById("acao").style.display = "none";');
echo('parent.resetForm(2);'); */
// Fim cadastrar informação no bd
?>
