<?php
	/* conex�o com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// inicializo a sess�o.
	if (!isset($_SESSION)) { session_start(); }
	// guardo o  em uma vari�vel
	if (isset($_GET['not_id'])){$not_id = $_GET['not_id'];}
	
	// informa��es do servidor e banco de dados
	$usu_id           = $_SESSION['usu_id'];
	$dat_cad          = date('Y/m/d');
	$hora_cad         = date('G:i:s');
	
	$not_sec_id       = $_POST['not_sec_id'];	
	$not_blo_id       = $_POST['not_blo_id'];	
	$not_img          = $_FILES['not_img']['name'];
	$not_img_db       = $_POST['not_img_db'];
	$not_titulo       = trim(strtoupper($_POST['not_titulo']));
	$not_descricao    = trim($_POST['not_descricao']);
	$not_comentario   = trim($_POST['not_comentario']);
	$not_publicado    = $_POST['not_publicado'];
	$not_publicado_em = ( ($not_publicado == 'SIM')?$dat_cad.' '.$hora_cad:null );
	$not_status       = $_POST['not_status'];
	
	/* --------------------------- REGRAS PARA UPLOAD DE IMAGEM --------------------------- */
	$tiposPermitidos  = array('image/jpeg', 'image/pjpeg', 'image/jpg');	
	
   /*
    * Altura x Largura
	* M�nimo = 300px * 357 px
	* M�ximo = 450px * 536px
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
	
		# Se n�o houver altera��o na imagem
		if(!$not_img){
		
			$sql = "UPDATE noticias set  
									not_usu_id       = '$usu_id',
									not_dat_cad      = '$dat_cad',
									not_hora_cad     = '$hora_cad',
									not_sec_id       = '$not_sec_id',
									not_blo_id       = '$not_blo_id',
									not_titulo       = '$not_titulo',
									not_descricao    = '$not_descricao',
									not_comentario   = '$not_comentario',
									not_publicado    = '$not_publicado',
									not_publicado_em = '$not_publicado_em',
									not_status       = '$not_status'
						WHERE not_id = $not_id;";
									
		} else {		 
				$msg = "";
				# Tipo do arquivo
				if (array_search($arqType, $tiposPermitidos) === false) {
					$msg = 'O tipo de arquivo enviado � inv�lido!';					
				# Tamanho em kb
				} else if ($arqSize > $tamanhoPermitido) {
					$msg = 'O tamanho do arquivo enviado � maior que o limite!';
				# Largura m�xima					
				} else if ($dimensoes[0] > $largura_max) {
					$msg  = 'A largura da imagem n�o deve ultrapassar '.$largura_max.' pixels';
				# Altura m�xima				
				} else if ($dimensoes[1] > $altura_max) {
					$msg  = 'Altura da imagem n�o deve ultrapassar '.$altura_max.' pixels';	
				# Largura m�nima
				} else if ($dimensoes[0] < $largura_min) {
					$msg = 'Largura da imagem n�o deve ser menor '.$largura_min.' pixels';
				# Altura m�nima
				} else if ($dimensoes[0] < $altura_min) {
					$msg = 'Altura da imagem n�o deve ser menor '.$altura_min.' pixels';
				}
				# Obriga a cadastrar a Secretaria
				if(!$not_sec_id){ $msg = 'Favor informar qual secretaria est� relacionado a noticia';}
				
				if($msg){
					header("Location: cad_noticias.php?not_id=$not_id&edit=true&msg=$msg");
					exit;
				}			
				# pasta onde ser� salvo a imagem
				$pasta = '../../../noticia/not_foto/not_id_'.$not_id.'/';
				// excluo a imagem que existe para subistituir pela nova
				
				@unlink($pasta.$not_img_db);				
				@mkdir($pasta,0777);	
				@move_uploaded_file($arqTemp, $pasta . $not_img);
				
				$sql = "UPDATE noticias set  
								not_usu_id       = '$usu_id',
								not_dat_cad      = '$not_dat_cad',
								not_hora_cad     = '$not_hora_cad',
								not_sec_id       = '$not_sec_id',
								not_blo_id       = '$not_blo_id',
								not_img          = '$not_img',
								not_titulo       = '$not_titulo',
								not_descricao    = '$not_descricao',
								not_comentario   = '$not_comentario',
								not_publicado    = '$not_publicado',
								not_publicado_em = '$not_publicado_em',
								not_status       = '$not_status'
						WHERE not_id = $not_id;";	
							
		} // fecha else
		
		# executa o sql	
		$result = @mysql_query($sql) or die($msg[2]);

		if($result){
			echo "<script>alert('Dados Alterados com sucesso')</script>";
			echo "<script>location.href='listar_noticias.php'</script>";
		}
		// Libera um resultado da mem�ria
		mysql_free_result($result);
?>