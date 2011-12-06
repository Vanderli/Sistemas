<?  /* conexão com banco de dados */
	include("../../../conexao_db/conexaoTecnologia.php");
	
	// variável para excluir registro do banco
	$age_id = $_GET['age_id'];		
	# pasta onde será salvo a imagem
	$pasta = '../../../agenda/age_foto/age_id_'.$age_id.'/';		
	
	if((isset($age_id)) && ($age_id != "")){
		@$result = @mysql_query("DELETE FROM agenda WHERE age_id=".$age_id);
	
		# remove todas as fotos e a pasta
		foreach($fotos = scandir("$pasta") as $deletar) {
			@unlink($pasta."/".$deletar);
		}
		@rmdir($pasta);								
	}
	
	// Mensagem 
	if($result){
		echo "<script>alert('Exclusao realizada com sucesso!');
		 	   window.location.href='listar_agenda.php';</script>";	
	}else{
		echo "<script>alert('Falha na exclusão, contate o Administrador do sistema!');
			   window.location.href='listar_agenda.php';</script>";	
	}
?>