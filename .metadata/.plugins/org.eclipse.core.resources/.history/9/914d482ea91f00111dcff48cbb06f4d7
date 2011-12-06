<?php //print_r($_POST);exit;
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// inicializo a sessão.
	if (!isset($_SESSION)) { session_start(); }
	
	// informações do servidor e banco de dados
	$usu_id       = $_SESSION['usu_id'];
	$dat_cad      = date('Y/m/d');
	$hora_cad     = date('G:i:s');
	
	$not_sec_id       = $_POST['not_sec_id'];	
	$not_blo_id       = $_POST['not_blo_id'];	
	$not_img          = $_FILES['not_img']['name'];
	$not_titulo       = trim(strtoupper($_POST['not_titulo']));
	$not_descricao    = trim($_POST['not_descricao']);
	$not_comentario   = trim($_POST['not_comentario']);
	$not_publicado    = trim($_POST['not_publicado']);
	$not_publicado_em = ( ($not_publicado == 'SIM')?$dat_cad.' '.$hora_cad:null );
	$not_status       = trim($_POST['not_status']);
	
	/* --------------------------- REGRAS PARA UPLOAD DE IMAGEM --------------------------- */
	$tiposPermitidos  = array('image/jpeg', 'image/pjpeg', 'image/jpg');	
	
   /*
    * Altura x Largura
	* Mínimo = 300px * 357 px
	* Máximo = 450px * 536px
	*/
	$altura_min = 300;  $altura_max = 357;	 
	$largura_min = 450; $largura_max = 536;
	
	$tamanhoPermitido = 1024 * 500; // 500 Kb
	$dimensoes        = getimagesize($_FILES['not_img']["tmp_name"]);
	$arqName          = $_FILES['not_img']['name'];
	$arqType          = $_FILES['not_img']['type'];
	$arqSize          = $_FILES['not_img']['size'];
	$arqTemp          = $_FILES['not_img']['tmp_name'];
	$arqError         = $_FILES['not_img']['error'];
	/* --------------------------- FIM REGRAS --------------------------- */
		
		$msg = "";

			# Tipo do arquivo
			if (array_search($arqType, $tiposPermitidos) === false) {
				$msg = 'O tipo de arquivo enviado é inválido!';					
			# Tamanho em kb
			} else if ($arqSize > $tamanhoPermitido) {
				$msg = 'O tamanho do arquivo enviado é maior que o limite!';
			# Largura máxima					
			} else if ($dimensoes[0] > $largura_max) {
				$msg  = 'A largura da imagem não deve ultrapassar '.$largura_max.' pixels';
			# Altura máxima				
			} else if ($dimensoes[1] > $altura_max) {
				$msg  = 'Altura da imagem não deve ultrapassar '.$altura_max.' pixels';	
			# Largura mínima
			} else if ($dimensoes[0] < $largura_min) {
			    $msg = 'Largura da imagem não deve ser menor '.$largura_min.' pixels';
			# Altura mínima
			} else if ($dimensoes[0] < $altura_min) {
			    $msg = 'Altura da imagem não deve ser menor '.$altura_min.' pixels';
			}
			# Obriga a cadastrar a Secretaria
			if(!$not_sec_id){ $msg = 'Favor informar qual secretaria está relacionado a noticia';}
		
			if($msg){
				header("Location: cad_noticias.php?msg=$msg");
				exit;
			}

			$sql = "INSERT INTO noticias(not_usu_id,
										 not_dat_cad,
										 not_hora_cad,
										 not_sec_id,
										 not_blo_id,
										 not_img,
										 not_titulo,
										 not_descricao,
										 not_comentario,
										 not_publicado,
										 not_publicado_em,
										 not_status)
						VALUES ('$usu_id',
								'$dat_cad',
								'$hora_cad',
								'$not_sec_id',
								'$not_blo_id',
								'$not_img',
								'$not_titulo',
								'$not_descricao',
								'$not_comentario',
								'$not_publicado',
								'$not_publicado_em',
								'$not_status');";			

																	
			$result = @mysql_query($sql) or die($msg[2]);
			
			# id do cadastro atual
			$id_atual = mysql_insert_id();		
			
			$pasta = "../../../noticia/not_foto/not_id_".$id_atual."/";
			@mkdir($pasta,0777);	
			@move_uploaded_file($arqTemp, $pasta . $not_img);
		
			if($result){
				echo "<script>alert('Dados inseridos com sucesso')</script>";
				echo "<script>location.href='listar_noticias.php'</script>";
			}
		
			// Libera um resultado da memória
			mysql_free_result($result);


?>