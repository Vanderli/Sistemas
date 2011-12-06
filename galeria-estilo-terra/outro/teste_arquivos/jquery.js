/*
 * Widget de Busca Padrão da Globo.com
 *
 * Desenvolvido e mantido pelo time de Busca da Globo.com
 */
(function($) {
	var defaults = {
		qtdMin : 2,
		qtdMax : 10,
		delay : 500,
        urlBusca : "http://busca2.globo.com",
        suggest_ligado : false
	};

	var options;
	var cortinaAberta = false;
	var itemSelecionado = "";
	var timerId = null;
	var meu_texto = null;
	var liAtual = -1;
	var urls = {};
	var paginaDeResultados = false;

	/*
	 * @param user_options
	 */
	$.fn.buscaPadrao = function(user_options)
	{
		$.buscaPadrao.CacheLocal.init();
		$.buscaPadrao.setOptions(user_options);
		$.buscaPadrao.produto = options.produto;
		
		if ($.buscaPadrao.produto === "" || $.buscaPadrao.produto === null || $.buscaPadrao.produto === undefined) {
			$.buscaPadrao.produto = "globo";
		}
		
		paginaDeResultados = options.paginaDeResultados;
		
		$.configuraUrls(user_options);
		$.criaComponentes( $(this) );
		
		$("#busca-campo").bind("focus", function(event) {
			$.focusCampoDeBusca(event);
		});
		
		$("#busca-campo").bind("blur", function(event) {
			$.blurCampoDeBusca(event);			
		});
		
		$("#busca-campo").bind("keypress", function(event) {
			$.keyPressCampoDeBusca(event);
	    });
		
		$("#busca-campo").bind("keyup", function(event) {
			$.keyUpCampoDeBusca(event);
		});
		
		$("button:first","#frmBusca").bind("click",function(event){
			$.clickBotaoBuscar(event);
		});
	}; // buscaPadrao
	
	/*
	 * 
	 * @param options
	 */
	$.buscaPadrao = function(options)
	{
		$("#busca-padrao").buscaPadrao(options);
	}; // buscaPadrao
	
	/*
	 * @param user_options
	 */
	$.configuraUrls = function(user_options)
	{
		urls = {
			buscaSuggest : options.urlBusca + "/suggest?produto=" + $.buscaPadrao.produto + "&callback=?",
			buscaGloboCom : options.urlBusca + "/Busca/",
			buscaProduto : options.urlBusca + "/Busca/" + $.buscaPadrao.produto + "/",
			buscaGoogle : options.urlBusca + "/Busca/web"
		};
	}; // configuraUrls
	
	/*
	 * 
	 * @param div
	 */
	$.criaComponentes = function(div)
	{
		var divContainer = div; // construindo o formulario
		
		if(paginaDeResultados){ // alterar os 3 paths abaixo
			$("head").append('<link rel="stylesheet" type="text/css" media="screen" href="http://s.glbimg.com/bu/c/busca.padrao.suggest.PaginaDeResultados.css" />');
			$(".lupa","#busca-padrao").css({background:"url(http://s.glbimg.com/bu/i/input_label_grande.png) no-repeat"});
			$("button","#busca-padrao").css({background:"url(http://s.glbimg.com/bu/i/botao_grande.png) no-repeat"});			
		} else {
			$("head").append('<link rel="stylesheet" type="text/css" media="screen" href="http://s.glbimg.com/bu/c/busca.padrao.suggest.css" />');
			
			var formulario = '<form name="busca-padrao" id="frmBusca" action="' + urls.buscaProduto + '" method="get" accept-charset="utf-8"></form>';
			if ($.buscaPadrao.produto === "globo") {
				formulario = '<form name="busca-padrao" id="frmBusca" action="' + urls.buscaGloboCom + '" method="get" accept-charset="utf-8"></form>';
			}
			var fieldset = '<fieldset></fieldset>';
			var campoDeBusca = '<input type="text" name="query" id="busca-campo" autocomplete="off"/>';
			var botao = '<button type="submit">buscar</button>';
			var lupa = '<label for="query" class="lupa">Buscar</label>';

			$(divContainer).append(formulario);
			$("form:first",divContainer).append(fieldset);
			$("fieldset",divContainer).append(lupa);
			$("fieldset",divContainer).append(campoDeBusca);
			$("fieldset",divContainer).append(botao);
		}

		var sugestoes = '<div id="sugestoes"></div>';
		var listaSugestoes = '<ul></ul>';
		var cantoTopoEsquerda = '<div class="cantosSugestoes cantoTopoEsquerda"></div>';
		var cantoTopoDireita = '<div class="cantosSugestoes cantoTopoDireita"></div>';
		var cantoBaseEsquerda = '<div class="cantosSugestoes cantoBaseEsquerda"></div>';
		var cantoBaseDireita = '<div class="cantosSugestoes cantoBaseDireita"></div>';
		
		$("#busca-padrao").append(sugestoes);
		$("#sugestoes").append(listaSugestoes);
		
		$("#busca-campo").val(options.msgProduto);
		$("#busca-campo").addClass("estadoInicial");
		
		$.buscaPadrao.fechaCortina();
	}; // criaComponentes
	
	/*
	 * Setando comportamentos dos diferentes items de sugestao
	 */
	$("#sugestoes > ul > li").live("mouseover", function() {
		itemSelecionado = $(this).text();
	});

	$("#sugestoes > ul > li.resposta").live("mousedown", function(e) {			
		if( !$(this).hasClass("featuredContent") ){
			$.buscaPadrao.executaBusca(itemSelecionado, urls);
		}
	});
	
	$("#sugestoes > ul > li.featuredContent").live("mousedown", function(e) {
		var url = $(":last",this).attr("href");
		var nome = $(":last",this).text();
		$("#busca-padrao #busca-campo").val(nome); // nome?
		window.location = url; // redirecionando
	});
	
	/* 
	 * @param texto
	 */
	$.buscaSugestoes = function(texto)
	{
		if (options.suggest_ligado) {
            meu_texto = texto;
			var texto_normalizado = $.buscaPadrao.normalizaBusca(texto);
			
			if (texto === null || texto == "" || texto_normalizado == "") {
				return false;
			}

			var resultadoNoCache = $.buscaPadrao.CacheLocal.recuperaBuscaCacheada(meu_texto);

			if (resultadoNoCache === "") {
				$.ajax({
							contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
							url : urls.buscaSuggest,
							dataType : "jsonp",
							type : "GET",
							data : "query=" + texto_normalizado,

							success : function(data, textStatus) {
								$.buscaPadrao.tratarItens(meu_texto, data.itens);
								$.buscaPadrao.atualizaCortina(urls);
							}
						});
			} else {
				$.buscaPadrao.resultado = resultadoNoCache;
				$.buscaPadrao.atualizaCortina(urls);
			}
		} else {
			return [];
		}
	}; // buscaSugestoes
	
	/*
	 * @param event
	 */
	$.clickBotaoBuscar = function(event){
		var texto = $("#busca-campo").val();
		if( texto === options.msgProduto || texto == "" || texto.length < options.qtdMin){
			alert("O texto da busca deve conter no mínimo duas letras.");
			event.preventDefault();
		}
	};
	
	/* 
	 * @param event
	 */
	$.focusCampoDeBusca = function(event)
	{
		var valorCampo = $("#busca-campo").val();
		if(valorCampo == options.msgProduto){
			$("#busca-campo").val("");
		}
		
		if(paginaDeResultados){
			$(event.target).css("background-position","0px -42px");
		} else {
			$(event.target).css("background-position","0px -35px");
		}
		
		$("#busca-campo").removeClass("estadoInicial");
		$("#busca-padrao label.lupa").css("background-position","left bottom");
	}; // focusCampoDeBusca
	
	/* 
	 * @param event
	 */
	$.blurCampoDeBusca = function(event)
	{
		$.buscaPadrao.fechaCortina();
		var valorCampo = $("#busca-campo").val();
		if(valorCampo == ""){
			$("#busca-campo").val(options.msgProduto);
			$("#busca-campo").addClass("estadoInicial");
		}
		
		$(event.target).css("background-position","0px -1px");
		$("#busca-padrao label.lupa").css("background-position","left top");
	}; // blurCampoDeBusca
	
	/* 
	 * @param event
	 */
	$.keyPressCampoDeBusca = function(event)
	{
		if(event.keyCode === 13){ /* enter */
			if( $(event.target).val().length < options.qtdMin ){
				alert("O texto da busca deve conter no mínimo duas letras.");
				event.preventDefault();
			}
			
			var li = $(".sugestao-hover");
			
			if (li.hasClass("buscaFixa")) {
				$.buscaPadrao.executaBuscaFixaNoEnter(urls, li);
				$.buscaPadrao.fechaCortina();
				return false;
			}

			if (li.hasClass("resposta")) {
				var texto_campo = li.text();
				$.buscaPadrao.executaBusca(texto_campo, urls);
				event.preventDefault();
				return false;
			}
			
			if (li.hasClass("featuredContent")) {
				var url = $("a",li).attr("href");
				var nome = $("a",li).text();
				
				$("#busca-padrao #busca-campo").val(nome); // nome?
				
				$(window).attr("location",url); 
				event.preventDefault();
				return false;
			}
		}
	}; // keyPressCampoDeBusca
	
	/* 
	 * @param event
	 */
	$.keyUpCampoDeBusca = function(event)
	{
		var quantidadeDeLi = $("li", "#sugestoes ul").length;
		var busca = $.trim($("#busca-campo").val());

        if (busca.length >= options.qtdMin) {
          $.buscaPadrao.abreCortina(busca, urls);
          if (event.keyCode !== 40 && event.keyCode !== 38 && event.keyCode !== 27 && event.keyCode !== 13) {
            if (timerId) {
              clearTimeout(timerId);
            }
            timerId = setTimeout(function() {
              $.buscaSugestoes(busca);
            }, options.delay);
          }
        } else {
          $.buscaPadrao.fechaCortina();
        }
        if (event.keyCode === 27) { /* ESC */
          $.buscaPadrao.fechaCortina();
        }
        if (event.keyCode === 40) { /* seta para baixo */
        	var ultimo = quantidadeDeLi - 1;
          
			if( liAtual < ultimo ){
				liAtual = liAtual + 1;
				  
				// featured content
				$("a","#sugestoes ul li:eq(" + (liAtual - 1) + ")").css("color","#333");// aplica a cor cinza no anterior
				$("a","#sugestoes ul li:eq(" + liAtual + ")").css("color","#fff"); // aplica a cor branca no atual
				  
				if( liAtual === 0 ){ // verifica se e o primeiro li
					$("#sugestoes ul li:eq(" + liAtual + ")").addClass("sugestao-hover"); 
				} else {
					if( liAtual === ultimo ){ // verifica se e o ultimo
						$("#sugestoes ul li:eq(" + ultimo + ")").addClass("sugestao-hover");
					} else {
						$("#sugestoes ul li:eq(" + liAtual + ")").addClass("sugestao-hover");
						$("#sugestoes ul li:eq(" + ( liAtual - 1 ) + ")").removeClass("sugestao-hover");
					}
				}
				  
				// busca fixa
				if( $("#sugestoes ul li:eq(" + liAtual + ")").hasClass("buscaFixa") ){
					$("#sugestoes ul li:eq(" + liAtual + ")").addClass("buscaFixaHover");
				}
			} else {
	        	$("#sugestoes ul li:eq(" + ultimo + ")").addClass("sugestao-hover");
	        	// busca fixa
				if( $("#sugestoes ul li:eq(" + liAtual + ")").hasClass("buscaFixa") ){
					$("#sugestoes ul li:eq(" + liAtual + ")").addClass("buscaFixaHover");
				}
	        }
        } 
        if (event.keyCode === 38) { /* seta para cima */
        	if( liAtual > 0 ){
            	liAtual = liAtual - 1;
            	
            	// featured content
            	$("a","#sugestoes ul li:eq(" + (liAtual + 1) + ")").css("color","#333");// aplica a cor cinza no anterior
    			$("a","#sugestoes ul li:eq(" + liAtual + ")").css("color","#fff"); // aplica a cor branca no atual
            	
            	if( liAtual === $("#sugestoes ul li").length ){ // verifica se e o ultimo li
            		$("#sugestoes ul li:eq(" + liAtual + ")").addClass("sugestao-hover");
            	} else {
            		$("#sugestoes ul li:eq(" + liAtual + ")").addClass("sugestao-hover");
            		$("#sugestoes ul li:eq(" + (liAtual + 1 ) + ")").removeClass("sugestao-hover");
            	}
            	
            	// busca fixa
    			if( $("#sugestoes ul li:eq(" + liAtual + ")").hasClass("buscaFixa") ){
    				$("#sugestoes ul li:eq(" + liAtual + ")").addClass("buscaFixaHover");
    			}
            }
        }
	}; // keyUpCampoDeBusca
	
	/*
	 * @param texto 
	 */
	$.buscaPadrao.normalizaBusca = function(texto)
	{
		var afrom = "á,à,ã,â,ä,Á,À,Ã,Â,Ä";
		var efrom = "é,è,ê,ë,É,È,Ê,Ë";
		var ifrom = "í,ì,î,ï,Í,Ì,Î,Ï";
		var ofrom = "ó,ò,õ,ô,ö,Ó,Ò,Õ,Ô,Ö";
		var ufrom = "ú,ù,û,ü,Ú,Ù,Û,Ü";
		var outrosfrom = "ñ,Ñ,ç,Ç,&,@";
		var from = afrom + "," + efrom + "," + ifrom + "," + ofrom + "," + ufrom + "," + outrosfrom;

		var ato = "a,a,a,a,a,A,A,A,A,A";
		var eto = "e,e,e,e,E,E,E,E";
		var ito = "i,i,i,i,I,I,I,I";
		var oto = "o,o,o,o,o,O,O,O,O,O";
		var uto = "u,u,u,u,U,U,U,U";
		var outrosto = "n,N,c,C,e,a";
		var to = ato + "," + eto + "," + ito + "," + oto + "," + uto + "," + outrosto;

		var re = new RegExp("[^A-Za-z0-9.,:;!?\"'&@+*/#%=()_-]+", "g");
		var quaseTerminada = $.buscaPadrao.__transliterate__(texto, from, to).replace(re, " ").toLowerCase();

		// limitar tamanho maximo
		var terminada = quaseTerminada;
		if (quaseTerminada.length > options.qtdMax) {
			terminada = quaseTerminada.substring(0, options.qtdMax);
		}
		return $.trim(terminada);
	}; // buscaPadrao.normalizaBusca
	
	/*
	 * @param texto, from, to
	 */
	$.buscaPadrao.__transliterate__ = function(texto, from, to) {
		var fromChars = from.split(",");
		var toChars = to.split(",");

		var mapTable = {};

		for (var i = 0; i < fromChars.length; i++) {
			var c = i < toChars.length ? toChars[i] : "";
			mapTable[fromChars[i]] = c;
		}

		var re = new RegExp(fromChars.join("|"), "gi");
		texto = texto.replace(re, function(c) {
			return mapTable[c];
		});

		return texto;
	}; // buscaPadrao.__transliterate__

	/*
	 * Atualiza a cortina de sugestões com seus respectivos items
	 * Featured Content, sugestoes de busca e buscas fixas.
	 * @param urls
	 */
	$.buscaPadrao.atualizaCortina = function(urls) {
		
		$("#sugestoes > ul > li.resposta").remove();
		$("#sugestoes > ul > li.featuredContent").remove();
		
		var qtdMaxComUmaBuscaFixa = 10;			// para os produtos: globo || beta
		var qtdMaxComDuasBuscasFixas = 10; 		// para os demais produtos, condicionado a quantidade de Featured Content's disponiveis p/ busca
		var itensParaApendar = "";
		var listaDeFeaturedContents = "";
		var qtdMaxDeFeaturedContents = 5;
		var qtdDeFeaturedContent = 0;
		var qtdDeSugestoes = 0;
		var nomesDeFeaturedContentJaInseridos = [];
		
                var resultadoDoMatcher = $.buscaPadrao.sort($.buscaPadrao.resultado);

		$.each(resultadoDoMatcher, function(indice, valor)
		{
			var qtdMax = ($.buscaPadrao.produto === "globo" || $.buscaPadrao.produto === "beta") ? qtdMaxComUmaBuscaFixa : qtdMaxComDuasBuscasFixas;
			var nomeFeaturedContent = "";
			var urlFeaturedContent = "";
			var imgPequenaFeaturedContent = "";

			var valores = String(valor).split(";");

			if(valores.length == 3){ // é um featured content
			  nomeFeaturedContent 		=	valores[0];
			  urlFeaturedContent 		=	valores[1];
			  imgPequenaFeaturedContent 	= 	valores[2];

			  // verifica se o item a ser cadastrado não está repetindo um outro featured content já cadastrado 
                          var temFeaturedContentIgual = false;
			  $.each(nomesDeFeaturedContentJaInseridos, function(e,v){
			    if(imgPequenaFeaturedContent === v){
                              temFeaturedContentIgual = true;
			    }
			  });
                          
                          if (!temFeaturedContentIgual) {
			    nomesDeFeaturedContentJaInseridos.push(imgPequenaFeaturedContent);
			
                            if( qtdDeFeaturedContent < qtdMaxDeFeaturedContents ){
			      listaDeFeaturedContents = listaDeFeaturedContents + '<li class="featuredContent">' + 
			      //'<div class="imgPequenaFeaturedContent" style="background:url('+ imgPequenaFeaturedContent +') no-repeat;">' +
			      '<div class="imgPequenaFeaturedContent">' +
			      '<img src="' + imgPequenaFeaturedContent + '" alt="' + nomeFeaturedContent + '" width="45px" height="34px" />' + 
			      '</div><a href="' + urlFeaturedContent + '" class="linkFeaturedContent">' + nomeFeaturedContent + '</a></li>';
                              qtdDeFeaturedContent += 1;
			    }
                          }
			
			  ( qtdDeFeaturedContent == qtdMaxDeFeaturedContents ) ? qtdMaxComDuasBuscasFixas = 8 : qtdMaxComDuasBuscasFixas = 10;
			
			} else { // não é um featured content
                          qtdDeSugestoes += 1;
                          if (qtdDeSugestoes <= qtdMax) {
			    itensParaApendar = itensParaApendar + '<li class="resposta">' + valores[0] + '</li>';
                          }

			}
		});
		
		$("#sugestoes > ul").prepend(itensParaApendar);
		$("#sugestoes > ul").prepend(listaDeFeaturedContents);
		
		itensParaApendar = "";
		listaDeFeaturedContents = "";
		
		$.buscaPadrao.aplicaDetalhes();
		$.buscaPadrao.setaComportamentosMouse(urls);
	}; // buscaPadrao.atualizaCortina
	

        $.buscaPadrao.sort = function(array) {
          var sortLevandoEmConsideracaoLocale = function(string1, string2) {
            var string1ehfeature = String(string1).split(";").length == 3;
            var string2ehfeature = String(string2).split(";").length == 3;

            if (string1ehfeature && string2ehfeature) {
              return String(string1).split(";")[0].toString().localeCompare(String(string2).split(";")[0].toString());
            } else if (string1ehfeature) {
              return String(string1).split(";")[0].toString().localeCompare(string2.toString());
            } else if (string2ehfeature) {
              return string1.toString().localeCompare(String(string2).split(";")[0].toString());
            } else {
              return string1.toString().localeCompare(string2.toString());
            }
          }
          return array.sort(sortLevandoEmConsideracaoLocale);
        };


	$.buscaPadrao.aplicaDetalhes = function(){
		$(".featuredContent:first").css("margin-top","0px").css("padding-top","5px");
		$(".featuredContent:last").css("margin-bottom","0px").css("padding-bottom","5px");
		$(".resposta:last").css("padding-bottom","8px");
		
		if($(".featuredContent").length !== 0){
			$(".resposta:first").css("border-top","solid 1px #ddd").css("margin-top","0px").css("padding-top","6px");
		}
	}

	/*
	 *
	 * @param texto, urls
	 */
	$.buscaPadrao.executaBusca = function(texto, urls) {
		$("#busca-padrao #busca-campo").val(texto);
		
		if ($.buscaPadrao.produto === "globo") {
			$("#busca-padrao #frmBusca").attr("action", urls.buscaGloboCom);
		} else {
			$("#busca-padrao #frmBusca").attr("action", urls.buscaProduto);
		}
		
		$("#busca-padrao #frmBusca").submit();
	}; // buscaPadrao.executaBusca
	
	/*
	 * 
	 * @param texto, urls
	 */
	$.buscaPadrao.abreCortina = function(texto, urls) {
		if (!cortinaAberta) {
			$("#sugestoes").show();
			cortinaAberta = true;
		}

		$.buscaPadrao.atualizaBuscaFixa(texto, urls);
		$.buscaPadrao.setaComportamentosMouse(urls);
	}; // buscaPadrao.abreCortina

	/*
	 * 
	 * @param texto, urls
	 */
	$.buscaPadrao.atualizaBuscaFixa = function(texto, urls) {
		$("#sugestoes > ul > li.buscaFixa").remove();

		var texto_tratado = texto;
		
		if (texto.length > 18) {
			texto_tratado = texto.substring(0, 18) + '...';
		}
		
		if ($.buscaPadrao.produto !== "globo" && $.buscaPadrao.produto !== "beta") {
			$("#sugestoes > ul").append('<li class="buscaFixa"><a href="' + urls.buscaGloboCom + '"><label>buscar \'<em>' + texto_tratado + '</em>\' <span>' + texto + '</span>na Globo.com ›</label></a></li>');
		}
		
		$("#sugestoes > ul").append('<li class="buscaFixa"><a href="' + urls.buscaGoogle + '"><label>buscar \'<em>' + texto_tratado + '</em>\' <span>' + texto + '</span>no Google ›</label></a></li>');
	}; // buscaPadrao.atualizaBuscaFixa

	/*
	 * 
	 */
	$.buscaPadrao.fechaCortina = function() {
		$("ul", "#sugestoes").empty();
		$("#sugestoes").hide();
		cortinaAberta = false;
	}; // buscaPadrao.fechaCortina

	/*
	 * 
	 * @param urls, li
	 */
	$.buscaPadrao.executaBuscaFixaNoEnter = function(urls, li) {

		var enderecoBusca = $("a", li).attr("href");
		var valorDaBusca = $("a > label > span", li).text();

		$("#busca-campo").val(valorDaBusca);

		$("#frmBusca").attr("action", enderecoBusca);
		$("#frmBusca").submit();
	}; // buscaPadrao.executaBuscaFixaNoEnter

	/*
	 * 
	 * @param urls
	 */
	$.buscaPadrao.executaBuscaFixa = function(urls) {
		$("#sugestoes > ul > li > a").unbind().click(function(e) {
			e.preventDefault();
		});

		var endereco = $("a", ".sugestao-hover").attr("href");
		var valorBusca = $("#sugestoes > ul > li.sugestao-hover > a > label > span").text();
		$("#busca-campo").val(valorBusca);

		$("#frmBusca").attr("action", endereco);
		$("#frmBusca").submit();
	}; // buscaPadrao.executaBuscaFixa

	$.buscaPadrao.produto = "globo";
	$.buscaPadrao.resultado = [];

	/*
	 * 
	 */
	$.buscaPadrao.CacheLocal = {
		cache : {},
		init : function() {
			this.cache = {};
		},
		recuperaBuscaCacheada : function(textoBuscado) {
			var resultadoTextoBuscado = this.cache[textoBuscado];
			if (resultadoTextoBuscado === undefined || resultadoTextoBuscado === "" || resultadoTextoBuscado === null) {
				return "";
			} else {
				return resultadoTextoBuscado;
			}
		},
		cachearBusca : function(textoBuscado, resultado) {
			this.cache[textoBuscado] = resultado;
		},
		limparCache : function(chave) {
			if (chave || chave !== undefined || chave !== "") {
				this.cache[chave] = undefined;
			} else {
				this.cache = {};
			}
		}
	};

	/*
	 * 
	 * @param texto, itens
	 */
	$.buscaPadrao.tratarItens = function(texto, itens) {
		var array = [];
		if (itens !== null) {
			$.each(itens, function() {
				$.each(this, function() {
					array.push(this);
				});
			});
		}
		$.buscaPadrao.CacheLocal.cachearBusca(texto, array);
		$.buscaPadrao.resultado = array;
		return array;
	}; // buscaPadrao.tratarItens

	/*
	 * 
	 * @param urls
	 */
	$.buscaPadrao.setaComportamentosMouse = function(urls) {
		$("#sugestoes > ul > li").addClass("sugestao");

		$("#sugestoes > ul > li").mouseover(function() {
			
			$("#sugestoes > ul > li.sugestao-hover").removeClass("sugestao-hover");
			$("#sugestoes > ul > li.buscaFixaHover").removeClass("buscaFixaHover");
		
			$(this).addClass("sugestao-hover");

			if( $(this).hasClass("featuredContent") ){
				$("a",this).css("color","#fff");
			}
			
			if( $(this).hasClass("buscaFixa") ){
				$(this).addClass("buscaFixaHover");
			}
		});

		$("#sugestoes > ul > li").mouseout(function() {
			
			$("#sugestoes > ul > li.sugestao-hover").removeClass("sugestao-hover");
			$("#sugestoes > ul > li.buscaFixaHover").removeClass("buscaFixaHover");
			
			$(this).addClass("sugestao");
			
			if( $(this).hasClass("featuredContent") ){
				$("a",this).css("color","#333");
			}
			
			if( $(this).hasClass("buscaFixa") ){
				$(this).removeClass("buscaFixaHover");
			} 
		});

		$("#sugestoes > ul > li.buscaFixa").mousedown(function() {
			$.buscaPadrao.executaBuscaFixa(urls);
			return false;
		});
	}; // buscaPadrao.setaComportamentosMouse

	/*
	 * 
	 * @param new_options
	 */
	$.buscaPadrao.setOptions = function(new_options) {
		options = $.extend( {}, defaults, options, new_options);
	}; // buscaPadrao.setOptions
})(jQuery);
