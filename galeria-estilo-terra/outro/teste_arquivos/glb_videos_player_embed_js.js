<!-- Vignette V6 Wed Oct 07 04:11:21 2009 -->

//Versao 4.3.0

//RegistradorGMCEmbed
try{ RegistradorGMCEmbed.existo(); }
catch(e) {
	var id = 0;
	var embeds = [];
	RegistradorGMCEmbed = {
		existo:function() {},
		registrar:function(embed) {
			embeds[++id] = embed;
			return id;
		},
		obter:function(idEmbed) {
			return embeds[idEmbed];
		}
	}
}

//GMCEmbed -------------------
function GMCEmbed(config) {
	this.config = config;
	this.config.idEmbed = RegistradorGMCEmbed.registrar(this);
	this.id = "globovideos_embed_" + this.config.idEmbed;
	if( !this.config.pp && this.config.embedInterno ) {
		this.config.pp = this.config.embedInterno;
	}
	this.config.escondeBarraInferior = this.config.escondeTrocaBanda;
	this.tamanhos = {
		P: { largura: 186, altura: 204, barraInferior: 34 },
		I: { largura: 288, altura: 268, barraInferior: 20 },
		N: { largura: 320, altura: 288, barraInferior: 16 },
		L: { largura: 480, altura: 409, barraInferior: 17 },
		PaginaPlayer : { largura: 480, altura: 439, barraInferior: 0 }
	};
	this.observarEventos();
}
GMCEmbed.prototype =
{
	_chave:function() { 
		if( 'PINL'.indexOf(this.config.banda)==-1 ) {	
			this.config.banda = 'N';
		}
		return this.config.pp ? 'PaginaPlayer' : ( this.config.banda ? this.config.banda : 'N' );
	},
	_largura:function() { 
		return this.tamanhos[ this._chave() ].largura;
	},
	_altura:function() {
		var t = this.tamanhos[ this._chave() ];
		return this.config.escondeBarraInferior ? t.altura - t.barraInferior : t.altura; 
		//return 450;
	},
	toString:function(poeSrc) {
		var h = '<iframe  allowtransparency="true" name="' + this.id + '" id="' + this.id + '" style="';
		h += 'width:' + this._largura() + 'px;';
		h += 'height:' + this._altura() + 'px"';
		if( poeSrc ) h += " src=\"" + gmcEmbedUtil.getUrlPlay(this.config) + "\" ";
		if( this.config.onload ) h += " onload=\"" + this.config.onload + "('" + this.id + "')\" ";
		h += ' marginheight="0" frameborder="0" ';
		h += ' marginwidth="0" scrolling="no"></iframe>';
		return h;
	},
	makeIframe:function() {
		var iframe = document.createElement("iframe");
		iframe.id = this.id;
		iframe.name = this.id;
		iframe.style.width = this._largura() + 'px'
		iframe.style.height = this._altura() + 'px';
		return iframe;
	},
	play:function() {
		var url = gmcEmbedUtil.getUrlPlay(this.config);
		var i = document.getElementById(this.id);
		i.src = url;
	},
	destroy:function() {
		var i = document.getElementById(this.id);
		i.src = "about:blank";
	},
	_vp:function(tempo) {
		if(!tempo) {
			this.play();
		} else {
			var self = this;
			setTimeout( function() { self.play(); }, tempo );
		}
	},
	print:function(tempo) {
		document.writeln(this.toString());
		this._vp(tempo);
	},
	attach:function(div,tempo) {
		var d = document.getElementById(div);
		d.innerHTML = "";
		d.innerHTML = this.toString();
		this._vp(tempo);
	},
	acertaFrameFlash:function() {
		document.getElementById(this.id).style.height = (this._altura()-16) + 'px';
	},
	acertaFrameH264:function() {
		document.getElementById(this.id).style.height = '300px';
	},
	resize:function(b) {
		this.config.banda = b;
		document.getElementById(this.id).style.width = this._largura() + 'px';
		document.getElementById(this.id).style.height = this._altura() + 'px';
	},
	observarEventos:function() {
		var c = this.config;
		if( c.onPlay || c.onTerminoDoVideo || c.onCliqueVerPropaganda ) {
			try { 
				document.domain="globo.com";
			} catch(e) {
				var msg = 'GloboVideosEmbed Warning: \nEventos s\u00f3 devem ser ';
				msg += 'configurados para paginas no dom\u00ednio globo.com'
				alert(msg);
			}
		}
	},
	notificaEvento:function(nome) {
		var metodo = this.metodoDoEvento(nome);
		if( metodo ) {
			metodo({midiaId: this.config.midiaId});
		}
	},
	metodoDoEvento:function(nomeEvento) {
		var a = nomeEvento.charAt(0);
		var nomeMetodo = "on" + nomeEvento.replace(a,a.toUpperCase());
		return this.config[nomeMetodo];
	}
}
//Detecter
function GMCEmbedDetecter() {
	this.isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	this.isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	this.isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	this.wmp = this.detectWmp();
	this.flashMinimo = this.detectSwf(9,0,115);
	if(this.flashMinimo) this.flashInstalado = true;
	else this.flashInstalado = this.detectSwf(6,0,65);
}
GMCEmbedDetecter.prototype = {
	isWmpEmbed:function() {
		return this.wmp.version == "embed";
	},
	isWmpInstalado:function() {
		return ( this.wmp.installed && ( this.isWmpEmbed() || this.wmp.version >= 9 ) );
	},
	isFlashMinimo:function() {
		return this.flashMinimo;
	},
	isFlashInstalado:function() {
		return this.flashInstalado;
	},
	detectSwf:function(reqMajorVer, reqMinorVer, reqRevision) {
		versionStr = this.getSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(this.isIE && this.isWin && !this.isOpera) {
				tempArray = versionStr.split(" ");
				tempString = tempArray[1];
				versionArray = tempString.split(",");
			} else {
				versionArray = versionStr.split(".");
			}
			var versionMajor = versionArray[0];
			var versionMinor = versionArray[1];
			var versionRevision   = versionArray[2];
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer))
					return true;
				else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision))
						return true;
				}
			}
			return false;
		}
	},
	getSwfVerWin:function() {
		var version; var axo; var e;
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} catch (e) {}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				axo.AllowScriptAccess = "always";
				version = axo.GetVariable("$version");
			} catch (e) {}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			} catch (e) {}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			} catch (e) {}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		return version;
	},
	getSwfVer:function() {
		var flashVer = -1;
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
				var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");
				var versionMajor = tempArrayMajor[0];
				var versionMinor = tempArrayMajor[1];
				if ( descArray[3] != "" ) {
					tempArrayMinor = descArray[3].split("r");
				} else {
					tempArrayMinor = descArray[4].split("r");
				}
				var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
				var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			}
		}
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if ( this.isIE && this.isWin && !this.isOpera ) {
			flashVer = this.getSwfVerWin();
		}
		return flashVer;
	},
	detectWmp:function() {
		var wmp64 = "MediaPlayer.MediaPlayer.1";
		var wmp7 = "WMPlayer.OCX.7";
		var wmpInfo = {
			installed: false,
			scriptable: false,
			version: 0
		};
		var player = null;
		try {
			if(window.ActiveXObject) {
				wmpInfo.scriptable = true;
				player = this.createActiveXObject(wmp7);
				if(player) {
					wmpInfo.installed = true;
					wmpInfo.version = parseInt(player.versionInfo);
					return wmpInfo;
				}
				player = this.createActiveXObject(wmp64);
				if(player) {
					wmpInfo.installed = true;
					wmpInfo.version = 6;
					return wmpInfo;
				}
			}
		} catch (e) {}
		try {
			if(navigator.mimeTypes) {
				player = navigator.mimeTypes['application/x-mplayer2'].enabledPlugin;
				if(player) {
					wmpInfo.scriptable = false;
					wmpInfo.installed = true;
					wmpInfo.version = 'embed';
					return wmpInfo;
				}
			}
		} catch (e) {}
		return wmpInfo;
	},
	createActiveXObject:function(id) {
		var error;
		var control = null;
		try	{
			if (window.ActiveXObject)	control = new ActiveXObject(id);
			else if (window.GeckoActiveXObject) control = new GeckoActiveXObject(id);
		} catch (e) {}
		return control;
	}
}
var gmcEmbedDetecter = new GMCEmbedDetecter();

//GMCEmbedUtil
function GMCEmbedUtil()
{
	this.bandas = {
		wmp : {
			P : { largura: 186, altura: 116 },
			N : { largura: 320, altura: 200 },
			L : { largura: 480, altura: 300 },
			I : { largura: 288, altura: 180 }
		},
		swf : {
			P : { largura: 186, altura: 170 },
			N : { largura: 320, altura: 272 },
			L : { largura: 480, altura: 392 },
			I : { largura: 288, altura: 248 }
		}
	}
	var h = "http://playervideo.globo.com/webmedia/";
	this.urlPlay = h + "player/GMCPlayMidia";
	this.urlPlayEmbed = h + "player/embed/GMCPlayMidia";
	this.urlStop = h + "player/GMCAbrePlayer";
	this.urlStopEmbed = h + "player/embed/GMCAbrePlayer";
	this.urlFim = h + "player/GMCFimVideo";
	this.urlFimEmbed = h + "player/embed/GMCFimVideo";
	this.urlEnviar = h + "GMCEnviarEmail";
	this.urlLogin = h + "player/GMCLogin";
	this.urlLoginEmbed = h + "player/embed/GMCLogin";
}
GMCEmbedUtil.prototype =
{
	getLargura:function(b,f)
	{
		if(!b) b = 'N';
		var t = f?'swf':'wmp';
		var l = this.bandas[t][b];
		if(!l) l = this.bandas[t]['N'];
		return l.largura;
	},
	getAltura:function(b,f)
	{
		if(!b) b = 'N';
		var t = f?'swf':'wmp';
		var l = this.bandas[t][b];
		if(!l) l = this.bandas[t]['N'];
		return l.altura;
	},
	doLoginNovo:function(f)
	{
		if( this.isFazendoLogin ) return false;
		this.isFazendoLogin = true;

		var boxErro = document.getElementById("box-erro-form");
		var liLogin = document.getElementById("li-login");
		var liSenha = document.getElementById("li-senha");
		boxErro.className = "";
		liLogin.className = "";
		liSenha.className = "";

		var o = null;

		if( !f.login.value || f.login.value.length==0 )
		{
			liLogin.className = "erro-form";
			o = f.login;
		}
		if( !f.senha.value || f.senha.value.length==0 )
		{
			liSenha.className = "erro-form";
			o = f.login;
		}

		if( o ) {
			boxErro.className = "on";
			o.focus();
			this.isFazendoLogin = false;
			return false;
		}

		var url = ( f.pp && f.pp.value == 'true' ) ? this.urlLogin : this.urlLoginEmbed;
		f.action = url;

		return true;
	},
	doRequisitos:function(id)
	{
		this.setCookie('ntr','true',7);
		this.doSubmit(id);
	},
	doSubmit:function(id)
	{
		var f = document.getElementById(id);
		url = ( f.pp && f.pp.value == 'true' ) ? this.urlPlay : this.urlPlayEmbed;
		f.action = url;
		f.submit();
	},
	setCookie:function(name,value,dias)
	{
		if (dias) {
			var date = new Date();
			date.setTime(date.getTime()+(dias*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		var path = "/".length>0 ? "; path=/" : "";
		var domain = ".globo.com".length>0 ? "; domain=.globo.com" : "";
    	var cookieString = name + "=" + escape(value) + path + domain + expires;
    	document.cookie = cookieString;
	},
	getCookie:function(name)
	{
   		var start = document.cookie.indexOf(name+"=");
		var len = start+name.length+1;
		if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
		if (start == -1) return null;
		var end = document.cookie.indexOf(";",len);
		if (end == -1) end = document.cookie.length;
		return unescape(document.cookie.substring(len,end));
	},
	getParametros:function(c)
	{
		var p = "?midiaId=" + c.midiaId;
		p += "&autoStart=" + (c.autoStart ? "true" : "false");
		p += "&idEmbed=" + c.idEmbed;
		if( c.imagem ) p += "&imagem=" + c.imagem;
		if( c.css ) p += "&css=" + c.css;
		if( c.banda ) p += "&banda=" + c.banda;
		if( c.pp ) p += "&pp=" + c.pp;
		if( c.escondeFimVideo ) p += "&escondeFimVideo=true";
		if( c.escondeTrocaBanda ) p += "&escondeTrocaBanda=true";
		if( c.telaCheia ) p += "&telaCheia=true";
		if( !gmcEmbedDetecter.isFlashInstalado() ) p += "&ntf=true";
		if( c.autoStart )
			if( !gmcEmbedDetecter.isWmpInstalado() || gmcEmbedDetecter.isWmpEmbed() ) {
				p += "&ntr=true";
			}
		if(c.sitePage) p += "&sitePage=" + c.sitePage;
		p += "&nocache=" + new Date().getTime();
		return p;
	},
	getUrlPlay:function(config)
	{
		var url;
		if( config.autoStart ) url = config.pp ? this.urlPlay : this.urlPlayEmbed;
		else url = config.pp ? this.urlStop : this.urlStopEmbed;
		return url + this.getParametros(config);
	},
	getUrlFim:function(config)
	{
		var url = config.pp ? this.urlFim : this.urlFimEmbed;
		return url + this.getParametros(config);
	},
	adaptaBanda:function(banda)
	{
		if( document.getElementById("videoBarra") )
		{
			if( banda == 'L' )
			{
				document.getElementById("tamanhoNormal").style.display = "inline";
				document.getElementById("tamanhoGrande").style.display = "none";
			}
			else
			{
				document.getElementById("tamanhoNormal").style.display = "none";
				document.getElementById("tamanhoGrande").style.display = "inline";
			}
			document.getElementById("videoBarra").style.display = "block";
		}
	},
	openWin:function(url,w,h)
	{
		var left = (screen.width - w) / 2;
		var top = (screen.height - h) / 2;
		var s = "width=" + w + ", height=" + h + ", top=" + top + ", left=" + left + ",scrollbars=yes";
		var j = window.open(url, "embed", s);
		if (j == null || j == undefined) {
			alert("Por favor, desative o seu bloqueador de popups e tente novamente");
		}
	}
}
var gmcEmbedUtil = new GMCEmbedUtil();

// Mashup ---------------------------
function MashupEmbed()
{
	this.isVideoEmbedOpen = false;
	this.img = null;
	this.embed = null;
}
MashupEmbed.prototype.addVideoEmbed = function(q,config)
{
	if(!this.isVideoEmbedOpen)
	{
		var divT = document.createElement('div');
		divT.id = 'boxVideo';

		var html = '<a class="close" href="javascript:;" onclick="mashupEmbed.videoClose(this);">';
		html += '<img src="http://video.globo.com/Portal/globonoticias/img/boxBuscaClose.gif" width="15" height="15" alt="fechar" border="0" />';
		html += '</a><h3><img src="http://video.globo.com/Portal/homeglobocom/2006_2/img/gmc_video.gif" /></h3>';

		divT.innerHTML = html;

		var divC = document.createElement('div');
		divC.id = 'boxVideoConteudo';
		divT.style.width = eval(gmcEmbedUtil.getLargura(config.banda)) + "px";
		divT.style.height = eval(gmcEmbedUtil.getAltura(config.banda) + 125) + "px";
		divT.appendChild(divC);
		document.body.appendChild(divT);

		this.move(q,divT,-20,17);

		this.embed = new GMCEmbed(config);
		this.embed.attach("boxVideoConteudo");
		this.isVideoEmbedOpen = true;
	}
}
MashupEmbed.prototype.move = function(target,objMove,offx,offy){
	this.target = target;
	this.obj = objMove;
	this.offx = offx;
	this.offy = offy;
	this.obj.style.left = this.moveX(this.offx,this.target)+"px";
	this.obj.style.top = this.moveY(this.offy,this.target)+"px";
	return false;
}
MashupEmbed.prototype.moveX = function(x, elem) {
		if (!document.layers) {
			var onWindows = navigator.platform ? navigator.platform == "Win32" : false;
			var mac = document.all && !onWindows && getExplorerVersion() == 4.5;
			var par = elem;
			var lastOffset = 0;
			while(par){
				if(par.leftMargin && !onWindows) x += parseInt(par.leftMargin);
				if((par.offsetLeft != lastOffset) && par.offsetLeft ) x += parseInt(par.offsetLeft);
				if(par.offsetLeft != 0) lastOffset = par.offsetLeft;
				par = mac ? par.parentElement : par.offsetParent;
			}
		} else if (elem.x) x += elem.x;
		return x;
}
MashupEmbed.prototype.moveY = function(y, elem) {
		if(!document.layers) {
			var onWindows = navigator.platform ? navigator.platform == "Win32" : false;
			var mac = document.all && !onWindows && getExplorerVersion() == 4.5;
			var par = elem;
			var lastOffset = 0;
			while(par){
				if( par.topMargin && !onWindows ) y += parseInt(par.topMargin);
				if( (par.offsetTop != lastOffset) && par.offsetTop ) y += parseInt(par.offsetTop);
				if( par.offsetTop != 0 ) lastOffset = par.offsetTop;
				par = mac ? par.parentElement : par.offsetParent;
			}
		} else if (elem.y >= 0) y += elem.y;
		return y;
}
MashupEmbed.prototype.videoClose = function(o)
{
	if( this.isVideoEmbedOpen )
	{
		this.isVideoEmbedOpen = false;
		this.embed.destroy();
		o.parentNode.parentNode.removeChild(o.parentNode);
		//this.embed = null;
	}
}
var mashupEmbed = new MashupEmbed();