// JavaScript Apenas fun��es de valida��o dos campos
$(document).ready(function(){
	
	/* validar formul�rio de alterar senha */
	$("#alt_senha_usu").validate({
		// Define as regras
		rules:{
			senha_atual:{
				required: true
			},
			nova_senha: {
				required: true,
				minlength: 1
			},
			conf_nova_senha: {
				required: true,
				equalTo: "#nova_senha"
			}
	
		},
		// Define as mensagens de erro para cada regra
		messages:{
			senha_atual:{
				required: "Informe sua Senha Atual"
			},
			nova_senha:{
				required: "Informe sua Nova Senha",
				minlength: "A senha deve conter, no m�nimo, 6 caracteres"
			},
			conf_nova_senha:{
				required: "Confirme sua Nova Senha",
				minlength: "A senha deve conter, no m�nimo, 6 caracteres",
				equalTo: "Senhas diferentes"
			}
		}
	});
	
	
	
	

	
});