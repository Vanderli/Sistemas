$().ready(function() {
						   
	/* --------------------- Mudar cor quando selecionar campo ------------------------------ */
	// focus nos campos	
	$("input:text, textarea, input:password, select:option").focus(function(){	
		$(this).toggleClass('campo_focus');
	});
	/* quando o objeto perde o focus */
	$("input:text, textarea, input:password, select:option").blur(function(){
		$(this).toggleClass('campo_focus');
	});
	/* --------------------- Fim Mudar cor quando selecionar campo --------------------------- */					   
	
	/* --------------------- Contraste ------------------------------ */
	$('#acs_contraste').click(function(){
		$('body').toggleClass('acs_contraste');
		return false;
	});
	/* --------------------- Fim Contraste --------------------------- */
	
	
	/* ---------- Diminuir e aumentar tamanho do texto ------------- */
	var fonte = 1;	
	$('#acs_aumenta_fonte').click(function(){
		if (fonte<1.3){
			fonte = fonte+0.1;
			$('#sub_container').css({'font-size' : fonte+'em'});
		}
	});
	$('#acs_reduz_fonte').click(function(){
		if (fonte>0.8){
			fonte = fonte-0.1;
			$('#sub_container').css({'font-size' : fonte+'em'});
		}
	});// fecha function texto
	
	// Aumentar tamanho da fonte da noticia
	$('#acs_aumenta_fonte_not').click(function(){
		if (fonte<1.3){
			fonte = fonte+0.1;
			$('#noticia_descreve').css({'font-size' : fonte+'em'});
		}
	});
	$('#acs_reduz_fonte_not').click(function(){
		if (fonte>0.8){
			fonte = fonte-0.1;
			$('#noticia_descreve').css({'font-size' : fonte+'em'});
		}
	});
	/* ---------- Fim Diminuir e aumentar tamanho do texto ------------- */

	/* ------------------------ Somente texto ---------------------------- */
	$('#acs_somente_texto').toggle(
		function() {
			$('body').toggleClass('acs_normal').toggleClass('acs_somente_texto');
			$('img').click(function(){
				$(this).after($('<span class="somente_text_p">').css({width: $(this).css('width'), display: 'block'}).html($(this).attr('alt')));
				return false;
			});
			$('img').click();
			$('img').unbind('click');
			return false;
		},
		function() {
			$('body').toggleClass('acs_normal').toggleClass('acs_somente_texto');
			$('.somente_text_p').remove();
			return false;
		}
	);
	/* ------------------------ Fim Somente texto ------------------------ */
	
   
	/* ------------------------ Imprensa Oficial -------------------------- */
    $('.esconde_la').css('display', 'none')
    $('.btn_esconde_la', '.la_container').click(function() {
    $(this).next().slideToggle('slow')
    	.siblings('.esconde_la:visible').slideToggle('fast');
    });    
    $('.btn_esconde_la').click(function() {
    	$(this).toggleClass('desce_la');
    });
	/* ------------------------ Fim Imprensa Oficial ---------------------- */
	
	
	/* ------------------- Fale Conosco ---------------------- */
	$(".cont_faleconosco").validate({ errorLabelContainer: $(".cont_faleconosco div.error") });	
	var container = $('div.msg_errors');
	var validator = $("#fc_estrut").validate({
		errorContainer: container,
		errorLabelContainer: $("ol", container),
		wrapper: 'li',
		meta: "validate"
	});
	$('#fc_tel1').mask("99");
	$('#fc_tel2').mask("9999-9999");
	/* ----------------- Fim Fale Conosco --------------------- */

});


/* Links Telefones Úteis (Acesso Rápido) */
function selTelefones(pag) {
BASE_URL = 'http://192.168.../'
  switch(pag) {
    case '1':
	document.location = BASE_URL+'telefones_uteis/acessa_sp/acessa_sp.php'
	break
  }
}

/* redirecionar combo */
function selServicos(pag) {
BASE_URL = 'http://192.168.../'
  switch(pag) {
    case '1':
	document.location = BASE_URL+'cidadao/servicos.php'
	break
    case '2':
	document.location = BASE_URL+'empresa/servicos.php'
	break
    case '3':
	document.location = BASE_URL+'governo/servicos.php'
	break
  }
}