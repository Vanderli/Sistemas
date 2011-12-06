if(!window.modMan) throw new Error('TemplatingError » O objeto "modMan" não foi encontrado. Por favor, verifique se o include correspondente foi realizado.');
try {
	
	modMan.load([		
		{
			id:"modFeaturedPhotos",
			selector:'.fotos',
			loadSkin:false,
			params:{
				dinamicLayers:true
			}
		}
	]);
	
	// poll behavior
	(function(){
	
		modMan.require.components([
			{
				id:'formElements',
				selector:'#frm-poll, #frm-services'
			}
		]);
		
		var $modPoll = $('.mod-poll:first');
		
		$modPoll.find(".btn-vote").click(function() {
			modMan.tools.openPopup("","popupPoll","264","349",0);
			$modPoll.find("form").get(0).submit();
			return false;
		});
	})();
	
	
	function tabs() {
		var ctn = $('.ctn-tabs');
		var tabs = ctn.find('.tabs li');
		var contents = ctn.find('.content');
		tabs.bind('click', function() {
			var el = $(this);
			var index = tabs.index(el);
			tabs.removeClass('selected');
			el.addClass('selected');
			contents.addClass('hide').filter(':eq('+ index +')').removeClass('hide');
			return false;
		});
	}
	
	tabs();

} catch(e) {
	
	e.message = 'Erro de script no "contex.js". \n' + e.message;
	if(modMan) modMan.log.critical(e.message);

	throw e;
}