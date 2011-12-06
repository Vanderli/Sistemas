//GMCEmbedCreator -------------------
//Versao 4.2.9
function GMCEmbedCreator(config)
{
	this.id = null;
	this.config = config;
	this.jaDeuPlay = false;
	this.player = null;
	this.putOnUnload();
}
GMCEmbedCreator.prototype = {
	putOnUnload:function() {
		if( this.config.telaCheia ) {
			window.onunload = function() {
				try {
					window.opener.creator.reload();
				} catch(e) {}
			}
		}
	},
	cleanOnUnload:function() {
		window.onunload = null;
		delete window.onunload;
	},
	getBanda:function() {
		return this.config.banda;
	},
	isFlash:function() {
		return this.config.flash;
	},
	incrementaCookiePropaganda:function() {
		if( !gmcEmbedDetecter.isWmpEmbed() ) {
			var i = gmcEmbedUtil.getCookie( this.config.cookiePropaganda );
			var contador;
			try {
				contador = eval(i);
			} catch(e) {
			}
			if(!contador) contador=0;
			contador++;
			gmcEmbedUtil.setCookie( this.config.cookiePropaganda,contador,2);
		}
	},
	zeraCookiePropaganda:function() {
		gmcEmbedUtil.setCookie( this.config.cookiePropaganda,"0",2);
	},
	reload:function() {
		this.jaDeuPlay = false;
		this.play();
	},
	play:function() {
		if( !this.jaDeuPlay ) {
			this.config.autoStart = true;
			var url = gmcEmbedUtil.getUrlPlay(this.config);
			location.href = url;
		}
	},
	reloadImagem:function() {
		this.config.autoStart = false;
		this.config.telaCheia = false;
		var url = gmcEmbedUtil.getUrlPlay(this.config);
		location.href = url;
	},
	showCompartilhe:function() {
		hide(this.config.divImagem);
		hide(this.config.divBanner);
		hide(this.config.divConteudo);
		hide(this.config.divEnviarAmigo);
		display(this.config.divCompartilhe);
	},
	showVideo:function() {
		this.putTag();
		this.jaDeuPlay = true;
	},
	reloadFimDeVideo:function() {
		if( this.config.mostraFimVideo=="true" && !this.config.escondeFimVideo ) {
			this.config.autoStart = true;
			var url = gmcEmbedUtil.getUrlFim(this.config);
			location.href = url;
		} else {
			this.config.autoStart = false;
			var url = gmcEmbedUtil.getUrlPlay(this.config);
			location.href = url;
		}
	},
	temBanner:function(divBanner) {
		var html = divBanner.innerHTML.toString().toUpperCase();
		if( html.indexOf("OBJECT")!=-1 || html.indexOf("EMBED")!=-1 || html.indexOf("IMG")!=-1 ) {
			return ( html.indexOf("DEFAULT/EMPTY.GIF")==-1 )
		} else {
			return false;
		}
	},
	showFimDeVideo:function() {
		var divCompartilhe = $(this.config.divCompartilhe);
		if( divCompartilhe ) divCompartilhe.style.display = "none";
		$(this.config.divConteudo).style.display = "block";
		this.jaDeuPlay = false;
	},
	showImagem:function() {
		var divCompartilhe = $(this.config.divCompartilhe);
		var divConteudo = $(this.config.divConteudo);
		var divImagem = $(this.config.divImagem);
		if( this.config.exibiuPropaganda ) {
			$(this.config.divBanner).style.display = "block";
			divConteudo.className = this.config.classComBanner;
		}
		divConteudo.style.display = "block";
		divImagem.style.display = "block";
		if( divCompartilhe ) divCompartilhe.style.display = "none";
		this.jaDeuPlay = false;
	},
	showEnviarAmigo:function() {
		if( this.config.pp ) {
			try{
				window.parent.amigo.exibir();
				window.parent.location.href = window.parent.location.href.split("#")[0] + "#enviar-amigo";
			 }catch(e){};
		} else {
			hide( this.config.divCompartilhe );
			display( this.config.divEnviarAmigo );
			amigo.exibir();
			this.jaDeuPlay = false;
		}
	},
	putTag:function() {
		if( this.isFlash() ) {
			if( gmcEmbedDetecter.isFlashMinimo() ) {
				this.player = this.putTagFlash( this.config.swf, this.config.divWmp );
			} else {
				this.player = this.putTagFlash( this.config.swfInstall, this.config.divWmp );
			}
		} else {
			this.putTagWMP();
		}
		this.id = this.player.id;
	},
	putTagFlashInstalador:function( onCancel ) {
		$(this.config.divWmp).style.visibility = "hidden";
		if( onCancel ) this.config.onCancelClick = "javascript:creator.fechaInstalador()";
		var p = this.putTagFlash( this.config.swfInstall, this.config.divInstall );
		delete this.config.onCancelClick;
		return p;
	},
	fechaInstalador:function() {
		$(this.config.divInstall).style.display = "none";
		$(this.config.divInstall).innerHTML = "";
		$(this.config.divWmp).style.visibility = "visible";
	},
	putTagFlash:function(swf,div) {
		var b = this.config.pp?'L':this.config.banda;
		var w, h;
		if( this.config.telaCheia ) {
			var a = getWindowSize();
			w = a.w;
			h = a.h;
		} else {
			w = gmcEmbedUtil.getLargura(b,true);
			h = gmcEmbedUtil.getAltura(b,true);
		}
		var p = new GMCFlashTag(w,h,swf,this.config);
		$(div).innerHTML = p.toString();
		$(div).style.display = "block";
		return p;
	},
	putTagWMP:function() {
		var w = gmcEmbedUtil.getLargura(this.config.banda);
		var h = gmcEmbedUtil.getAltura(this.config.banda);
		if( gmcEmbedDetecter.isWmpEmbed() ) {
			this.player = new GMCEmbedTag(w, h + this.config.barra_embed,this.config.url);
			$(this.config.divWmp).innerHTML = this.player.toString();
		} else {
			this.player = new GMCObjectTag(w, h + this.config.barra_wmp,this);
			$(this.config.divWmp).innerHTML = this.player.toString();
			$(this.player.id).URL = this.config.url;
			this.player.monitora();
		}
	},
	telaCheia:function() {
		this.player.telaCheia(this);
	},
	getUrlAnalytics:function(nomeEvento) {
		var midiaId = this.config.midiaId;
		if (nomeEvento == "play") {
			return "/use/play/" + this.config.macroTema + "/" + midiaId;
		}
		if (nomeEvento == "terminoDoVideo") {
			return "/use/end/" + this.config.macroTema + "/" + midiaId;
		}
		if (nomeEvento == "cliqueVerPropaganda") {
			return "/use/ad/" + this.config.macroTema + "/" + midiaId;
		}
	},
	executaUrchinTracker:function(url) {
		if (!this.urlsAnalyticsExecutadas) {
			this.urlsAnalyticsExecutadas = [];
		}
		
		if (!this.urlsAnalyticsExecutadas[url]) {
			try { urchinTracker(url); }
			catch(e) { /* nao importa se der erro no google analytics, o user nao pode ficar
			esperando */ }
			this.urlsAnalyticsExecutadas[url] = true;
		}
	},
	notificaGoogle:function(nomeEvento) {
		var _this = this;
		
		setTimeout( function() {
			
			if (nomeEvento == "play") {
				_this.executaUrchinTracker(_this.getUrlAnalytics(nomeEvento));
			}
			if (nomeEvento == "terminoDoVideo") {
				_this.executaUrchinTracker(_this.getUrlAnalytics(nomeEvento));
			}
			if (nomeEvento == "cliqueVerPropaganda") {
				_this.executaUrchinTracker(_this.getUrlAnalytics(nomeEvento));
			}
		}, 0 );
	},
	notificaEvento:function(nomeEvento) {
		this.notificaGoogle(nomeEvento);
		
		var _this = this;
		setTimeout( function() {
			var embed;
			try { embed = window.parent.RegistradorGMCEmbed.obter(_this.config.idEmbed); } catch(e) {}
			if(embed) embed.notificaEvento(nomeEvento);
		},0);
	}
}
//Tags -------------------
function GMCFlashTag(width,height,swf,config) {
	this.id = "gmcPlayer_" + (new Date().getTime()) + (Math.random()+"").replace(".","_");
   	this.width = width;
    this.height = height;
    this.swf = swf;
	this.config = config;
}
GMCFlashTag.prototype = {
	flashVars:function() {
		var s = "";
		var c = this.config;
		if( c ) {
			if( c.midiaId ) s += "midiaId=" + c.midiaId + "&";
			if( c.autoStart ) s += "autoStart=" + c.autoStart + "&";
			if( c.pp ) s += "pp=" + c.pp + "&";
			if( c.telaCheia ) s += "telaCheia=" + c.telaCheia + "&";
			if( c.urlSuporteFlash ) s += "urlSuporteFlash=" + encodeURIComponent( c.urlSuporteFlash ) + "&";
			if( c.urlDownloadFlash ) s += "urlDownloadFlash=" + encodeURIComponent( c.urlDownloadFlash ) + "&";
			if( c.urlCentralAtendimento ) s += "urlCentralAtendimento=" + encodeURIComponent( c.urlCentralAtendimento ) + "&";
			if( c.onCancelClick ) s += "onCancelClick=" + encodeURIComponent(c.onCancelClick) + "&";
			if( c.sitePage ) s += "sitePage=" + encodeURIComponent(c.sitePage) + "&";
			if( c.escondeFimVideo ) s += "escondeFimVideo=" + c.escondeFimVideo + "&";
			
		}
		// corre��o do bug da tela cinza no internet explorer
		if( this.width ) s += "width=" + this.width + "&";
		if( this.height ) s += "height=" + this.height + "&";
		return s;
	},
	toString:function() {
		var fv = this.flashVars();
		var _h = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
		_h += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ';
		_h += ' width="' + this.width + '" height="' + this.height + '" ';
		_h += ' id="' + this.id + '" align="middle">';
		_h += ' <param name="allowScriptAccess" value="always" /> ';
		_h += ' <param name="allowFullScreen" value="true" /> ';
		_h += ' <param name="wmode" value="opaque" />';
		_h += ' <param name="movie" value="' + this.swf + '" />';
		_h += ' <param name="quality" value="high" />';
		_h += ' <param name="bgcolor" value="#CCCCCC" />';
		_h += ' <param name="FlashVars" value="' + fv + '" />';
		_h += ' <embed src="' + this.swf + '" quality="high" bgcolor="#CCCCCC" ';
		_h += ' 	width="' + this.width + '" height="' + this.height + '" ';
		_h += ' 	name="' + this.id + '" align="middle" allowScriptAccess="always" ';
		_h += ' 	wmode="opaque" ';
		_h += ' 	allowFullScreen="true" type="application/x-shockwave-flash" ';
		_h += ' 	pluginspage="http://www.macromedia.com/go/getflashplayer" ';
		_h += ' 	flashvars="' + fv + '" ';
		_h += ' />';
		_h += '</object>';
		return _h;
	},
	telaCheia:function(creator) {
		var s = "width=" + screen.width + "px,height=" + screen.height + "px";
		s += ",left=0,top=0,scrollbars=no,status=no";
		var c = this.config;
		c.telaCheia = true;
		c.autoStart = true;
		var u = gmcEmbedUtil.getUrlPlay(c);
		var j = window.open(u, "embed", s);
		if(!j) {
			var t = "Ohhh n\u00e3o! Tem um bloqueador de popups atrapalhando a gente :(\n";
			t += "Desabilite o bloqueador e tente novamente";
			window.alert(t);
		} else {
			j.resizeTo(screen.width,screen.height);
			creator.reloadImagem();
		}
	}
}
function GMCEmbedTag(width,height,url)
{
	this.id = "gmcPlayer_" + (new Date().getTime()) + (Math.random()+"").replace(".","_");
   	this.width = width;
    this.height = height;
	this.url = url;
}
GMCEmbedTag.prototype = {
	toString:function() {
		var tag = '';
		var src = '';
		if(this.url) src = 'src="' + this.url + '"';
		tag += '<object><embed '+src+' width="'+this.width+'" height="'+this.height+'" id="' +this.id+ '" type="application/x-mplayer2" ';
		tag += ' style="margin-bottom: -6.5px" ';
		tag += 'showStatusBar="1" ';
		tag += 'stretchToFit="1" ';
		tag += '></embed></object>';
		return tag;
	},
	telaCheia:function() {}
}
function GMCObjectTag(width,height,creator) {
	this.id = "gmcPlayer_" + (new Date().getTime()) + (Math.random()+"").replace(".","_");
   	this.width = width;
    this.height = height;
    this.creator = creator;
	this.ultimaMidia = null;
}
GMCObjectTag.prototype = {
	toString:function() {
		var tag = '';
		tag += '<object width="'+this.width+'" height="'+this.height+'" id="' +this.id+ '" name="' + this.id + '" ';
		tag += 'classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6">';
		tag += '<param name="autoStart" value="true" />';
		tag += '<param name="uiMode" value="full" />';
		tag += '<param name="stretchToFit" value="true" />';
		tag += '</object>';
		return tag;
	},
	createScript:function(f,t,e) {
		var script = document.createElement('script');
		script.language='javascript';
		script.type='text/javascript';
		script.htmlFor=f;
		script.text=t;
		script.event=e;
		document.body.appendChild(script);
		var script = document.createElement('script');
		script.language='javascript';
		script.type='text/javascript';
		script.text = 'function ' + f + '_DoFSCommand(p1, p2) {' + t + '}';
		document.body.appendChild(script);
	},
	telaCheia:function() {
		var m = $(this.id);
		if( m && m.playState == 3 ) {
			var t = gmcEmbedUtil.getCookie("GMCEmbedTelaCheia");
			if( !t || t.length==0 ) {
				var m = "Para voltar ao modo de visualiza\u00e7\u00e3o normal aperte a tecla ESC";
				alert(m);
			}
			try {
				$(this.id).fullScreen = true;
				gmcEmbedUtil.setCookie("GMCEmbedTelaCheia","true",30);
			} catch(e) {
			}
		}
	},
	monitora:function() {
		try {
			mediaIndex = mediaArray.length;
			mediaArray.push(this);
		} catch(e) {
			mediaArray = [];
			mediaIndex = mediaArray.length;
			mediaArray.push(this);
		}

	   	var script = 'mediaArray[' + mediaIndex + '].onPlayStateChange(s);';
		var event = 'playStateChange(s)';

		this.createScript(this.id,script,event);

	   	var script = 'mediaArray[' + mediaIndex + '].onMediaChange(m);';
		var event = 'MediaChange(m)';

		this.createScript(this.id,script,event);

	   	var script = 'mediaArray[' + mediaIndex + '].onOpenStateChange(s);';
		var event = 'OpenStateChange(s)';

		this.createScript(this.id,script,event);
	},
	getInfo:function(s) {
		try {
			return document.getElementById( this.id ).currentMedia.getItemInfo(s);
		} catch(e) {
			return false;
		}
	},
	isPropaganda:function() {
		var p = this.getInfo("propaganda");
		return ( p && p=='true' );
	},
	getIdMidia:function() {
		return this.getInfo("idMidia");
	},
	isUltimo:function() {
		var p = this.getInfo("ultimo");
		return ( p && p=='true' );
	},
	getLargura:function() {
		return $( this.id ).width;
	},
	onOpenStateChange:function(s) {
		if( s == 16 ) this.drm = true;
	},
	mostraTelaCheia:function(b) {
		try{ $("telaCheia").style.display = b?"block":"none"; }catch(e){ }
	},
	onPlayStateChange:function(s) {
		if( s==2 ) {
			this.mostraTelaCheia(false);
		}
		else if( s==8 && this.isUltimo() ) {
			this.mostraTelaCheia(false);
			if( this.getLargura() >= this.creator.config.larguraBandaNormal ) {
				this.finalizou = true;
				this.creator.reloadFimDeVideo();
			}
		} else if( s==10 || s==1 ) {
			if( !this.drm ) {
				this.mostraTelaCheia(false);
				if( !this.finalizou ) {
					this.finalizou = true;
					this.creator.reloadImagem();
				}
			}
		} else {
			if( s==3 || s==6 ) this.drm = false;
			this.mostraTelaCheia(true);
		}
	},
	onMediaChange:function(s) {
		if( this.isPropaganda() ) {
			this.creator.zeraCookiePropaganda();
		}
		var id = this.getIdMidia();
		if( id && id!=this.ultimaMidia ) {
			this.creator.incrementaCookiePropaganda();
			this.ultimaMidia = id;
		}
	}
}
//Rating ----------------------
function Rating(config)
{
	this.config = config;
	this.init();
}
Rating.prototype = {
	init:function() {
		var html  = '<div id="' + this.config.container + '_estrelas" class="conteudo-rating"></div>';
		html += '<input value="" id="' + this.config.container + '_texto" class="nota" readonly="true" type="text" style="margin-left:65px" />';
		$( this.config.container ).innerHTML = html;
	},
	show:function() {
		if( this.config.mediaAtual > -1 ) {
			var self = this;
			setTimeout( function() { 
				self.printMedia(self.config.mediaAtual); 
			}, 1 );
		} else {
			this.getInformacao();
		}
	},
	//@deprecated
	getInformacao:function() {
		this.carregando(this.config.container + '_estrelas');
		var self = this;
		var sendObj =
		{
			url: this.getUrlInformacao(),
			obj: self,
			func: 'loadInformacao',
			onError: 'loadErro',
			args: []
		}
		var msg = new IframeEmuleAjax(this.config.containerIframe,sendObj);
	},
	getUrlComParametros:function(url) {
		if( url.indexOf('?') == -1 ) {
			url += '?1=1';
		}
		url += '&idItem=' + this.config.idItem;
		url += '&idEntidade=' + this.config.idEntidade;
		url += '&idSessao=' + this.config.idSessao;
		url += '&agregado=' + this.config.agregado;
		url += '&nocache=' + new Date().getTime();
		return url;
	},
	//@deprecated
	getUrlInformacao:function() {
		var url = this.getUrlComParametros(this.config.urlInformacao);
		return url;
	},
	getUrlDarNota:function(nota) {
		var url = this.getUrlComParametros(this.config.urlDarNota);
		url += '&nota=' + nota;
		return url;
	},
	loadInformacao:function(args) {
		try {
			eval( "var o = " + args.responseText + ";");
			if( o.erro ){
				this.loadErro();
			} else {
				this.printMedia(o.media);
			}
		}
		catch(e) {
			api.debug('Erro: ' + e + ' - ' + e.message);
			this.loadErro();
		}
	},
	loadErro:function() {
		$( this.config.container + "_media" ).innerHTML = "Ooops, ocorreu um erro por aqui";
		api.debug('Ocorreu um erro');
	},
	printMedia:function(media) {
		var c = $( this.config.container + "_estrelas" );
		var t = $( this.config.container + "_texto" );
		var nota = this.getSuaNota();

		var n = nota > 0 ? nota : media;

		if( c.innerHTML.indexOf("carregando")!=-1 || c.innerHTML.length==0 ) {
			var posicao = 5;

			var html = '';
			for(var i=1; i<=5; i++ ) {
				html += '<img src="';
				html += this.config.imagemOver;
				html += '" id="' + this.config.container + '_imgnota_' + i + '_on" ';
				html += ' style="position: absolute;left:' + posicao + 'px;';
				html += 'z-index:' + (i<=n?2:1) + '"/>';

				html += '<img src="';
				html += this.config.imagemOut;
				html += '" id="' + this.config.container + '_imgnota_' + i + '_off" ';
				html += ' style="position: absolute;left:' + posicao + 'px;';
				html += 'z-index:' + (i>n?2:1) + '"/>';

				posicao += 13;
			}

			c.innerHTML = html;

			if( nota == 0 ) {
				for(var i=1; i<=5; i++ ) {
					var imgOn = $(this.config.container + '_imgnota_' + i + '_on');
					var imgOff = $(this.config.container + '_imgnota_' + i + '_off');
					addEvento(imgOn,"mouseout",this,'imagemMouseOutNota',{imagem:i,media:media});
					addEvento(imgOn,"mouseover",this,'imagemMouseOver',{imagem:i,media:media});
					addEvento(imgOn,"click",this,'imagemClick',{imagem:i});
					addEvento(imgOff,"mouseout",this,'imagemMouseOutNota',{imagem:i,media:media});
					addEvento(imgOff,"mouseover",this,'imagemMouseOver',{imagem:i,media:media});
					addEvento(imgOff,"click",this,'imagemClick',{imagem:i});
				}
			}
		} else {
			this.preencheEstrelas(n);
		}

		if( nota > 0 ) t.value = this.config.textoSuaNota;
		else t.value = this.config.textoDeSuaNota;
	},
	preencheEstrelas:function(ate) {
		for(var i=1; i<=5; i++ ) {
			var imgOn = $(this.config.container + '_imgnota_' + i + '_on');
			var imgOff = $(this.config.container + '_imgnota_' + i + '_off');
			if( i<=ate ) {
				imgOn.style.zIndex = 2;
				imgOff.style.zIndex = 1;
			} else {
				imgOn.style.zIndex = 1;
				imgOff.style.zIndex = 2;
			}
		}
	},
	imagemMouseOver:function(args) {
		if( this.deuNota ) return;
		this.preencheEstrelas(args.imagem);
	},
	imagemMouseOutNota:function(args) {
		if( this.deuNota ) return;
		this.preencheEstrelas(args.media);
	},
	imagemClick:function(args) {
		if( this.deuNota ) return;

		this.deuNota = true;

		this.preencheEstrelas(args.imagem);

		$(this.config.container + '_texto').value = this.config.textoSuaNota;

		var self = this;
		var sendObj =
		{
			url: this.getUrlDarNota(args.imagem),
			obj: self,
			func: 'loadDarNota',
			onError: 'loadErro',
			args: []
		}

		var msg = new IframeEmuleAjax(this.config.containerIframe,sendObj);
	},
	carregando:function(id) {
		$(id).innerHTML = "carregando...";
	},
	loadDarNota:function(args) {
		try {
			eval("var o = " + args.responseText);
			if( o.erro ) {
				this.loadErro();
			} else if( o.media && o.media > 0 ) {
				this.printMedia(o.media);
			}
		}
		catch(e) {
			api.debug('Rating.loadInformacao -> erro: ' + e + ", conteudo = " + args.response);
			this.loadErro();
		}
	},
	getSuaNota:function() {
		var c = Cookie.get( this.getNomeCookie() );
		if( !c || c.indexOf(this.config.idItem + "-") == -1 ) {
			api.debug('Rating.getSuaNota -> return 0')
			return 0;
		}
		var n = c.split("|");
		for( var i in n ) {
			var t = n[i].split("-");
			if( t[0] == this.config.idItem ) {
				api.debug('Rating.getSuaNota -> return ' + t[1])
				return t[1];
			}
		}
		api.debug('Rating.getSuaNota -> return 0');
		return 0;
	},
	getNomeCookie:function() {
		var nome = this.config.nomeCookie + "_" + this.config.idSessao + "_" + this.config.idEntidade;
		return nome;
	}
}

//StaticCookie -------------
function StaticCookie() {}
StaticCookie.prototype = {
	set:function(name,value,domain,expires,path,secure) {
	    var cookieString = name + "=" +escape(value) +
	       ( (expires) ? ";expires=" + expires.toGMTString() : "") +
	       ( (path) ? ";path=" + path : "") +
	       ( (domain) ? ";domain=" + domain : "") +
	       ( (secure) ? ";secure" : "");
	    document.cookie = cookieString;
	},
	get:function(name) {
	   var start = document.cookie.indexOf(name+"=");
	   var len = start+name.length+1;
	   if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
	   if (start == -1) return null;
	   var end = document.cookie.indexOf(";",len);
	   if (end == -1) end = document.cookie.length;
	   return unescape(document.cookie.substring(len,end));
	},
	del:function(name,domain,path) {
	   if (gmc_get_cookie(name)) document.cookie = name + "=" +
	      ( (path) ? ";path=" + path : "") +
	      ( (domain) ? ";domain=" + domain : "") +
	      ";expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
var Cookie = new StaticCookie();

//Debug -----------------------
function javascriptObj(){
	this.debugFlg = 1;
}
javascriptObj.prototype = {
	objToString:function (obj) {
		var str = "";
		for(var i in obj) {
			if( i && (obj[i] || obj[i]==0) ) str += i + ": '" + obj[i] + "', ";
		}
		if( str.length > 0 )str = "{ " + str.substring(0,str.length-2) + " }";
		else str = "{}";
		return str;
	},
	debugDisplay:function() {
		return this.debugFlg ? "block" : "none";
	},
	debug:function(t) {
		if(!this.debugFlg) return;
		try {
			var d = document.getElementById('debug');
			var c = d.innerHTML;
			if( c.length > 10000 )
				c = c.substring(7000,c.length-1);
			d.innerHTML = c + t + '<br>';
		} catch(e) {
		}
	}
}
var api = new javascriptObj();

//Fim video
var videos = new Object();

videos.Scroll = function(container,mask){

	//atribuindo argumentos, passados no construtor
	this.container = document.getElementById(container);
	this.mask = document.getElementById(mask);


	//variaveis de controle;
	this.lastPosx = 0;
	this.posxAtual = 0;
	this.onVideoAnimation = false;

	//Tween
	this.easingEquation = "";

	//init
	this.init();
}

videos.Scroll.prototype = {
	init:function()
	{
		this.maskW = parseInt(this.mask.offsetWidth);
		this.containerW = parseInt(this.container.offsetWidth);
	},
	move:function(direcao)
	{
		if(this.onVideoAnimation)return;

		switch(direcao) {
			case "left":
			this.scrollLeft();
			break;

			case "right":
			this.scrollRight();
			break;
		}
	},
	scrollLeft:function()
	{
		this.posxAtual = this.lastPosx - this.maskW;

		this.onVideoAnimation = true;

		var mov = new Tween(this.lastPosx, this.posxAtual, 1000);
		_self = this;

		mov.onAnimation = function(value){
			_self.container.style.left = -Math.round(value)+"px";
		}
		mov.onEndAnimation = function(value){
			if (_self.posxAtual<0)
				{
					_self.posxAtual=_self.containerW-250;
					_self.container.style.left = -_self.posxAtual+"px";
				}
			_self.lastPosx = _self.posxAtual;
			_self.onVideoAnimation = false;
		}
		mov.init();
	},
	scrollRight:function()
	{
		this.posxAtual = this.lastPosx + this.maskW;

		this.onVideoAnimation = true;

		var mov = new Tween(this.lastPosx, this.posxAtual, 1000);
		_self = this;

		mov.onAnimation = function(value){
			_self.container.style.left = -Math.round(value)+"px";
		}
		mov.onEndAnimation = function(value){
			if (_self.posxAtual==_self.containerW)
				{
					_self.posxAtual=0;
					_self.lastPosx=0;
					_self.container.style.left = "0px";
				}
			_self.lastPosx = _self.posxAtual;
			_self.onVideoAnimation = false;
		}
		mov.init();
	}
}