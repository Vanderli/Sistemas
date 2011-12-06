<?php //print_r($_FILES);exit;
	/* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	// funções prontas em php
	include("../../lib_PHP/biblioteca.php");
	
	// inicializo a sessão.
	if (!isset($_SESSION)) { session_start(); }
	
	// informações do servidor e banco de dados
	$usu_id       = $_SESSION['usu_id'];
	$dat_cad      = date('Y/m/d');
	$hora_cad     = date('G:i:s');
	
	$age_img          = $_FILES['age_img']['name'];	
	$age_titulo       = trim($_POST['age_titulo']);
	$age_data_evento  = trim($_POST['age_data_evento']);
	$age_hora_evento  = trim($_POST['age_hora_evento']);	
	$age_local_evento = trim($_POST['age_local_evento']);	
	$age_desc_evento  = trim($_POST['age_desc_evento']);	
	$age_status       = trim($_POST['age_status']);	
		
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
	$dimensoes        = getimagesize($_FILES['age_img']["tmp_name"]);
	$arqName          = $_FILES['age_img']['name'];
	$arqType          = $_FILES['age_img']['type'];
	$arqSize          = $_FILES['age_img']['size'];
	$arqTemp          = $_FILES['age_img']['tmp_name'];
	$arqError         = $_FILES['age_img']['error'];
	/* --------------------------- FIM REGRAS --------------------------- */
		
		$msg = "";

			# Tipo do arquivo
			if (array_search($arqType, $tiposPermitidos) === false) {
				$msg = 'O tipo de arquivo enviado e invalido!';					
			# Tamanho em kb
			} else if ($arqSize > $tamanhoPermitido) {
				$msg = 'O tamanho do arquivo enviado e maior que o limite!';
			# Largura máxima					
			} else if ($dimensoes[0] > $largura_max) {
				$msg  = 'A largura da imagem nao deve ultrapassar '.$largura_max.' pixels';
			# Altura máxima				
			} else if ($dimensoes[1] > $altura_max) {
				$msg  = 'Altura da imagem nao deve ultrapassar '.$altura_max.' pixels';	
			# Largura mínima
			} else if ($dimensoes[0] < $largura_min) {
			    $msg = 'Largura da imagem nao deve ser menor '.$largura_min.' pixels';
			# Altura mínima
			} else if ($dimensoes[0] < $altura_min) {
			    $msg = 'Altura da imagem nao deve ser menor '.$altura_min.' pixels';
			}
		
			if($msg){
				header("Location: cad_agenda.php?msg=$msg");
				exit;
			}

			$sql =     "INSERT INTO agenda(age_usu_id ,
								age_dat_cad ,
								age_hora_cad ,
								age_img ,
								age_titulo ,
								age_data_evento ,
								age_hora_evento ,
								age_local_evento ,
								age_desc_evento ,
								age_status)
						VALUES ('$usu_id',
								'$dat_cad',
								'$hora_cad',
								'$age_img',
								'$age_titulo',
								'$age_data_evento',
								'$age_hora_evento',
								'$age_local_evento',
								'$age_desc_evento',
								'$age_status')";
			
			//print_r($sql);exit;
																	
			$result = @mysql_query($sql) or die($msg[2]);
			
			# id do cadastro atual
			$id_atual = mysql_insert_id();		
			
			$pasta = "../../../agenda/age_foto/age_id_".$id_atual."/";
			@mkdir($pasta,0777);	
			@move_uploaded_file($arqTemp, $pasta . $age_img);
		
			if($result){
				echo "<script>alert('Dados inseridos com sucesso')</script>";
				echo "<script>location.href='listar_agenda.php'</script>";
			}
		
			// Libera um resultado da memória
			mysql_free_result($result);
?>