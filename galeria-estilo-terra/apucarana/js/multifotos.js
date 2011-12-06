function alinharEsq(quem, relativo, offset){
	p = $(relativo).position();
	w = $(relativo).width();
	ml = parseInt($(relativo).css('margin-left')) - parseInt($(quem).css('margin-left'));
	$(quem).css({'left' : w + p.left + offset + ml});
}

function alinharDir(quem, relativo, offset){
	p = $(relativo).position();
	w = $(quem).width();
	ml = parseInt($(relativo).css('margin-left')) - parseInt($(quem).css('margin-left'));
	$(quem).css({'left' : - w + p.left - offset + ml});
}

function alinharCima(quem, relativo, offset){
	p = $(relativo).position();
	h = $(relativo).height();
	mt = parseInt($(relativo).css('margin-top')) - parseInt($(quem).css('margin-top'));
	$(quem).css({'top' : h + p.top + offset + mt});
}

function alinharBaixo(quem, relativo, offset){
	p = $(relativo).position();
	h = $(quem).height();
	mt = parseInt($(relativo).css('margin-top')) - parseInt($(quem).css('margin-top'));
	$(quem).css({'top' : - h + p.top - offset + mt});
}

function igualarEsq(quem, relativo, offset){
	p = $(relativo).position();
	ml = parseInt($(relativo).css('margin-left')) - parseInt($(quem).css('margin-left'));
	$(quem).css({'left' : p.left + offset + ml});
}

function igualarDir(quem, relativo, offset){
	p = $(relativo).position();
	w = $(quem).width() - $(relativo).width();
	ml = parseInt($(relativo).css('margin-left')) - parseInt($(quem).css('margin-left'));
	$(quem).css({'left' : - w + p.left - offset + ml});
}

function igualarCima(quem, relativo, offset){
	p = $(relativo).position();
	mt = parseInt($(relativo).css('margin-top')) - parseInt($(quem).css('margin-top'));
	$(quem).css({'top' :  p.top + offset + mt});
}

function igualarBaixo(quem, relativo, offset){
	p = $(relativo).position();
	h = $(quem).height() - $(relativo).height();
	mt = parseInt($(relativo).css('margin-top')) - parseInt($(quem).css('margin-top'));
	$(quem).css({'top' : - h + p.top - offset + mt});
}

function maxDir(quem){
	var maxValue = 0;
	$(quem).each(function(index){
		p = $(quem).eq(index).position();
		w = $(quem).eq(index).width();
		v = p.left + w;
		if(v > maxValue){
			maxValue = v;
		}
	});
	return maxValue;
}

function minEsq(quem){
	var minValue = $(quem).position().left;
	$(quem).each(function(index){
		v = $(quem).eq(index).position().left;
		if(v < minValue){
			minValue = v;
		}
	});
	return minValue;
}

function minCima(quem){
	var minValue = $(quem).position().top;
	$(quem).each(function(index){
		v = $(quem).eq(index).position().top;
		if(v < minValue){
			minValue = v;
		}
	});
	return minValue;
}

function maxBaixo(quem){
	var maxValue = $(quem).position().top;
	$(quem).each(function(index){
		p = $(quem).eq(index).position();
		h = $(quem).eq(index).height();
		v = p.top + h;
		if(v > maxValue){
			maxValue = v;
		}
	});
	return maxValue;
}

function posicionaImagens(){
	
	flag = true;		
	$('.fotm').each(function(index){
		if($(this).width() <= 0){
			flag = false;
		}
		imagensCarregadas = flag;
	});
	
	if(!(imagensCarregadas)){
		setTimeout('posicionaImagens()', '1000');
	}else{
		
		folga = 77;
		
		$('.fotm').show();
		mod();
		esp = ($('.fundo').offset().left + $('.fundo').width() - maxDir('.fotm'))/2;
		$(".fotm").css({'margin-left' : esp});
		size = maxBaixo('.fotm') - minCima('.fotm') + (esp * 2);
		$(".fundo").height(size + (folga *2));
		espV = $('.fundo').offset().top - minCima('.fotm') + esp;
		$(".fotm").css({'margin-top' : (espV + folga)});
		adicionaEventos();
	}
}

function mod(){
	
	var spc = 2;

	alinharEsq('.fotm-5', '.fotm-1', spc);
	igualarBaixo('.fotm-5', '.fotm-1', 0);

	alinharEsq('.fotm-2', '.fotm-1', spc);
	alinharBaixo('.fotm-2', '.fotm-5', spc);

	alinharEsq('.fotm-6', '.fotm-5', spc);
	igualarCima('.fotm-6', '.fotm-5', -30);
	
	alinharBaixo('.fotm-3', '.fotm-6', spc);
	igualarEsq('.fotm-3', '.fotm-6', -30);

	alinharBaixo('.fotm-4', '.fotm-6', spc);
	alinharEsq('.fotm-4', '.fotm-3', spc);

	alinharCima('.fotm-7', '.fotm-1', spc);
	igualarEsq('.fotm-7', '.fotm-1', 30);

	alinharCima('.fotm-7', '.fotm-1', spc);
	igualarEsq('.fotm-7', '.fotm-1', 30);

	alinharCima('.fotm-8', '.fotm-1', spc);
	alinharEsq('.fotm-8', '.fotm-7', 30);

	alinharCima('.fotm-9', '.fotm-1', spc);
	alinharEsq('.fotm-9', '.fotm-8', 30);

	alinharCima('.fotm-10', '.fotm-6', spc);
	alinharEsq('.fotm-10', '.fotm-5', spc);
	
}

function mod1(){
	var spc = 2;
	alinharEsq('.fotm-2', '.fotm-1', spc);
	igualarCima('.fotm-2', '.fotm-1', 20);
	
	alinharEsq('.fotm-3', '.fotm-2', spc);
	igualarCima('.fotm-3', '.fotm-2', -30);

	alinharDir('.fotm-7', '.fotm-2', spc);
	alinharCima('.fotm-7', '.fotm-2', -80);

	alinharEsq('.fotm-5', '.fotm-2', spc);
	alinharCima('.fotm-5', '.fotm-3', spc);

	alinharEsq('.fotm-6', '.fotm-5', spc);
	alinharCima('.fotm-6', '.fotm-3', 20);	
	
	alinharDir('.fotm-4', '.fotm-6', spc);
	alinharCima('.fotm-4', '.fotm-5', spc);
}

function mod2(){
	var spc = 2;
	
	alinharEsq('.fotm-2', '.fotm-1', spc);
	
	alinharEsq('.fotm-3', '.fotm-2', spc);

	igualarCima('.fotm-3', '.fotm-1', -20);

	igualarBaixo('.fotm-2', '.fotm-3', 0);

	alinharEsq('.fotm-6', '.fotm-1', spc);

	alinharCima('.fotm-6', '.fotm-2', spc);

	alinharCima('.fotm-5', '.fotm-1', spc);

	alinharDir('.fotm-7', '.fotm-6', spc);

	alinharDir('.fotm-5', '.fotm-7', spc);

	alinharEsq('.fotm-4', '.fotm-5', spc);

	alinharCima('.fotm-4', '.fotm-6', spc);

	alinharBaixo('.fotm-7', '.fotm-4', 27);
}

function mod3(){
	var spc = 2;
	
	alinharEsq('.fotm-8', '.fotm-1', spc);

	alinharCima('.fotm-8', '.fotm-1', spc);

	alinharEsq('.fotm-3', '.fotm-8', spc);

	igualarBaixo('.fotm-3', '.fotm-8', 0);
	
	alinharDir('.fotm-6', '.fotm-3', spc);

	alinharCima('.fotm-6', '.fotm-3', spc);
	
	alinharEsq('.fotm-9', '.fotm-6', spc);

	alinharCima('.fotm-9', '.fotm-3', spc);
	
	alinharEsq('.fotm-4', '.fotm-9', spc);

	alinharCima('.fotm-4', '.fotm-9', spc);
	
	alinharEsq('.fotm-2', '.fotm-9', spc);

	alinharCima('.fotm-2', '.fotm-3', spc);

	alinharCima('.fotm-5', '.fotm-1', spc);
	
	alinharDir('.fotm-5', '.fotm-8', spc);

	alinharCima('.fotm-7', '.fotm-9', spc);
	
	alinharEsq('.fotm-7', '.fotm-6', spc);

	alinharBaixo('.fotm-10', '.fotm-8', spc);
	
	alinharDir('.fotm-10', '.fotm-3', spc);
}

function adicionaEventos(){
	
	var lupaW = 200;
	var lupaH = 200;
	
	$('.fotm').hover(function(){
	
		myW = $(this).width();
		myH = $(this).height();
		
		var posicionado = $(this).next('.lupa').hasClass('posicionado');
		
		//if(!posicionado){
			if(myW >= lupaW || myH >= lupaH){
				igualarEsq($(this).next('.lupa'), this, -10);
				igualarCima($(this).next('.lupa'), this, -10);
				$(this).next('.lupa').addClass('posicionado');
			}else{
				igualarEsq($(this).next('.lupa'), this, -((lupaW - myW)/2));
				igualarCima($(this).next('.lupa'), this, -((lupaW - myH)/2));
				$(this).next('.lupa').addClass('posicionado');
			}
		//}
		$(this).next('.lupa').fadeIn();
		$(this).next('.lupa').width($(this).next('.lupa').find('img').width());
		
	});
	$('.lupa').hover(function(){
	},function(){
		$(this).fadeOut();
	});
}