//v.1.7
function $(id) {return document.getElementById(id);}
function rm(id) { if($(id)) $(id).parentNode.removeChild($(id)); }
function isSet(v) {return typeof(window[v]) != 'undefined';}
function display(id) { if($(id)){$(id).style.display="block";}  }
function hide(id) { if($(id)){$(id).style.display="none";}  }
function setClass(id,cl) { if($(id)){$(id).className=cl;} }

// DestaqueSecundario
DestaqueSecundario = {
	configura:function(propaganda) {
		if(propaganda) {
			this.destaquesComPropaganda();
		} else {
			this.destaquesSemPropaganda();
		}
	},
	destaquesComPropaganda:function() {
		$("destaqueSecundario_2").className += " ultimo";
		$("primeiraColunaDestaques").removeChild($("destaqueSecundario_3"));
	},
	destaquesSemPropaganda:function() {
		$("segundaColunaDestaques").removeChild( $("propagandaDoBoxSecundario") );
		$("destaqueSecundario_1").className += " ultimo";
		var d2 = $("destaqueSecundario_2");
		var d3 = $("destaqueSecundario_3");
		$("primeiraColunaDestaques").removeChild( d2 );
		$("primeiraColunaDestaques").removeChild( d3 );		
		$("segundaColunaDestaques").appendChild( d2 );
		$("segundaColunaDestaques").appendChild( d3 );
	}
}

// RatingDraw
RatingDraw = {
	htmlIn: '<img width="9" height="9" alt="*" src="/Portal/videos/cda/img/ico_estrela_ativada_pq.gif"/>',
	htmlOut: '<img width="9" height="9" alt="" src="/Portal/videos/cda/img/ico_estrela_desativada_pq.gif"/>',
	print:function(m) {
		document.writeln( this.html(m) );
	},
	html:function(m) {
		var h = "";
		for(i=0;i<5;i++) {
			if(i<m)	h += this.htmlIn;
			else h += this.htmlOut;
		}
		return h;
	}
}

// Ajax
function ajaxObj(params){
	this.container = document.getElementById(params.container);
	this.conteudo = document.getElementById(params.conteudo);
}

ajaxObj.prototype.abreXml = function(url) {
	this.container.className = 'carregando';
	var self = this;
	this.xml = new xmlObj( {
		url: url,
		obj: self,
		func: 'onloadXml',
		args: { }
	} );;
}

ajaxObj.prototype.onloadXml = function(args) {
	this.container.className = '';
	var htm = args.responseText;
	this.conteudo.innerHTML = htm;
}

function xmlObj(args) {
	this._args = args;
	this.load();
}

xmlObj.prototype.load = function() {
	this._request = this._getXMLHTTPRequest();
	var _this = this;
    if (this._request.overrideMimeType) this._request.overrideMimeType('text/xml');
	this._request.onreadystatechange = function(){_this._onData()};
	this._request.open("GET",this._args.url, true);
	this._request.send(null);
}

xmlObj.prototype._onData = function() {
	if(this._request.readyState == 4) {
		if(this._request.status == "200") {
			var obj = this._args.obj;
			var func = this._args.func;
			var args = this._args.args;
			args.responseXML = this._request.responseXML;
			args.responseText = this._request.responseText;
			obj[func](args);
		}
		delete this._request;
	}
}

xmlObj.prototype._getXMLHTTPRequest = function(){
	var xmlHttp;
	try	{
		xmlHttp = new ActiveXObject("Msxml2.XMLHttp");
	} catch(e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
		} catch(e2) {}
	}
	if(xmlHttp == undefined && (typeof XMLHttpRequest != 'undefined')) {
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}

// Iframe --------------------------------------

function IframeEmuleAjax(div,send) {
	this.iframe = $(div);
	this.send = send;
	this.load();
}
IframeEmuleAjax.prototype.fixo = function() {
	return (this.iframe && this.iframe.tagName=='IFRAME');
}
IframeEmuleAjax.prototype.load = function() {
	var iframe = this.iframe;
	if( this.fixo() ) {
		this.id = iframe.id;
	} else {
		this.id = 'IframeEmuleAjax_' + (new Date().getTime());
		iframe = document.createElement('iframe');
		if(this.send.url) iframe.src = this.send.url
		iframe.id = this.id;
		iframe.name = this.id;
		iframe.style.display = "none";
		document.body.appendChild(iframe);
	}
	this.funcao = addEvento(iframe,'load',this,'onData', {id:iframe.id} );
}
IframeEmuleAjax.prototype.onData = function(obj) {
	var obj = this.send.obj;
	var body = null;
	var h = null;
	try {
		body = frames[this.id].document.getElementsByTagName("body")[0];
	} catch(e) {
		if(this.send.onError!=undefined)
			obj[this.send.onError](e);
	}
	if( body ) {
		var args = this.send.args;
		args.responseText = body.innerHTML;
		obj[this.send.func](args);
	}
	var iframe = $(this.id);
	if( this.fixo() ) {
		removeEvento(iframe,'load',this.funcao);
	} else {
		setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 5000 );
	}
}
function addEvento($obj,$evn,$robj,$fun,$args) {
	var funcao = function() { $robj[$fun]($args) };
	if ($obj.addEventListener) {
		$obj.addEventListener($evn, funcao, true);
	}  else if ($obj.attachEvent) {
		$obj.attachEvent('on'+$evn, funcao );
	}
	return funcao;
}
function removeEvento($obj,$evn,$fun) {
	if ($obj.removeEventListener) {
		$obj.removeEventListener($evn, $fun, true);
		return true;
	}  else if ($obj.dettachEvent) {
		return $obj.dettachEvent('on'+$evn, $fun );
	}
}

// Busca ---------------------------------------

function GMCBusca(c)
{
	this.config = c;
}
GMCBusca.prototype.getUrl = function(args)
{
	var url = this.config.url + '?1=1';
	for(var i in args)
	{
		if( i )
		{
			var v = args[i];
			if( v )
			{
				url += '&' + i + '=' + v;
			}
		}
	}
	return url;
}
GMCBusca.prototype.buscar = function(_args)
{
	var self = this;
	var obj = {
		url: this.getUrl(_args),
		obj: self,
		func: 'receber',
		onError: 'erro',
		args: _args
	}
	var i = new IframeEmuleAjax("iframe",obj);
}
GMCBusca.prototype.receber = function(r)
{
	document.getElementById(this.config.div).innerHTML = r.responseText;
	document.getElementById(this.config.div).className = 'glb-bloco-com-lateral';
}
GMCBusca.prototype.erro = function(e)
{
	alert("Ooops!\n\n ocorreu o seguinte erro: \n\n" + e + "\n\n" + e.message);
}

// Efeitos GLBLib --------------------------------

var glbLib = {};

glbLib.moveTo = function(obj){
	if(typeof obj != 'object') this.obj = document.getElementById(obj);
	else this.obj = obj;
}

glbLib.moveTo.prototype = {
	clearTimer:function() {
		clearInterval(this.timer);
		this.timer = null;
	},
	animation:function(args) {
		this.clearTimer();
		this.transition = args.transition||fx.linear();
		this.duration = args.duration||1000;
		this.framerate = args.framerate||36;
		this.endFunc = args.onComplete||function(){};
		this.startTime = (new Date()).getTime();
		this.startX = parseInt(this.obj.style.left.split('px')[0]);
		this.endX = args.x;
		var _self = this;
		this.timer = setInterval(function() { _self.increase(); }, this.framerate);
	},
	increase:function() {
		var time  = (new Date()).getTime();
		if (time >= (this.duration+this.startTime)) {
			this.clearTimer();
			this.obj.style.left = this.endX + 'px';
			this.endFunc();
		} else {
			var pos = (time - this.startTime) / (this.duration);
			this.obj.style.left = this.transition(pos) * (this.endX-this.startX) + this.startX + 'px';
		}
	}
}

var fx = {};
fx.linear = function(pos){ return pos; }
fx.expoIn = function(pos){ return Math.pow(2, 10 * (pos - 1)); }
fx.expoOut = function(pos){ return (-Math.pow(2, -10 * pos) + 1); }

// Tween ---------------------------------------

function Tween(inivalue, endvalue, duration){
	this._duration = duration;

	this._inicial = inivalue;
	this._final = endvalue;
}
Tween.prototype.init = function(){
	var _self = this;

	this._iniTime = new Date().getTime();
	this._interval = setInterval(function(){
		_self.setAnimation();
	}, 5);
}
Tween.prototype.setAnimation = function(){
	var curTime = new Date().getTime()-this._iniTime;

	if (curTime >= this._duration){
		 this.onEndAnimation(this._final);
		 clearInterval(this._interval);
		 return;
	}
	this.onAnimation(this.easingEquation(curTime, this._inicial, parseInt(this._final-this._inicial), this._duration));
}
Tween.prototype.easingEquation = function(t,b,c,d,a,p)
{
	return c/2 * ( Math.sin( Math.PI * (t/d-0.5) ) + 1 ) + b;
}
Tween.prototype.bounceEquation = function(t,b,c,d,a,p)
{
 	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}
Tween.prototype.elasticEquation = function(t,b,c,d,a,p)
{
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
}


// Inicializacao Busca -------------------------

function filtroDataAno(ano,mes,dia){
	var meses = calendarioA._m_array;
	if(calendarioA._year!=calendarioB._year){
		filtroMesCombo(0,meses);
		calendarioB.changeMonth(0);
	}else{
		filtroMesCombo(calendarioA._month,meses);
		var cbMM = document.getElementById("comboMesB")
		calendarioB.changeMonth(parseInt(cbMM.options[cbMM.selectedIndex].value));
		calendarioB.disableDays(calendarioA._year,calendarioA._month,calendarioA.diaSel);
		calendarioB.show();
	}
}

function filtroDataDia(ano,mes,dia,selecionado){
	var meses = calendarioA._m_array;
	filtroMesCombo(mes,meses);
	var cbAnoA = document.getElementById("comboAno");
	var anos = [];
	for(var i = cbAnoA.selectedIndex, x = cbAnoA.options.length; i<x;i++){
		anos.push(cbAnoA.options[i].value);
	}
	filtroAnoCombo(ano,anos);
	calendarioB.changeYear(ano);
	calendarioB.changeMonth(mes);
	calendarioB.show(1);
	var anoSel = document.getElementById("dataCLB").value.split("/")[2]||0;
	if( ( (dia>calendarioB.diaSel && calendarioA._month>=calendarioB._month && calendarioA._year>=anoSel) ||
			(calendarioA._month>calendarioB._month && calendarioA._year>=anoSel)	) && selecionado==1 ){
		document.getElementById("dataCLB").value = 'dd/mm/aaaa';
		calendarioB.show();
	}
	if(dia!=undefined){
		calendarioB.disableDays(ano,mes,dia);
	}
	if(document.getElementById("dataCLB").value=='dd/mm/aaaa'){
		calendarioB.show();
	}
}

function filtroMesCombo(mes,meses){
	var cb = document.getElementById("comboMesB");
	for(var i = 0, x = cb.options.length; i<x; i++){
		cb.options[0] = null;
	}
	for(var i = mes,id=0; i<meses.length; i++,id++){
		cb.options[id] = new Option(meses[i], i);
	}
}

function filtroAnoCombo(ano,anos){
	var cbAno = document.getElementById("comboAnoB");
	for(var i = 0, x = cbAno.options.length; i<x; i++){
		cbAno.options[0] = null;
	}
	for(var i=0; i<anos.length; i++){
		cbAno.options[i] = new Option(anos[i], anos[i]);
	}
}

function montaFiltroData(){
 var dataIni = document.frmBusca.dataA.value;
 var dataFim = document.frmBusca.dataB.value;
 var prefixFiltro = "dataatualizacao:";
 var horaIni  = "T00:00:00Z";
 var horaFim  = "T23:59:59Z";
 var filtro = "";

 if(dataIni != "dd/mm/aaaa"){
   dataIni = fomataStrDateISO(dataIni);
   if(dataFim != "dd/mm/aaaa"){
     dataFim = fomataStrDateISO(dataFim);
     filtro = prefixFiltro + "[" + dataIni + horaIni +";" + dataFim + horaFim + "]";
   }else{
     filtro = prefixFiltro + "[" + dataIni + horaIni +";" + dataIni + horaFim + "]";
   }

 }

 return filtro;
}

function fomataStrDateISO(data){
  //data = data.split("/").join("-");
  var dia = data.substring(0,2);
  var mes = data.substring(3,5);
  var ano = data.substring(6,10);

  var dataIso = ano + "-" + mes + "-" + dia;

  return dataIso;
}

function getDataHojeFormatadaBusca(){
 var dataHoje = new Date();
 var dia = dataHoje.getDate();
 var mes = dataHoje.getMonth();
 var ano = dataHoje.getFullYear();

 if(dia < 10){
   dia = "0" + dia;
 }
 if(mes < 10){
   mes = "0" + mes;
 }

 var dataFormatada = ano + "-" + mes + "-" + dia;

 return dataFormatada;
}

function mostraFiltro(obj) {
	if(!obj) obj = $("filtro");
	showFiltro(obj.checked);
}


function showFiltro(isShow){
	if(isShow) {
		buscar.animation( {
			onComplete: function() { $('box-busca').className = 'completo' },
			x: 731,
			duration: 452,
			transition: fx.expoOut
		} );
	} else {
		calendarioA.show(1);
		calendarioB.show(1);
		$('box-busca').className = 'simples';
		buscar.animation( {
			x: 452,
			duration: 731,
			transition: fx.expoOut
		} );
	}
}

function setSelection(field,old){
	field.select();
	document.getElementById(old).blur();
}

var buscar;
var calendarioA;
var calendarioB;
var urlBusca;

function inicializarBusca(ano,url)
{
	var c_dtHoje = new Date();
	var c_mesAt = c_dtHoje.getMonth();
	var c_anoAt = c_dtHoje.getFullYear();

	urlBusca = url;
	buscar = new glbLib.moveTo('coluna-botao');

	sMesA = document.getElementById("comboMes");
	sMesB = document.getElementById("comboMesB");

	var meses = new Array("Janeiro", "Fevereiro", "Mar\u00e7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
	for(var i in meses)
	{
		populaSelect(sMesA, meses[i], i);
		populaSelect(sMesB, meses[i], i);
	}

	sAnoA = document.getElementById("comboAno");
	sAnoB = document.getElementById("comboAnoB");

	for(i=ano;i<=c_dtHoje.getFullYear();i++)
	{
		populaSelect(sAnoA, i, i);
		populaSelect(sAnoB, i, i);
	}

	calendarioA = new Calendario(c_anoAt,c_mesAt,"tableContainerA","dataCLA");
	calendarioA.setChangeDia(filtroDataDia);

	calendarioB = new Calendario(c_anoAt,c_mesAt,"tableContainerB","dataCLB");
	calendarioB.setChangeAno(filtroDataAno);


	//selecionando os combos com o mes atual//
	document.getElementById("comboMesB").options[c_mesAt].selected="selected";
	document.getElementById("comboMes").options[c_mesAt].selected="selected";

	calendarioA.show(0);
	calendarioB.show(0);

	document.getElementById("dataCLA").value = 'dd/mm/aaaa';
	document.getElementById("dataCLB").value = 'dd/mm/aaaa';
}

function onLoadEvent(obj,str) {
	if (window.addEventListener) {
		window.addEventListener("load", function () { obj[str](); } , false);
	} else if (document.addEventListener) {
		document.addEventListener("load", function () { obj[str](); } , false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", function () { obj[str](); } );
	} else if (typeof window.onload == "function") {
		var fnOld = window.onload;
		window.onload = function(){
			fnOld();
			obj[str]();
		}
	} else {
		window.onload = function () { obj[str](); }
	}
}

function checkCaracteresEspeciaisBusca(str){
  var especialChars = "!@#$%^&*()=+-[]\\\;,./{}|\":<>?_";
  for (var i = 0; i < str.length; i++) {
    if (especialChars.indexOf(str.charAt(i)) != -1) {
  	   return false;
    }
  }
  return true;
}

function maisOuMenosFiltros(l,mais)
{
	ls = l.parentNode.getElementsByTagName("li");

	for( i=0; i<ls.length; i++ )
	{
		ml = ls[i];

		if(!ml) break;
		if(!ml.style) break;

		if( ml.className=="mais" ) ml.style.display = mais?"none":"block";
		else if( ml.className=="menos" ) ml.style.display = mais?"block":"none";
		else if( ml.className=="hide" )  ml.style.display = mais?"block":"none";
	}
}

function ordenarPor(ordem){
	document.frmBusca.o.value=ordem;
}

function buscarPorConteudoAdulto(buscarAdulto){
	if(buscarAdulto){
		document.frmBusca.a.value ='s';
	}
	else{
		document.frmBusca.a.value ='';
	}
}

function buscarPorTexto(texto){
	limpaFiltros();
	document.frmBusca.b.value = texto;
	filtrar();
}

function adicionaFiltro(novoFiltro){

	filtro = novoFiltro.replace(/,/g, "%5C%5C%5C%5C,");

	if(document.frmBusca.f.value){
		document.frmBusca.f.value += ','+filtro;
	}
	else{
		document.frmBusca.f.value=filtro;
	}

	document.frmBusca.p.value='';
}

function filtrar(s)
{
	if(!s) url = urlBusca;
	else url = s;
	url = url + '?';
	if(document.frmBusca.b.value != "")
	{
		url = url + ("b=" + document.frmBusca.b.value) + '&';
	}
	if(document.frmBusca.p.value != "")
	{
		url = url + ("p=" + document.frmBusca.p.value) + '&';
	}
	document.frmBusca.f.value = document.frmBusca.f.value.replace(/\\/g, "%5C%5C");
	if(document.frmBusca.f.value != "")
	{
		var filtros = document.frmBusca.f.value;
		filtros = filtros.replace(/:/g, "%3A");
		filtros = filtros.replace(/\[/g, "%5B");
		filtros = filtros.replace(/;/g, "%3B");
		url = url + ("f=" + filtros.replace(/]/g, "%5D")) + '&';
	}
	if(document.frmBusca.o.value != "")
	{
		url = url + ("o=" + document.frmBusca.o.value) + '&';
	}
	if(document.frmBusca.a.value != "")
	{
		url = url + ("a=" + document.frmBusca.a.value) + '&';
	}
	window.location.href = url.substring(0, url.length - 1);
}

function submeteBusca(url)
{
  	var query = document.frmBusca.b.value;
	if (trim(query).length < 2)
	{
		alert("O texto da busca deve conter no m\u00ednimo duas letras.");
	}
	else if(checkCaracteresEspeciaisBusca(query))
	{
		query = query.replace(/(")/gi, "");
		query = query.replace(/(')/gi, "´");
		query = query.replace(/(!)/gi, "");

		document.frmBusca.b.value = query;
		if(document.frmBusca.filtro.checked)
		{
			document.frmBusca.f.value = montaFiltroData();
		}
		else
		{
			document.frmBusca.f.value = '';
		}
		filtrar(url);
		return false;
    }
    else
    {
        alert("O texto da busca possui caracter (es) inv\u00e1lido(s).\n Por favor remova-os e tente novamente.");
    }
}

function limpaFiltros(){
	document.frmBusca.f.value='';
	document.frmBusca.p.value='';
	document.frmBusca.o.value='';
}

function pagina(n){
	document.frmBusca.p.value=n;
}

function removeFiltro(filtroRemovido){

	var filtros = document.frmBusca.f.value.replace(/\\\\,/g, "%5C%5C%5C%5C");

	meusFiltros = filtros.split(",");

	for(i=0;i<meusFiltros.length;i++) meusFiltros[i] = meusFiltros[i].replace(/%5C%5C%5C%5C/g, "%5C%5C%5C%5C,");

	removido = '';
	for(i=0;i<meusFiltros.length;i++){

		if(meusFiltros[i].toLowerCase()!=filtroRemovido.replace(/,/g, "%5C%5C%5C%5C,").toLowerCase()){
			if(removido!=''){
				removido += ','+meusFiltros[i];
			}else{
				removido = meusFiltros[i];
			}
		}
	}
	document.frmBusca.f.value=removido;
}

function substituiPorSimbolo(s)
{
	s = s.replace(/&lt;/, "<");
	s = s.replace(/&gt;/, ">");
	s = s.replace(/&amp;/, "&");

	return s;
}

// Calendario ----------------------------------

var Calendario = function(year,month,containerDays,field){
	this._m_array = ["Janeiro", "Fevereiro", "Mar\u00E7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	this._d_array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	this._month = month;
	this._year = year;
	this._containerDays = document.getElementById(containerDays);
	this._TDItens = [];
	this.createElements();
	this._callBackMes = null;
	this._callBackAno = null;
	this._callBackDia = null;
	this._visible = false;
	this.diaSel = 0;
	this.diaFitroSel = 0;
	this.mesFitroSel = 0;
	this.anoFitroSel = 0;
	this._field = document.getElementById(field);
};
Calendario.prototype = {

	changeMonth:function(month)
	{
		this._month = parseInt(month);
		this.fillDaysCalendar();
		try{
			this._callBackMes(this._year,this._month);
		}catch(e){}
	},
	changeYear:function(year)
	{
		this._year = parseInt(year);
		this.fillDaysCalendar();
		try{
			this._callBackMes(this._year,this._month);
		}catch(e){}
		try{
			this._callBackAno(this._year,this._month);
		}catch(e){}
	},
	removeAll:function()
	{
		for(var i = 0, x = this._TDItens.length; i < x; i++){
			this._TDItens[i].innerHTML = '-';
			this._TDItens[i].className = '';
		}
	},
	fillDaysCalendar:function()
	{
		this.show();
		this.removeAll();
		this._dt = new Date(this._year, this._month, 1, 0, 0, 0, 0);
		this._iniDay = this._dt.getDay();
		var today = new Date();
		var dataAtual = today.getDate();
		var mesAtual = today.getMonth();
		var anoAtual = today.getFullYear();
		for(var i = 1, x = this._d_array[this._month], p = this._iniDay; i <= x; i++, p++ ){
			this._TDItens[p].innerHTML = '';
			var linkC =  this.createLink(i);
			if ( ( i > dataAtual && this._month==mesAtual && this._year==anoAtual ) || ( this._month>mesAtual && this._year>=anoAtual ) ||
				( i<this.diaFitroSel && this.mesFitroSel==this._month && this.anoFitroSel==this._year ) ){
				this._TDItens[p].className = '';
				this._TDItens[p].innerHTML = i;

			}else{
				this._TDItens[p].className = '';
				this._TDItens[p].appendChild(linkC);

			}
			if(i==dataAtual && this._month==mesAtual && this._year==anoAtual){
				this._TDItens[p].className = 'diaAtual';

			}
		}

	},
	disableDays:function(ano,mes,dia)
	{
		this.diaFitroSel = dia;
		this.mesFitroSel = mes;
		this.anoFitroSel = ano;

		for(var i = (parseInt(this._iniDay)+parseInt(dia-1))-1; i>=this._iniDay; i--){
			this._TDItens[i].className = '';
			var d = (i-(parseInt(this._iniDay)-1))
			this._TDItens[i].innerHTML = d>9 ? d : '0'+d;
		}
	},
	setChangeMes:function(cb)
	{
		this._callBackMes = cb;
	},
	createTR:function(value)
	{
		var $tr = document.createElement("tr");
		return $tr;
	},
	createTD:function(label,className)
	{
		var $td = document.createElement("td");
		$td.innerHTML = label.toString();
		return $td;
	},
	createLink:function(value)
	{
		var $a = document.createElement("a");
		$a.href = "#";
		$a.innerHTML = value<10 ? '0'+value : value;
		var self = this;
		$a.onclick = function(){
			var dia = value<10 ? '0'+value : value;
			self.diaSel = value;
			var mes = (self._month+1)<10 ? '0'+(self._month+1) : self._month+1;
			var ano = self._year;
			try{
				self._callBackDia(ano,self._month,value,1);
			}catch(e){}
			self.daySelected(dia+'/'+mes+'/'+ano);
			return false;
		}
		return $a;
	},
	setChangeAno:function(cb)
	{
		this._callBackAno = cb;
	},
	setChangeDia:function(cb)
	{
		this._callBackDia = cb;
	},
	show:function(bln)
	{
		this._containerDays.parentNode.parentNode.style.display = bln!=undefined ? 'none' : 'block';
		this._visible = bln!=undefined ? 0 : 1;
	},
	daySelected:function(value){
		this._field.value = value;
		try{
			this._containerDays.parentNode.parentNode.style.display = 'none';
		}catch(e){}
	},
	createElements:function()
	{
		var trAt = this.createTR(0);
		var itensTR = [];
		var tbody = document.createElement("tbody");
		for (var c = 1, i = 1, x = 43, l = 0; i <= x; i++, c++) {
			if(c == 8) {
				c = 1, l++;
				tbody.appendChild(trAt);
				trAt = this.createTR(l);
			}
			var tdAt = this.createTD('');
			trAt.appendChild(tdAt);
			this._TDItens.push(tdAt);
		}
		this._containerDays.appendChild(tbody);
		this.fillDaysCalendar();
	}
}

// Menu ----------------------------------------

function getWindowSize() {
	var a = {};
	if (self.innerHeight) {
		a.w = self.innerWidth;
		a.h = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		a.w = document.documentElement.clientWidth;
		a.h = document.documentElement.clientHeight;
	} else if (document.body) {
		a.w = document.body.clientWidth;
		a.h = document.body.clientHeight;
	}
	return a;
}

function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY){
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else {
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var a = getWindowSize();
	if(yScroll < a.h) pageHeight = a.h;
	else pageHeight = yScroll;
	if(xScroll < a.w) pageWidth = a.w;
	else pageWidth = xScroll;
	arrayPageSize = {pageWidth:pageWidth,pageHeight:pageHeight,windowWidth:a.w,windowHeight:a.h}
	return arrayPageSize;
}

function getPageScroll(){
	var yScroll;
	if (self.pageYOffset) yScroll = self.pageYOffset;
	else if (document.documentElement && document.documentElement.scrollTop) yScroll = document.documentElement.scrollTop;
	else if (document.body) yScroll = document.body.scrollTop;
	arrayPageScroll = {yScroll:yScroll};
	return arrayPageScroll;
}

function fechaPop(obj) {
	abrePopVisibility('SELECT','visible');
	abrePopVisibility('OBJECT','visible');
	abrePopVisibility('IFRAME','visible');
	try {
		document.body.removeChild($('popZoom'));
		document.body.removeChild($('popSombra'));
	} catch(e) {}
}

function abrePop(params) {
	var url = params.popUrl;
	var popClass = params.popClass;
	var pageSize = getPageSize();
	var pageScroll = getPageScroll();
	try {
		document.body.removeChild($('popZoom'));
		document.body.removeChild($('popSombra'));
	} catch(e) {}
	var divContainer = document.createElement('div');
	divContainer.style.visibility = 'hidden';
	divContainer.id = 'popZoom';
	divContainer.className = 'popZoom';
	divContainer.style.height = (pageSize.pageHeight + 'px');
	var divSombra = document.createElement('div');
	divSombra.id = 'popSombra';
	divSombra.className = 'popSombra';
	divSombra.style.height = (pageSize.pageHeight + 'px');
	divSombra.style.backgroundPosition = 'center ' + (pageScroll.yScroll + ((pageSize.windowHeight - 100)/2)) + 'px';
	document.body.appendChild(divSombra);
	document.body.appendChild(divContainer);
	var pop = new popObj(url,divContainer,divSombra,popClass);
	abrePopVisibility('SELECT','hidden');
	abrePopVisibility('OBJECT','hidden');
	abrePopVisibility('IFRAME','hidden');
}
function abrePopVisibility(tag,s) {
	var selects = document.getElementsByTagName(tag);
	for(k=0;k<selects.length;k++){
		selects[k].style.visibility = s;
	}
}

function popObj(url,divContainer,divSombra,popClass) {
	var self = this;
	this.xml = new xmlObj( {
		url: url,
		obj: self,
		func: 'show',
		args: { divContainer:divContainer,divSombra:divSombra,popClass:popClass }
	} );
}

popObj.prototype.show = function(args) {
	var htm = args.responseText;
	var divContainer = args.divContainer;
	var divSombra = args.divSombra;
	divContainer.innerHTML = htm;
	var popClass = args.popClass;
	var box = false;
	var tags = divContainer.getElementsByTagName('div');
	for(var i=0,len=tags.length;i<len;i++) if(tags[i].className.indexOf(popClass)>-1) box = tags[i];
	if(!box) {
		fechaPop(divContainer);
		return;
	}
	var largura = box.offsetWidth;
	var altura = box.offsetHeight;
	var pageSize = getPageSize();
	var pageScroll = getPageScroll();
	var boxTop = pageScroll.yScroll + ((pageSize.windowHeight - altura) / 2);
	var boxLeft = ((pageSize.pageWidth - largura) / 2);
	box.style.position = 'absolute';
	box.style.top = (boxTop < 0) ? "0px" : boxTop + "px";
	box.style.left = (boxLeft < 0) ? "0px" : boxLeft + "px";
	divContainer.style.visibility = 'visible';
	divSombra.style.backgroundImage = 'none';
}

// Enviar Amigo --------------------------------

function EnviarAmigo(c) {
	this.config = c;
}
EnviarAmigo.prototype = {
	exibirEsconder:function() {
		var t = $(this.config.tabMudar);
		if( !t || t.className=='off' ) {
			this.exibir();
		} else {
			this.esconder();
		}
	},
	exibir:function() {
		this.limpaErros();
		this.limpaCampos();
		setClass(this.config.tabMudar,'on');
		hide(this.config.divSucesso);
		display(this.config.formExibir);
		display(this.config.div);
		rm("enviar-carregando");
		this.poeFocus();
	},
	esconder:function() {
		setClass(this.config.tabMudar,'off');
		hide(this.config.formExibir);
		hide(this.config.div);
	},
	poeFocus:function() {
		try{ $("nomeRemetente").focus(); return; } catch(e) {}
		try{ $("emailRemetente").focus(); return; } catch(e) {}
	},
	verificaEmail:function(email) {
		var reEmail = new RegExp("^[\\w!#$%&'*+\\/=?^`{|}~-]+(\\.[\\w!#$%&'*+\\/=?^`{|}~-]+)*@(([\\w-]+\\.)+[A-Za-z]{2,6}|\\[\\d{1,3}(\\.\\d{1,3}){3}\\])$");
		return reEmail.test(email);
	},
	limpaCampos:function() {
		if( $("nomeRemetente") ) $("nomeRemetente").value = "";
		if( $("comentario") ) $("comentario").value = "";
		$("emailRemetente").value = "";
		$("emailDestinatario").value = "";
	},
	limpaErros:function() {
		if( $(this.config.divErro) ) $(this.config.divErro).className = "";
		this.removeErro("erroNomeRemetente");
		this.removeErro("erroEmailRemetente");
		this.removeErro("erroEmailDestinatario");
		display("labelNomeRemetente");
		display("labelEmailRemetente");
		display("labelEmailDestinatario");
		if( $("nomeRemetente") ) $("nomeRemetente").parentNode.className = trim($("nomeRemetente").parentNode.className.replace(this.config.cssErro,""));
		$("emailRemetente").parentNode.className = trim($("emailRemetente").parentNode.className.replace(this.config.cssErro,""));
		$("emailDestinatario").parentNode.className = trim($("emailDestinatario").parentNode.className.replace(this.config.cssErro,""));
	},
	mostraErro:function(idCampo, texto) {
		if( $("lista-box-erro-form") ) { 
			var li = document.createElement("li");
			li.id = idCampo;
			li.innerHTML = texto;
			$("lista-box-erro-form").appendChild(li);
		} else {
			display(idCampo);
		}
	},
	removeErro:function(idCampo) {
		if($("lista-box-erro-form")) {
			rm(idCampo);
		} else {
			hide(idCampo);
		}
	},
	validar:function(f) {
		var focar = null;
		this.limpaErros();

		if( f.nomeRemetente && f.nomeRemetente.value == "" ) {
			if( focar == null ) focar = f.nomeRemetente;
			f.nomeRemetente.parentNode.className += " " + this.config.cssErro;
			this.mostraErro("erroNomeRemetente", "Seu nome");
			hide("labelNomeRemetente");
		}
		if( f.emailRemetente.value == "" || !this.verificaEmail(f.emailRemetente.value) ) {
			if( focar == null ) focar = f.emailRemetente;
			f.emailRemetente.parentNode.className += " " + this.config.cssErro;
			this.mostraErro("erroEmailRemetente", "Seu email");
			hide("labelEmailRemetente");
		}

		var erroEmailDestinatario = false;

		var emailD = f.emailDestinatario.value.split(",");
		for (indice=0;indice<emailD.length;indice++){
			var maildestino = trim(emailD[indice]);
			if (!this.verificaEmail(maildestino)){
				erroEmailDestinatario = true;
				break;
			}
		}

		if( erroEmailDestinatario || f.emailDestinatario.value == "" ) {
			if( focar == null ) focar = f.emailDestinatario;
			f.emailDestinatario.parentNode.className += " " + this.config.cssErro;
			this.mostraErro("erroEmailDestinatario", "Enviar para");
			hide("labelEmailDestinatario");
		}

		if( focar ) {
			focar.select();
			if( $(this.config.divErro) ) $(this.config.divErro).className += "on";
			return false;
		} else {
			return true;
		}
	},
	mostrarCarregando:function() {
		if( $(this.config.formExibir) ) {
			var d = document.createElement('div');
			d.id = 'enviar-carregando';
			d.className = 'carregando';
			$(this.config.formExibir).appendChild(d);
			hide(this.config.div);
		}
	},
	enviar:function(f) {
		if( !this.enviando ) {
			if( this.validar(f) ) {
				this.enviando = true;
				this.mostrarCarregando();
				if( !f.comentario ) return this.enviarMetodoGET(f); //POG - por causa do cache
				return this.enviarMetodoPOST(f);
			}
		}
		return false;
	},
	enviarMetodoPOST:function(f) {
		var self = this;
		var obj = {
			obj: self,
			func: 'loadHtmlEnviar',
			onError: 'loadErro',
			args: []
		}
		var meuIframe = new IframeEmuleAjax(this.config.iframe,obj);
		$("form-envie-amigo").target = meuIframe.id;
		$("form-envie-amigo").action = this.config.urlEnviar;
		return true;
	},
	enviarMetodoGET:function(f) {
		var url = this.config.urlEnviar + "?1=1";
		for( var i=0; i<f.elements.length; i++ ) {
			if( f.elements[i].tagName == 'INPUT' && (f.elements[i].type == 'text'||f.elements[i].type == 'hidden') && f.elements[i].value != "" ) {
				url += "&" + f.elements[i].name + "=" + encodeURIComponent(f.elements[i].value);
			}
		}
		var self = this;
		var obj = {
			url: url,
			obj: self,
			func: 'loadHtmlEnviar',
			onError: 'loadErro',
			args: []
		}
		new IframeEmuleAjax(null,obj);
		return false;
	},
	loadHtmlEnviar:function(r) {
		if( trim(r.responseText)=="OK" ) {
			this.exibirSucesso();
		} else {
			alert(r.responseText);
		}
		this.enviando = false;
	},
	loadErro:function(e) {
		this.enviando = false;
		rm("enviar-carregando");
		display(this.config.div);
		alert("N\u00e4o foi poss\u00edvel enviar o e-mail: \n" + e + " - " + e.message);
	},
	exibirSucesso:function() {
		display(this.config.divSucesso);
		if( !this.config.manterFormularioAtras )
			hide(this.config.div);
		rm("enviar-carregando");
	},
	contaCaracter:function(opt_boxcontado, opt_contarcorpo, opt_valormax) {
	  var boxcontado = opt_boxcontado ? opt_boxcontado : "contado";
	  var contarcorpo = opt_contarcorpo ? opt_contarcorpo : "contador";
	  var valormax = opt_valormax ? opt_valormax : 150;
		
	  var field = document.getElementById(boxcontado);
	  if (field && field.value.length >= valormax) {
		field.value = field.value.substring(0, valormax);
	  }
	  var txtField = document.getElementById(contarcorpo);
	  if (txtField) {  
		
		txtField.innerHTML = opt_valormax - field.value.length;
	  }
	}
}

// Funcoes --------------------------------------

function tenta(funcao) {
	try { funcao(); } catch(e) {};
}

function acertaFrameFlash() {
	tenta( function() { if( frames[embed.id].creator.isFlash()) embed.acertaFrameFlash(); } );
	tenta( function() { if( frames[embed.id].creator.isH264()) embed.acertaFrameH264(); } );
}

function leiaMais(obj) {
	obj.parentNode.parentNode.className+= ' leiamaisOn';
}

function leiaMenos(obj) {
	obj.parentNode.parentNode.className = obj.parentNode.parentNode.className.split('leiamaisOn')[0];
}

function mostraAjuda(n) {
	document.getElementById('ajuda'+n).className = 'ajuda ajudaOn';
}

function escondeAjuda(n) {
	document.getElementById('ajuda'+n).className = 'ajuda ajudaOff';
}

function openPositionedWindow(url, name, width, height, x, y, status, scrollbars, moreProperties, openerName) {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("mac") != -1 && agent.indexOf("msie") != -1 && (agent.indexOf("msie 4") != -1 || agent.indexOf("msie 5.0") != -1) ) {
	   height += (status) ? 17 : 2;
	}
	width += (scrollbars != '' && scrollbars != null && agent.indexOf("mac") == -1) ? 16 : 0;
	var properties = 'width=' + width + ',height=' + height + ',screenX=' + x + ',screenY=' + y + ',left=' + x + ',top=' + y + ((status) ? ',status' : '') + ',scrollbars' + ((scrollbars) ? '' : '=no') + ((moreProperties) ? ',' + moreProperties : '');
	var reference = openWindow(url, name, properties, openerName);
	return reference;
}

function openWindow(url, name, properties, openerName) {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf("msie") != -1 && parseInt(navigator.appVersion) == 4 && agent.indexOf("msie 5") == -1 && agent.indexOf("msie5") == -1 && agent.indexOf("win") != -1 && url.indexOf('http://') == 0) {
	   winReference = window.open('about:blank', name, properties);

	   setTimeout('if (winReference && !winReference.closed) winReference.location.replace("' + url + '")', 300);
	}
	else {
	   winReference = window.open(url, name, properties);
	}
	setTimeout('if (winReference && !winReference.closed) winReference.focus()', 200);
	if (openerName) self.name = openerName;
	return winReference;
}

function openCenteredWindow(url,name,width,height,status,scrollbars,moreProperties,openerName) {
	var x, y = 0;
	if (screen) {
		x = (screen.availWidth - width) / 2;
		y = (screen.availHeight - height) / 2;
	}
	if (!status) status = '';
	if (!openerName) openerName = '';
	var reference = openPositionedWindow(url, name, width, height, x, y, status, scrollbars, moreProperties, openerName);
	return reference;
}

var GMC_AJUDA = 'http://ajuda.globo.com/Ajuda/0,,9540,00.html';
var GMC_DICAS = '/Portal/videos/cda/dicas/glb_videos_dicasVerVideos.htm';

function ajudaPop() {
	openCenteredWindow(GMC_AJUDA,'popAjuda',560,425,0,0,'menubar=0,resizable=0,toolbar=0');
}

function dicasPop() {
	openCenteredWindow(GMC_DICAS,'dicasVideos',560,425,0,0,'menubar=0,resizable=0,toolbar=0');
}

function trim(s) {
	while (s.substring(0,1) == ' ') {
		s = s.substring(1,s.length);
	}
	while (s.substring(s.length-1,s.length) == ' ') {
		s = s.substring(0,s.length-1);
	}
	return s;
}

function populaSelect(selectElemento, texto, valor)
{
    var option = document.createElement('option');
    option.setAttribute('value', valor);
    option.value = valor;
    option.innerHTML = texto;
    option.selected = true;
    selectElemento.appendChild(option);
}

function adicionaBusca() {
	try {
		if( window.external ) {
			window.external.AddSearchProvider('http://' + window.location.hostname + '/Portal/gmc4/cda/busca/globovideo-opensearch.xml');
		} else {
			window.sidebar.addSearchEngine('http://' + window.location.hostname + '/Portal/gmc4/cda/busca/globovideo-firefox-search.src','http://' + window.location.hostname + '/Portal/videos/cda/img/busca-videos-opensearch.png','GloboVideos','png');
		}
	} catch(e) {
		alert("Seu navegador n\u00e3o possui o recurso que permite \nadicionar buscas r\u00e1pidas.");
	}
	return false;
}


// Banner -------------

function BannerExpand(banner,hini,hend,isFlash,tempoBanner){
	this.oldOpen = "";
	this.estado = true;
	this.onBannerAnimation = false;
	this.hini = hini;
	this.hend = hend;
	this.banner = banner;
	this.easingEquation = "";
	this.tempobanner = tempoBanner!=undefined ? tempoBanner*1000 : 20000;
	this.isFlash = isFlash;
	this.init();
}

BannerExpand.prototype.podeAnimacao = function() {
	if( this.isFlash ) return true;
	var isFirefox = navigator.userAgent.indexOf("Firefox")!=-1;
	var animacao = !isFirefox;
	if (isFirefox) {
		for ( var i in  navigator.plugins ) {
			var n = navigator.plugins[i].filename;
			if(n && n.indexOf("np-mswmp") != -1 ) {
				return true;
			}
		}
	}
	return animacao;
}

BannerExpand.prototype.init = function(){
	if( this.podeAnimacao() ) {
		var _self = this;
		var timeClose = setTimeout(function () {if(_self.onBannerAnimation) return;if(_self.estado)_self.close(_self.banner)}, _self.tempobanner);
	}
}

BannerExpand.prototype.changeEstado = function(){
	if(this.onBannerAnimation) return;
	if(this.estado) this.close(this.banner); else this.open(this.banner);
}

BannerExpand.prototype.close = function(){
	var _self = this;
	this.estado = false;
	this.onBannerAnimation = true;

	var a = new Tween(this.hini, this.hend, 1000);
	//a.easingEquation = a.bounceEquation;

	a.onAnimation = function(value){
		$(_self.banner).style.height = Math.round(value)+"px";
		$("box-publicidade-video").style.padding = "4px 14px 1px 14px";
		$("titulo-publicidade").innerHTML = "ver publicidade novamente";
		$("bannerDefault").innerHTML = "[ + ]";

		var divs = $("bannerVideo").getElementsByTagName("OBJECT");
		if( divs && divs.length>0 ) {
			divs[0].style.display = "none";
		}

		if(_self.oldOpen!="")document.getElementById(_self.oldOpen).style.height = _self.hend-Math.round(value);
	}
	a.onEndAnimation = function(value){
		this.onAnimation(value);
		_self.onBannerAnimation = false;
	}
	a.init();
}

BannerExpand.prototype.open = function(tabs)
{
	var _self = this;
	this.estado = true;

	var a = new Tween(this.hend, this.hini, 1000);

	a.onAnimation = function(value){
		document.getElementById(_self.banner).style.height = Math.round(value)+"px";
	}
	a.onEndAnimation = function(value){
		$("box-publicidade-video").style.padding = "4px 14px 14px 14px";
		$("titulo-publicidade").innerHTML = "publicidade";
		$("bannerDefault").innerHTML = "[ - ]";

		var divs = $("bannerVideo").getElementsByTagName("OBJECT");
		if( divs && divs.length>0 ) {
			divs[0].style.display = "block";
		}

		this.onAnimation(value);
		//alert("aberto")
	}
	a.init();
}

//Propaganda ------------------
function OAS_exibiuPropaganda(id) {
	var html = $(id).innerHTML.toString().toUpperCase();
	if( html.indexOf("OBJECT")!=-1 || html.indexOf("EMBED")!=-1 || html.indexOf("IMG")!=-1 ) {
		return ( html.indexOf("DEFAULT/EMPTY.GIF")==-1 )
	} else {
		return false;
	}
}