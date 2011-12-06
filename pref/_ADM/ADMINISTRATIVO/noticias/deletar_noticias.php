<?  /* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// variável para excluir registro do banco
	$not_id = $_GET['not_id'];		
	# pasta onde será salvo a imagem
	$pasta = '../../../noticia/not_foto/not_id_'.$not_id.'/';		
	
	if((isset($not_id)) && ($not_id != "")){
		@$result = @mysql_query("DELETE FROM noticias WHERE not_id=".$not_id);
	
		# remove todas as fotos e a pasta
		foreach($fotos = scandir("$pasta") as $deletar) {
			@unlink($pasta."/".$deletar);
		}
		@rmdir($pasta);								
	}
	
	// Mensagem 
	if($result){
		echo "<script>alert('Exclusao realizada com sucesso!');
		 	   window.location.href='listar_noticias.php';</script>";	
	}else{
		echo "<script>alert('Falha na exclusão, contate o Administrador do sistema!');
			   window.location.href='listar_noticias.php';</script>";	
	}
?>