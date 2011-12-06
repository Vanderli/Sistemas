(function($){

$.fn.menuHorizontal = function(){
		
        this.each(function(){   
			
            $('ul.menu-itens').find('.menu-subitens').hide();
            
            $('ul.menu-itens > li').hover(function(){
				
                $(this).children('.menu-subitens').show();
               
                // Implementacao para quebra de colunas
				var $menuSubitens = $(this).children('a').siblings(".menu-subitens");
	            $menuSubitens.css("width", $menuSubitens.children(".conteudo-subitens").children("ul").size() * 160);
                
                return false;
			},function(){
                
                $(this).children('.menu-subitens').hide();
                return false;
            });
				
		});

		return this;
	}
	
})(jQuery);
