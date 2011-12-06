// JavaScript Diversas funções
$(document).ready(function(){
	
	/* Verificar Login */
	verificaLogin = function() {
		$.ajax({
			type: "POST",
			url: "login/php_jquery_verifica_login.php",
			dataType: "html",
			data: "login=" + $("#login").val(),
			success: function(ret) 
			{
				if (ret=="inativo")
				{
					$("#btn_logar").attr('disabled','disabled');	
					$("#msg").hide();			 
					$("#msg").text('Usuário bloqueado pelo Administrador do Sistema, favor entrar em contato com o Departamento de Tecnologia e Informação!').show('show');							
				}
			}
		});
	} // fecha verificaLogin
		
	
	/* Mudar cor quando selecionar campo */
	// focus nos campos	
	$("input:text, textarea, input:password, select:option").focus(function(){	
		$(this).toggleClass('campo_focus');
	});
	/* quando o objeto perde o focus */
	$("input:text, textarea, input:password, select:option").blur(function(){
		$(this).toggleClass('campo_focus');
	});
	/* Fim do mudar cor do campo */
	
	/* zebrar tabela */
	 $('tbody tr:even').addClass('zebrar');
	/* fim zebrar tabela*/
	
	/* máscara no campo 
	$('#age_data_evento').mask("99/99/9999");
	$('#age_hora_evento').mask("99:99");
	 fim máscara */

	
});
/* -------------------------- Gerar senha Aleatória -------------------------- */
	// texto que usarei para senha
	var textSenha = "abcdefghijklmnopqrstuvwxyz123456789";
	var temp='';

	function gerar_senha(tam_texto){
		temp='';
		for(i=0;i<tam_texto;i++)
			temp += textSenha.charAt(Math.floor(Math.random()*textSenha.length));
			return temp;
	}
	function popular(temp){
		document.admin_usuarios.usu_senha.value=gerar_senha(temp);
	}
/* -------------------------- FIM  senha Aleatória -------------------------- */

/* --------------------- Explica o motivo por não exibir a senha ------------- */
function senha_texto(c){
	if(c.value == "NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!"){
		c.value = "";
	 } else if(c.value == "") {
	 	c.value = "NÃO EXIBIDA POR MOTIVOS DE SEGURANÇA!";
	 }
} 
/* ----------------- FIM  Explica o motivo por não exibir a senha ----------- */