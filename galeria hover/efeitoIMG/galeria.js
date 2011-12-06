jQuery.fn.galeria = function(options) {
	settings = jQuery.extend({
		opacity: 0.3,// opacidade pra deixar a imagem escura
		speed: 500,// velocidade de quando passar o mouse na imagem
		sharpness:1, // contraste de quando o mouse estiver sob imagem
		bckspeed:1000, // velocidade de fadeOut na imagem ampliada
		bckopacity:1 // opacidade do div fundo
	}, options);

    $('.miniatura').css('opacity', settings.opacity);
	$('.miniatura').hover(
		function(){
			 $(this).stop().fadeTo(settings.speed, settings.sharpness);
		},
		function(){
			$(this).stop().fadeTo(settings.speed, settings.opacity);
		}
	);
	
	$('<div id="fundo"></div>').css({
		opacity:settings.bckopacity,
		width : $(document).width(),
		height : $(document).height()
	}).appendTo('body').hide();
	
	$('.miniatura').click(function(){
		$('#fundo').fadeIn(settings.bckspeed);
		$('<img id="foto"/>').attr('src',$(this).attr('src')).css({
			left: ($(document).width()/2 - 300),
			top: ($(document).height()/2 - 200)
		}).appendTo('body').click(function(){
			$(this).fadeOut(settings.bckspeed);
			$('#fundo').fadeOut(settings.bckspeed);
		});
	});
};