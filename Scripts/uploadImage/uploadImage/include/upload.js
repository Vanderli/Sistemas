/******
*  Versão: 1.0 - 03/12/2006
* Autor: hcar - Hamilcar Antônio Vieira da Silva - hcar_1@yahoo.com.br
* 
* function textCounter(field, countfield, maxlimit)
*			- Limitar quentidade de caracteres digitados
*
*	function action(act)
*     - verifica qual ação o usuário escolheu e configura para que seja efetuada
*
* function data()
*     - Pegar a data atual
* 
* function criaForm(area)
*     - Manipular o formulário de acordo com a escolha do usuário
*
* function add_foto()
*     - Adicionar campo para inclusão de uma imagem
*
* function resetForm(p)
*     - Voltar o formulário para apresentação inicial
*
* function enviamos()
*     - Envio do formulário
*
* function validaForm()
*     - Validar formulário de acordo com opção escolhida pelo usuário
*
*******/

var foto=0;
var totalImagens=4;
function textCounter(field, countfield, maxlimit) 
{
	if(field.value.length > maxlimit)
	{
		field.value = field.value.substring(0, maxlimit);
	}
	else
	{
		countfield.value = maxlimit - field.value.length;
	}
}


function action(act)
{
	switch(act)
	{
		case 'incluir':
			resetForm(1);
			document.getElementById('acao').style.display = 'none';
			document.form_fotos.action = 'uploadFile.php';
			document.form_fotos.target = 'iframeEnvia';
			document.form_fotos.method = "post";
			document.getElementById('escolha').style.display = 'block';
			document.getElementById('radio').style.display = 'block';
		break;
		case 'reset':
			document.getElementById('iframe').style.display = 'none';
			document.getElementById('acao').style.display = 'block';
			ajaxGet("listar.php",document.getElementById("acao"),true);
			resetForm(2);
		break;
		case 'excluir':
			var dados = '?passo=2&id='+document.excluir.id.value;
			ajaxGet("excluir.php"+dados,document.getElementById("acao"),true);
		break;
	}	
}

function data()
{
	hoje = new Date();
	dia = hoje.getDate();
	mes = hoje.getMonth()+1;
	ano = hoje.getFullYear();
	
	hora = hoje.getHours();
	minuto = hoje.getMinutes();
	segundo = hoje.getSeconds();
	document.getElementById("data").value = (ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo);
}

function criaForm(area)
{
	switch(area)
	{
		case 'texto':
			resetForm(1);
			document.getElementById('text').style.display = 'block';
			document.getElementById('botoes').style.display = 'block';
		break;
		
		case 'imagens':
			resetForm(1);
			document.getElementById('image').style.display = 'block';
			document.getElementById('botoes').style.display = 'block';
		break;
		
		case 'misto':
			resetForm(1);
			document.getElementById('text').style.display = 'block';
			document.getElementById('image').style.display = 'block';
			document.getElementById('botoes').style.display = 'block';
		break;
	}
	//document.getElementById('escolha').style.display = 'none';
}

function add_foto()
{
	var y;
	if(foto < totalImagens)
	{
		y = '<input id="fota" type="file" name="fotos[]"/> <br/>';
		document.getElementById('imagens').innerHTML += y;;
		foto++;
	}
	else
	{
		document.getElementById('imgInfo').innerHTML = 'Quantidade máxima de fotos alcançada.';
		document.getElementById('imgInfo').style.display = 'block';
	}
}

function resetForm(p)
{
		var seleciona;
		if(p == 1)
		{
			document.getElementById('iframe').style.display = 'none';
		}
		if(p == 2)
		{
			document.getElementById('radio').style.display = 'none';
			document.getElementById('escolha').style.display = 'block';
			seleciona = document.getElementById('radio').getElementsByTagName('input');
			for (i = 0; i < seleciona.length; i++)
	  	{ 
				if(seleciona[i].checked)
				{
					seleciona[i].checked = false;
				} 
	 		} 
		}
		document.getElementById('text').style.display = 'none';
		document.getElementById('image').style.display = 'none';
		document.getElementById('botoes').style.display = 'none';	
		document.getElementById('imagens').innerHTML = '';
		document.getElementById('aux').innerHTML = '';
		document.getElementById('aux').style.display = 'none';
		document.getElementById('imgInfo').innerHTML = '';
		document.getElementById('imgInfo').style.display = 'none';
		document.getElementById("enviar").disabled = false;
		document.form_fotos.chamada.value = "";
		document.form_fotos.titulo.value = "";
		document.form_fotos.texto.value = "";
	
		seleciona = document.getElementById('text').getElementsByTagName('input');
		for (i = 0; i < seleciona.length; i++)
	  { 
			if(seleciona[i].value == "")
			{
				document.getElementById(seleciona[i].name).style.backgroundColor="";
			} 
	 	} 
		seleciona = document.getElementById('text').getElementsByTagName('textarea');
		for (i = 0; i < seleciona.length; i++)
  	{ 
  		if(seleciona[i].value == "")
			{
				document.getElementById(seleciona[i].name).style.backgroundColor="";
			}
 		} 
		document.getElementById('imgs').style.backgroundColor="";
		foto = 0;
}

function enviamos()
{
	document.getElementById('enviar').disabled = true;
	//document.getElementById('acao').style.display = 'none';
	document.getElementById('aux').innerHTML = '<img src="images/carregando.gif" border="0"/>';
	document.getElementById('aux').style.display = 'block';
	document.getElementById('iframe').style.display = 'block';
	if(foto > 0)
	{
		document.getElementById('form_fotos').encoding = 'multipart/form-data';
	}
	else
	{
		document.getElementById('form_fotos').encoding = 'application/x-www-form-urlencoded';
	}
	document.getElementById('form_fotos').submit();
} 
function validaForm2()
{
	var dados;
	if(document.form_alterar.titulo.value == '' || document.form_alterar.chamada.value == ''
		 || document.form_alterar.texto.value == '')
	{
	document.getElementById('infoAltera').innerHTML = 'Campos de preenchimento obrigatórios!';
	return;
	}
	document.getElementById('form_alterar').encoding = 'application/x-www-form-urlencoded';
	dados = 'alterar.php?titulo='+document.form_alterar.titulo.value+'&chamada='+document.		form_alterar.chamada.value+'&texto='+document.form_alterar.texto.value+'&id='+document.form_alterar.id.value+'&passo=2&ordem='+document.form_alterar.ordem.value;
	if(navigator.appName == 'Microsoft Internet Explorer')
	{
		dados += '&browser=1';
	}
	else
	{
		dados += '&browser=2';
	}
	ajaxGet(dados,document.getElementById("acao"),true);
}

function validaForm()
{
	var erro = 'Campos: ';
	var enviar = true;
	var seleciona = document.getElementById('radio').getElementsByTagName('input');
	for (i = 0; i <seleciona.length; i++)
  { 
  	if(seleciona[i].checked)
		{
			seleciona = seleciona[i].value;
			break;
		} 
  } 
	switch(seleciona)
	{
		case 'texto': 
			seleciona = document.getElementById('text').getElementsByTagName('input');
			for (i = 0; i < seleciona.length; i++)
  		{ 
  			if(seleciona[i].value == "")
				{
					document.getElementById(seleciona[i].name).style.backgroundColor="#999900";
					erro += seleciona[i].name+', ';
				} 
 		 	} 
			seleciona = document.getElementById('text').getElementsByTagName('textarea');
			for (i = 0; i < seleciona.length; i++)
  		{ 
  			if(seleciona[i].value == "")
				{
					document.getElementById(seleciona[i].name).style.backgroundColor="#999900";
					erro += seleciona[i].name+', ';
				} 
 		 	} 
			if(erro != 'Campos: ' && erro != '')
			{
				erro += 'são de preenchimento obrigatório!'
				document.getElementById('aux').innerHTML = erro;	
				document.getElementById('aux').style.display = 'block';
				enviar = false;
			}
		break;

		case 'imagens': 
			if(foto == 0 || document.getElementById('fota').value == "")
			{
					erro = 'Envio de imagem é obrigatório!';
			}

			if(erro != 'Campos: ' && erro != '')
			{
				document.getElementById('imgs').style.backgroundColor="#999900";
				document.getElementById('imgInfo').innerHTML = erro;	
				document.getElementById('imgInfo').style.display = 'block';
				enviar = false;
			}
		break;

		case 'misto': 
			seleciona = document.getElementById('text').getElementsByTagName('input');
			for (i = 0; i < seleciona.length; i++)
  		{ 
  			if(seleciona[i].value == "")
				{
					document.getElementById(seleciona[i].name).style.backgroundColor="#999900";
					erro += seleciona[i].name+', ';
				} 
 		 	} 
			seleciona = document.getElementById('text').getElementsByTagName('textarea');
			for (i = 0; i < seleciona.length; i++)
  		{ 
  			if(seleciona[i].value == "")
				{
					document.getElementById(seleciona[i].name).style.backgroundColor="#999900";
					erro += seleciona[i].name+', ';
				} 
 		 	} 
			
			if(foto == 0 || document.getElementById('fota').value == "")
			{
				document.getElementById('imgInfo').innerHTML = 'Envio de imagem é obrigatório!';
				document.getElementById('imgs').style.backgroundColor="#999900";
				document.getElementById('imgInfo').style.display = 'block';
				enviar = false;
			}

			if(erro != 'Campos: ' && erro != '')
			{
				erro += 'são de preenchimento obrigatório!';
				document.getElementById('aux').innerHTML = erro;	
				document.getElementById('aux').style.display = 'block';
				enviar = false;
			}
		break;
	} 
	if(enviar)
	{ 
		enviamos();
	}
}