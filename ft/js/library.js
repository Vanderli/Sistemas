$().ready(function() {						   
	/* --------------------- Mascara nos campos ------------------------------ */
	$('#cpf').mask("999.999.999-99");
	$('#dataNascimento').mask("99/99/9999");
	$('#telefone').mask("9999-9999");
	$('#cep').mask("99999-999");
	
	
	
	$('#renda_familiar').priceFormat({
		prefix: '',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
	
	$('#despesa_familiar').priceFormat({
		prefix: '',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
	
	
	
	
});


 