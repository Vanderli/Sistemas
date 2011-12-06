$(document).ready(function(){
	
	// título aparece apenas após carregada a imagem de notícia 
	
	/*$('#not-dest img').load(function(){
		$('#chamada_noticias').show();
		// multifotos
		posicionaImagens();
	});
	
	// título aparece apenas após carregada a imagem de notícia  
	$('#not-3 img').load(function(){
		$('#not-3 .txt, #not-3 .bgr').show();
	});*/
	
	
	/* Boletim! Envie notícias por email que fica no rodapé */
	/*$(document).ready(function() {
			$("a#single_1").fancybox();
			$("a#single_2").fancybox({
				'zoomOpacity'			: true,
				'overlayShow'			: false,
				'zoomSpeedIn'			: 500,
				'zoomSpeedOut'			: 500
			});
			$("a#single_3").fancybox({
				'overlayShow'			: false,
				'zoomSpeedIn'			: 600,
				'zoomSpeedOut'			: 500,
				'easingIn'				: 'easeOutBack',
				'easingOut'				: 'easeInBack'
			});
			$("a.group").fancybox({
				'hideOnContentClick': false,
				'frameHeight':220
			});
			$("div.contaba").hide();
			$("div.contaba:first").show();
			$("#abas a:first").addClass("selected");
			$("#abas a").click(function(){
										$("div.contaba").hide();
										$("#abas a").removeClass("selected");
										$(this).addClass("selected");
										$($(this).attr("href")).show();
										return false;
			});
		});*/
	
	$('.menu').animate({"opacity": "0.95"}, "slow", function(){});
	
	$('input[type=text], input[type=password]').focus(function(){ $(this).select(); });
	
	$("input[type=text], input[type=password]").each(function(){
		if($(this).attr("mask")){
			$(this).mask($(this).attr("mask"));
		}
	});
	
	$('.inputData').mask('99/99/9999');
	$('.inputData').addClass('validadata');
	
	$('.inputCpf').mask('999.999.999-99');
	$('.inputCpf').addClass('validacpf');
	
	$('.inputCep').mask('99999-999');
	
	$('.inputTelefone').mask('(99) 9999-9999');
	
	$('select:not([multiple=multiple])').each(function() {
		
		var first = $(this).find('option:first');
		first.attr('text', first.attr('text') + ($(this).hasClass('required')?' *':''));
		
        if($(this).find('option:first').val() == $(this).find('option:selected').val()){
        	$(this).addClass('watermark');
        }else{
        	$(this).removeClass('watermark');
        }
    });
	
	$('select:not([multiple=multiple])').change(function() {
        if($(this).find('option:first').val() == $(this).find('option:selected').val()){
        	$(this).addClass('watermark');
        	$(this).removeClass('nowatermark');
        }else{
        	$(this).addClass('nowatermark');
            $(this).removeClass('watermark');
        }
    });
	
	$("input[type=text], input[type=password]").each(function(){
		if($(this).attr("alt")){
			$(this).Watermark($(this).attr("alt") + ($(this).hasClass('required')?' *':''));
		}
	});
	
	$('.submitenter').keypress(function(e){
		if(e.which == 13){
			submit2($(this).parent('form'));
		}
	});
	
	/* Banner do Rodapé */
	$('#bannerRodape').fadeOut('slow');

	/* Botão Fechar Notícia Destaque */
	$(".fecharNoticia").click(function () {
		$("#chamada_noticias").hide("normal");
	});
	
	setTimeout(function(){
		$('#chamada_noticias').show();
		$('#not-3 .txt, #not-3 .bgr').show();
	}, 1000);
	
	setTimeout(function(){
		posicionaImagens();
	}, 1000);
		
	/*Secretaria • Agenda - Slides*/
	
	$('.cont-agenda').hide();
	
	$(".evento").click(function () {
		$(this).next(".cont-agenda").slideToggle("normal");
	});
	
	/*Ouvidoria • Slides*/
	
	$('.cont-ouvidoria').hide();
	
	$(".tit-ouv").click(function () {
		$(this).next(".cont-ouvidoria").slideToggle("normal");
	});
	
	$(".cont-sugestoes, .cont-elogios, .cont-criticas, .cont-fale-com, #video-email, #video-compartilhe, #video-seusite, .cont_mapa").hide();
	
	$(".titulo_mapa").click(function () {
		$(this).parent().find('.cont_mapa').slideToggle();
	});	
	
	$(".tit-sugestoes").click(function () {
		$(".cont-sugestoes").slideToggle("normal");
	});
	
	$(".tit-elogios").click(function () {
		$(".cont-elogios").slideToggle("normal");
	});
	
	$(".tit-criticas").click(function () {
		$(".cont-criticas").slideToggle("normal");
	});
	
	$(".tit-fale-com").click(function () {
		$(".cont-fale-com").slideToggle("normal");
	});
	
	$("a.email").click(function () {
		$("#video-email").slideToggle("normal");		
	});
	
	$("a.compartilhe").click(function () {
		$("#video-compartilhe").slideToggle("normal");		
	});
	
	$("a.seusite").click(function () {
		$("#video-seusite").slideToggle("normal");		
	});
	
	var w = 233;
	var h = 233;
			


	});

	