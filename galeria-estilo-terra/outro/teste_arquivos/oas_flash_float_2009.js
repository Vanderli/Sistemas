/* globo.com 2009 */

if(typeof oasBanners != "undefined") oasBanners[oasObj.div] = oasObj;

oas_flash_float_write = function() {

	var isie = (navigator.appVersion.indexOf("MSIE") != -1) ? (navigator.appVersion.indexOf("Mac") != -1) ? false : true  : false;
	
	if(!this.version) this.version = 9;
	this.id = 'bannerOAS_' + new Date().getTime() + Math.floor(Math.random()*100);
	this.flashvars = 'lnk='+this.lnk;
	this.flashvars+= '&url='+this.lnk;
	this.flashvars+= '&ie='+isie;
	this.flashvars+= '&width='+this.width;
	this.flashvars+= '&height='+this.height;
	this.flashvars+= '&div=div'+this.id;
	this.flashvars+= '&id='+this.id;
	if(!this.tempo) this.tempo = 12;
	if(this.tempo>12) this.tempo = 12;
	
	var oasHTM = '';
	if(this.pixelContador) {
		oasHTM+='<div style="position:absolute;visibility:hidden;width:1px;height:1px;z-index:-1000">';
		oasHTM+='<img src="' + this.pixelContador + '" width="1" height="1" border="0" /></div>';
	}
	oasHTM+='<div id="pos'+this.id+'" style="width:10px;z-index:50000;position:absolute;margin:0 auto;text-align:left;"><div style="z-index:50001;position:absolute;margin:'+this.top+'px 0 0 '+this.left+'px;width:'+this.width+'px;height:'+this.height+'px;" id="div'+this.id+'"></div></div>';
	this.htm = oasHTM;
	
	if(this.div) {
		if(document.getElementById(this.div)) document.getElementById(this.div).innerHTML = this.htm;
		else document.write(this.htm);
	}
	else document.write(this.htm);	
	
	var oasID = ' name="'+this.id+'" id="'+this.id+'" ';
	this.htmLoad = '';
	this.htmLoad+='<object '+oasID+' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownloadocument.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+this.version+',0,0,0" width="'+this.width+'" height="'+this.height+'">';
	this.htmLoad+='<param name="movie" value="'+this.flash+'" /><param name="wmode" value="transparent" /><param name="quality" value="high" /><param name="flashvars" value="'+this.flashvars+'" /><param name="AllowScriptAccess" value="always" />';
	this.htmLoad+='<embed wmode="transparent" '+oasID+' src="'+this.flash+'" flashvars="'+this.flashvars+'" AllowScriptAccess="always" quality="high" width="'+this.width+'" height="'+this.height+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	
	var oasJS = 'if(p1 == "fecha") fechaBannerGlb("div'+this.id+'"); if(p1 == "go") goBannerGlb(p2);';
	this.script = oasScript(this.id,oasJS);
	
	this.writeLoad = function() {
		document.getElementById('div'+this.id).innerHTML = this.htmLoad;
		document.getElementById('div'+this.id).appendChild(this.script);
		this.posResize();
		if(this.permanente) return;
		var self = this;
		setTimeout(
			function(){ 
				fechaBannerGlb('div'+self.id);
			}
			, self.tempo*1000);
	}
	
	this.posResize = function() {
		var isie = (navigator.appVersion.indexOf("MSIE") != -1) ? (navigator.appVersion.indexOf("Mac") != -1) ? false : true  : false;
		var pageWidth = (isie)?document.body.offsetWidth:innerWidth;
		this.divPos.style.left = parseInt((pageWidth-this.siteWidth)/2) + 'px';
		this.divPos.style.top = '0px';
	}
	
	this.divPos = document.getElementById('pos' + this.id);
	this.divPos.style.width = this.siteWidth + 'px';
	
	if(this.absoluto==1) {
		this.divPos.style.margin = '0px';
		var self = this;
		this.posResize();
		addEvent( { 
			object:window, 
			event:'resize', 
			func:function() { self.posResize() }
		} );
	} else {
		this.divPos.style.position = 'relative';
	}
	
	var self = this;
	addEvent( { 
		object:window, 
		event:'load', 
		func:function() { self.writeLoad() }
	} );	

}

if (typeof oasBanners == "undefined") {
	oasObj.write = oas_flash_float_write;
	oasObj.write();
}

function oasScript(id,js) {
	var isie = (navigator.appVersion.indexOf("MSIE") != -1) ? (navigator.appVersion.indexOf("Mac") != -1) ? false : true  : false;
	var script = document.createElement('script');
	script.language='javascript';
	script.type='text/javascript';
	if(isie) {
		script.event ='FSCommand(p1,p2)';
		script.htmlFor = id;
		script.text = js;
	}
	return script;
}

function addEvent(args) {
   var object = args.object;
   if(object.addEventListener) {
      object.addEventListener(args.event, args.func, false);
   } else if(object.attachEvent) {
      object.attachEvent('on' + args.event, args.func);
   }
}

function fechaBannerGlb(id) {
	document.getElementById(id).style.display = 'none';
}

function goBannerGlb(url) {
	window.open(url);
}