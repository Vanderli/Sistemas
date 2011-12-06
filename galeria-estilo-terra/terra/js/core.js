try {
		
window.onerror = function(message, fileUrl, lineNumber){
	if(window.modMan){
		modMan.log.critical(
			'SyntaxError (detectado em escopo global)\n'+
			'Message  '+ message +'\n'+
			'File  '+ fileUrl +'\n'+
			'Line  '+ lineNumber
		);
	}
	return false;
}
	
var modMan = function($){
	//=-=-=-=-=-=-=-=-=-=-
	// Local variables
	//=-=-=-=-=-=-=-=-=-=-
	var details = {
		prdBaseDomain:"http://s2.trrsf.com.br/", // replaced, if not BR
		portalDir:"atm/",
		coreVersion:3,
		coreDirPath:'core/',
		lastUpdate:"2010",
		startupTime:new Date().getTime()
	}
	
	var globals = {}; // Stores section configs and shared observers
	
	
	// Error messages
	var errorMsgs = {
		defaultLNG:"pt",
		pt:{
			otherFrameworkFound:"modMan uses jQuery and cant work with other frameworks."
		},
		en:{
			otherFrameworkFound:"modMan uses jQuery and cant work with other frameworks."
		}
	}
	
	// Controlled Vocabulary
	var controlled = {
		defaultLNG:'pt',
		defaultRGN:'BR',
		LNG:{
			pt:{
				loading:"carregando"
			}
		},
		RGN:{
			BR:{
				portalURL:"http://www.itapecerica.sp.gov.br/"
			}
		}
	}
	
	var Hosts = [
		{ domainMatchEXP:/^.+\/(site\/br\/meu|gov)\/\d\//i, redirect:false, type:"DSV" }

	]
		
	/** 
	@updated 20100414-1140
	Base GMT extracted from: 
	- http://www.timeanddate.com/worldclock/ 
	- http://24timezones.com/
	
	* country codes expressed in ISO 3166-1 Alpha-2
	**/
	var Regions = {
		BR:{id:2, isoCode:"BR", lang:"pt", flag:"BRA", gmt:-180, domainMatchEXP:/\.?br[\.-]|pt-br|\.br\//i, portalURL:"http://www.itapecerica.sp.gov.br/", dst:{gmt:-120, startLocalTimeStamp:"2010", endLocalTimeStamp:"2010"}}
		
	}
	
	var Library = {
		modules:{
			baseDIR:"apps/",					
			modFeaturedPhotos:{ priority:2, scriptPath:"featured_photos/_js/modFeaturedPhotos.js", currentVersion:"20090526-1357" }
		},
		extensions:{
			baseDIR:"_js/",
			dateOBJ:{
				scriptPath:"helper.dateOBJ.js",
				description:"Possui métodos para converter datas entre diferentes GTMs."
			},
			arrayOBJ:{
				description:"Possui métodos para reorganizar arrays.",
				scriptPath:"helper.arrayOBJ.js",
				source:function(){
					// Retorna o próprio objeto array embaralhado
					Array.prototype.shuffle = function(){ for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); return this; }
				}
			},
			stringOBJ:{
				scriptPath:"helper.stringOBJ.js",
				description:"Possui métodos para tratar strings.",
				source:function(){
				
					/* 20090205-1907 */
					//=-=-=-=-=-=-=-=-
					// Função para eliminar caracteres brancos (espaços, tabulações, etc.)
					// no ínicio e fim de uma determinada string
					//=-=-=-=-=-=-=-=-
					String.prototype.trim = function(){
						return this.replace(/\s{2,}/g,' ').replace(/^\s*|\s*$/g,'');
					};

					//=-=-=-=-=-=-=-=-
					// Função para truncar o texto sem cortar palavras
					// n = número máximo de caracteres
					// c = elemento que indica uma string cortada (opcional - padrão: "...")
					//=-=-=-=-=-=-=-=-
					String.prototype.truncate = function(n,c){
						if (n==0) return this;
						var str =this.trim();
						c=c || "...";		
						// Ajusta a contagem em caracteres extendidos
						var ext = /&[^;\s]*;/g;
						if (str.match(ext)) {
							for(var no=0; no <str.match(ext).length;no++){
								n = n + (str.match(ext)[no].length -1);
							}
						}	
						//alert(str +'\n' + 'length: '+ str.length + 'limite: '+ n);
						if(str.length<=n){
							return str;
						}
						str=str.substr(0, n + 1);
						var p1=str.lastIndexOf(" ");
						var p2=str.lastIndexOf("\n");
						var p3=str.lastIndexOf("\t");
						var p4=str.lastIndexOf("\s");
						var pos=Math.max(p1, p2, p3, p4);
						if(pos>0){
							str=str.substr(0, pos);
						}
						str=str.trim();
						return str+c;
					}

					//=-=-=-=-=-=-=-=-
					// Função responsável por separar os dígitos de milhar dos dígitos de centena com o ponto
					//=-=-=-=-=-=-=-=-
					String.prototype.milhar = Number.prototype.milhar = function(){
						var str = this + '';
						while (str.match(/^\d{4}/)){
							str = str.replace(/(\d)(\d{3}(\.|$))/, '$1.$2');
						}
						return str;
					}

					//=-=-=-=-=-=-=-=-
					// Função para setar o número de digitos de um número
					//=-=-=-=-=-=-=-=-
					String.prototype.digits = Number.prototype.digits = function(numDigits){
						var str = this.toString();
						while (str.length < numDigits)
							str = "0"+str;
						return str;
					}
				
					return undefined;
				}
			},
			jprint:{
				scriptPath:"jquery.jprint.js",
				description:"Imprime o conteúdo de uma Layer"
			},
			zoomimagethumb:{
				description:"Cria efeito de layer sobreposta em mouse-over.",
				scriptPath:"jquery.zoomimagethumb.js",
				source:function(){


						$.fn.extend({

							/*
							 * PARAMETERS
							 * - action (hide = 0 / show = 1)
							 */
							zoomImageThumb: function(action) {

								var configs = ({
									animateDuration: 200 // Milliseconds
								});
							
								obj = $(this);
								objZoom = obj.find(".ctn-zoom");
								containerobjZoom = obj.parent();

								if (action == 1) { // Show
									if (objZoom.css("display") == "none") {
										containerobjZoom.find("li").css("z-index","1");
										containerobjZoom.find(".ctn-zoom").hide();
										obj.css("z-index","10");
										objZoom.fadeIn(configs.animateDuration, function() {
											obj.css("z-index","10");
										});
									}
								} else { // Hide
									objZoom.fadeOut(configs.animateDuration);
									containerobjZoom.find("li").css("z-index","1");
								}

							}
						});
					
					return undefined;
				}
			},
			inputs:{
				scriptPath:"jquery.checkbox.radiobutton.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what",
				source:function(){
					$.extend({

						// Checkbox radiobutton replace
						checkboxRadiobutton: function(e) {								
							/* Radio replace */
							var rdoReplace = typeof(e) == "undefined" ? $("input:radio.chk-rdo-replace:not(.replaced)") : $(e).find("input:radio.chk-rdo-replace:not(.replaced)");

							rdoReplace.each(function() {
								$(this).addClass("replaced");
								$(this).css("opacity","0");
								$(this).css("display","none");
								$(this).before($(this).attr("checked") ? "<span class='rdo-replace rdo-checked"+($(this).attr("disabled") ? "-disabled" : "")+"'>Radio</span>" : "<span class='rdo-replace"+($(this).attr("disabled") ? " rdo-disabled" : "")+"'>Radio</span>");
								$(this).prev().click(function() {
									$(this).next().attr("checked","checked");
									$(this).next().change();
								});

								$(this).change(function() {
									if (!$(this).attr("disabled"))
										rdoClick($(this).attr("name"));
								});

								// IE Fix
								$(this).click(function() {
									rdoReplace.change();
								});
							});

							function rdoClick(name) {
								$("input:radio.chk-rdo-replace[name='"+name+"']").each(function() {
									if ($(this).attr("checked")) {
										// Check
										$(this).prev().addClass("rdo-checked");
									} else {
										// Uncheck
										$(this).prev().removeClass("rdo-checked").removeClass("rdo-checked-disabled");
										if ($(this).attr("disabled")) {
											$(this).prev().addClass("rdo-disabled");
										}
									}
								});
							}
							/* // Radio replace */


							/* Checkbox replace */
							var chkReplace = typeof(e) == "undefined" ? $("input:checkbox.chk-rdo-replace:not(.replaced)") : $(e).find("input:checkbox.chk-rdo-replace:not(.replaced)");

							chkReplace.css("opacity","0");
							chkReplace.css("display","none");
							chkReplace.each(function() {
								$(this).addClass("replaced");

								$("label[for='"+$(this).attr("id")+"']").removeAttr("for");
								if ($(this).attr("checked")) {
									$(this).before("<span class='chk-replace chk-checked"+($(this).attr("disabled") ? "-disabled" : "")+"'>Checkbox</span>");
								} else {
									$(this).before("<span class='chk-replace"+($(this).attr("disabled") ? " chk-disabled" : "")+"'>Checkbox</span>");
								}
							});

							$(".chk-replace, input:checkbox + label").click(function() {
								// objCheckbox
								var objCheckbox = null;
								if ($(this).is("label")) {
									objCheckbox = $(this).prev();
								} else {
									objCheckbox = $(this).next();
								}
								if (objCheckbox.attr("disabled")) return;

								if (objCheckbox.attr("checked")) {
									objCheckbox.removeAttr("checked");
									objCheckbox.prev().removeClass("chk-checked");
								} else {
									objCheckbox.attr("checked","checked");
									objCheckbox.prev().addClass("chk-checked");
								}
							});
							/* // Checkbox replace */
						}
					});

				}
			},
			jcarousel_lite:{
				scriptPath:"jquery.jcarousel_lite.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			elementposition:{
				scriptPath:"jquery.elementposition.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			clickout:{
				scriptPath:"jquery.clickout.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			combobox:{
				scriptPath:"jquery.combobox.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			jqdnr:{
				scriptPath:"jquery.jqdnr.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			scrolling:{
				scriptPath:"jquery.scrolling.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			tabs:{
				scriptPath:"jquery.tabs.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			wheel:{
				scriptPath:"jquery.wheel.js",
				description:"http://www.gmarwaha.com/jquery/jcarousellite/index.php#what"
			},
			thickbox:{
				scriptPath:"jquery.thickbox.js",
				description:"For modal pop ups"
			}
		},
		components:{
			combobox:{
				description:"Dropdown atomizado.",
				dependencies:{
					extensions:['jqdnr', 'elementposition', 'wheel', 'scrolling', 'clickout', 'combobox']
				},
				CONSTRUCTOR:function(selectorSTRING, callback, errorHandler){
					var $container = $(selectorSTRING);
					
					if(!$container.length) {
						var errorMsg = 'Não foi pessível encontrar uma tag SELECT com seletor <strong>'+selectorSTRING+'</strong>';
						if(errorHandler) errorHandler(errorMsg);
						return modMan.log.critical(errorMsg);
					}
					
					$container.combobox();
					$container.find('.scrolling').scrolling();
					$container.find('.cmb-value, .clickout').initClickOut();
					
					if(callback) callback();
				}
			},
			scrolling:{
				description:"Barra de scroll atomizada.",
				dependencies:{
					extensions:['jqdnr','elementposition', 'wheel', 'scrolling']
				},
				CONSTRUCTOR:function(selectorSTRING){
					var $container = $(selectorSTRING);
					
					if(!$container.length) {
						var errorMsg = 'Não foi possível encontrar um container com seletor <strong>'+selectorSTRING+'</strong>';
						if(errorHandler) errorHandler(errorMsg);
						return modMan.log.critical(errorMsg);
					}
					
					$container.scrolling();
				}
			},
			formElements:{
				description:"Barra de scroll atomizada.",
				dependencies:{
					extensions:['inputs']
				},
				CONSTRUCTOR:function(formElement, callback, errorHandler){
					var $form = $(formElement);
					if(!$form.length) {
						var errorMsg = 'Não foi possível encontrar uma tag FORM com seletor <strong>'+formElement+'</strong>';
						if(errorHandler) errorHandler(errorMsg);
						return modMan.log.critical(errorMsg);
					}
					
					$form.each(function(){
						(function($form){
							
							var inputs = $form.find('input.chk-rdo-replace');
							if(inputs.length){
								$.checkboxRadiobutton();
							}
							
							var selects = $form.find('select');
							if(selects.length){
								require.components([
									{
										id:'combobox',
										selector:'.combobox',
										success:function(){
											if(callback) callback();
										}
									}
								]);
								
							} else if(callback) callback();
							
							var formName = $form.attr('name') || ('#' + $form.attr('id')) || ('#' + $form.attr('id'));
							modMan.log.checkpoint('Interface redefinida para '+(inputs.length + selects.length)+' elemento(s) do formulário <strong>'+formName+'</strong>.');
						
						})($(this));
					
					});
					
				}
			}
		}
	}
	// Local variables //

	
	// Forçando renovação de cache no safari
	if($.browser.safari) $.useBrowserCache = false;
	
	
	//=-=-=-=-=-=-=-=-=-
	// Section configs
	//=-=-=-=-=-=-=-=-=-
	(function(){
		
		// Stage detection >>
		var stageType = "PRD",
			baseURL = function(){
			for (var i = 0, currentHost; currentHost = Hosts[i]; i++){
				var detected = currentHost.domainMatchEXP.exec(document.location);
				if(detected && currentHost.type) {
					stageType = currentHost.type;					
					return currentHost.redirect || detected[0].replace(/\/$/,'') + '/';
				}
			}
			
			if(pageCountry != "BR") details.prdBaseDomain = details.prdBaseDomain.replace(/\.br\/?/,'/');
			
			return details.prdBaseDomain + details.portalDir + details.coreVersion + '/';
		}();

		// Locale detection >>
		var autoDetectedCountryOBJ = function(){
			if(stageType == "PRD"){
				for (var isoCode in Regions){
					if(Regions[isoCode].domainMatchEXP && Regions[isoCode].domainMatchEXP.test(document.location)) {
						return Regions[isoCode];
					}
				}
			}
			// trying to extract country code from document lang attribute
			var documentLang = document.getElementsByTagName('html')[0].getAttribute('lang'),
				countryCodeExtractedFromDocument = (documentLang && documentLang.match(/\w\w/g)[1]) ? documentLang.match(/\w\w/g)[1].toUpperCase() : null;
			
			return Regions[countryCodeExtractedFromDocument] || Regions['BR'];
		}();

		var userAgentLocale = (navigator.language) ? navigator.language : navigator.userLanguage,
			userLang = userAgentLocale.split('-')[0].toLowerCase(),
			userCountry = typeof(userAgentLocale.split('-')[1]) != "undefined" ? userAgentLocale.split('-')[1].toUpperCase() : userAgentLocale.toUpperCase(),
			
			pageCountry = autoDetectedCountryOBJ.isoCode,
			pageLang = autoDetectedCountryOBJ.lang,
			
			locale = pageLang + '-' + pageCountry,
			
			contextId = (window.trrConstantData && window.trrConstantData.configs) ? window.trrConstantData.configs.contextId : undefined;
		
		//var underTerra = (/\.terra\.|stages\.com\.br/i).test(document.domain);
		var underTerra = false;
		
		// Converting exeptions
		if(userCountry == 'AR') userLang = 'ar';
		if(userCountry == 'BR') userLang = 'br';
		
		// FlashDetect
		// http://www.featureblend.com/license.txt
		if(!FlashDetect) var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}; return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}; return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){}; return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(typeof obj=="object"){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.release="1.0.3";
		
		// Set free section configs
		globals = {
			data:{
				log:[],
				feeds:{},
				instances:{}
			},
			stage:{
				isDSV:(stageType == "DSV"),
				type:stageType,
				coreBaseUrl:baseURL + details.coreDirPath,
				debugging:(/debug/).test(document.location)
			},
			page:{
				contextId:contextId,
				lang:pageLang,
				country:pageCountry,
				underTerra:underTerra,
				baseURL:baseURL,
				portalURL:autoDetectedCountryOBJ.portalURL,
				startupTime:details.startupTime,
				ready:false,
				transitionEffects:false
			},
			user:{
				lang:userLang,
				country:userCountry,
				flash:{
					installed:FlashDetect.installed,
					version:FlashDetect.major
				}
			},
			regions:Regions
		}
		
		$(document).ready(function(){
			globals.page.ready = true;
		});
		
	})(); // Just once
	
	var Log = new function(moduleId){
		var stack = globals.data.log = [],
			foundCriticalErrors = false;

		this.CONSTRUCTOR = function(moduleId){
			var profile = moduleId || "System Message";
			var instanceStartupTime = new Date().getTime();
					
			var insertMsg = function(type, text){
				var logOBJ = {
					instanceCheckpoint:new Date().getTime() - instanceStartupTime,
					sessionCheckpoint:new Date().getTime() - globals.page.startupTime,
					profile:profile,
					type:type,
					message:text
				}
				stack.push(logOBJ);
				
				if(globals.data.instances.modConsole) updateConsole();
			}
					
			var updateConsole = function(){
				globals.data.instances.modConsole[0].report();
			}
			
			this.checkpoint = function(text) { insertMsg('checkpoint', text); return undefined; }
			this.warning = function(text) { insertMsg('warning', text); return undefined; }
			this.critical = function(text) { insertMsg('critical', text); if(window.console && !foundCriticalErrors && globals.stage.debugging){foundCriticalErrors = true; console.log("Erro(s) crítico(s) encontrado(s). Acione o console para verificar mais detalhes."); } return undefined; }
			
			this.trace = function(text) { insertMsg('trace', text); return undefined; }
			this.help = function(text) { insertMsg('help', text); return undefined; }
		}
		return undefined;	
	}
	var log = new Log.CONSTRUCTOR();
	
	
	var require = new function(){

		this.timeout = 0;
		
		var headElement = document.getElementsByTagName('head')[0],
		
			defaultAttributes = {
				link:{
					type:"text/css",
					rel:"stylesheet",
					media:"all"
				},
				script:{
					type:"text/javascript",
					charset:"utf-8"
				}
			},
			
			activeDependencies = globals.data.dependencies = {
				components:{},
				files:{
					css:{},
					js:{}
				},
				extensions:{},
				externalScripts:{}
			},
			
			jsonpQueueList = {}
		
		// Constructor >>
			var Stack = new function(){
				
				var FaliedFiles = {},
					InProgress = {},
					LoadedFiles = this.LoadedFiles = {},
					LoadedComponents = this.LoadedComponents = {},
					Statements = [];
				
				this.loading = function(url){
					InProgress[url] = true;
				}	
				
				this.loaded = function(url, type){
					//if(window.console) console.log('cadastrando carregamento da url ' + url);
					LoadedFiles[url] = true;
					

							
					var matchResult = queryLibraryMatch(url);
					if(matchResult) activeDependencies.extensions[matchResult] = true; 
					if(!url.match(/(jquery|modMan)\.js$/i)) activeDependencies.externalScripts[url] = true;
					
					activeDependencies.files[type][url] = true;
					
					if(InProgress[url]) {
						delete InProgress[url];
						Stack.update();
					}
				
				}
				
				this.failed = function(url){
					FaliedFiles[url] = true;				
					
					if(InProgress[url]) {
						delete InProgress[url];
						Stack.update();
					}
				}
				
				this.register =function(statementOBJ){
					Statements.push(statementOBJ);
					
					var allDependenciesArePresent = true;
					for (var i = 0, currentDependency; currentDependency = statementOBJ.requires[i]; i++){
						var url = currentDependency.href || currentDependency.src;
						
						if(currentDependency.src){
							var matchResult = queryLibraryMatch(url);
							if(matchResult && Library.extensions[matchResult].source && typeof(Library.extensions[matchResult].source) == 'function') {
								Library.extensions[matchResult].source();
								Library.extensions[matchResult].source = true;
								log.checkpoint('Evitando request de ' + matchResult)
								Stack.loaded(url, 'js');
								
								continue;
							}
						}
						
						if(!LoadedFiles[url] && !InProgress[url]) {
							allDependenciesArePresent = false;
							createElement(currentDependency, statementOBJ.error);
						}
					}
					
					if(allDependenciesArePresent) Stack.update();
				}
				
				this.update =function(){
					
					var stackedStatements = $.extend(Statements, []);
					Statements = [];
					//if(window.console) console.log('UPDATE rolando para: '+stackedStatements.length + ' statements');
					
					if(stackedStatements.length){
						// loop for stackedStatements
						var queue = [],
							currentStatement = null;
						while(stackedStatements.length){
							currentStatement = stackedStatements.shift();
						
							// loop to update dependencies status
							if(currentStatement.requires.length){
								var dependenciesQueue = [],
									criticalErrors = [];
								
								//if(window.console) console.log('Statement aguardando ' + currentStatement.requires.length);
								while(currentStatement.requires.length){
									var currentDependency = currentStatement.requires.shift(),
										url = currentDependency.src || currentDependency.href;
									
									//if(window.console) console.log('verificando url ' + url);
									if(FaliedFiles[url]) criticalErrors.push(url);
									if(!LoadedFiles[url]) dependenciesQueue.push(currentDependency);	
								}
								//if(window.console) console.log('ainda restam ' + dependenciesQueue.length);
								if(dependenciesQueue.length) currentStatement.requires = currentStatement.requires.concat(dependenciesQueue);
							}
							if(!currentStatement.requires.length) {
								//if(window.console) console.log('DISPARANDO CALLBACK');
								if(currentStatement.success) window.setTimeout(currentStatement.success, 100);
							} else if(criticalErrors.length) {
								if(currentStatement.errorHandler) currentStatement.errorHandler();
							} else {
								//if(window.console) console.log('adiando statement');
								queue.push(currentStatement);
							}
						}
						if(queue.length) Statements = Statements.concat(queue);
					}
					
					return undefined;
				}
				
			}
		
			var convert2absolutePath = function(includePath){
				if((/^(http:\/\/)/).test(includePath)) return includePath;

				var base = document.location.toString().replace(/[^\/]+$/, ''),
					fileRealPath = includePath.replace(base,'').replace(/\.\.\//g, '');

				if((/^\//).test(includePath)) return (document.domain) ? location.protocol + "//" + document.domain + includePath : (/.+\//).exec(document.location)[0] + includePath.replace(/^\//,'');
			
				if((/^\.\.\//).test(includePath)){
					var backDirectories = includePath.match(/(\.\.\/)/g).length;
					for (var i = 0; i < backDirectories; i++){
						base = base.replace(/[^\/]+\/?$/,'');
					}
				}
				return base + fileRealPath;
			}
			
			var queryLibraryMatch = function(includeUrl) {
				for (var objectIndex in Library.extensions){
					var referenceOBJ = Library.extensions[objectIndex];
					if(referenceOBJ.scriptPath && includeUrl.match(referenceOBJ.scriptPath)) {
						
						return objectIndex;
					}
				}
				return false;
			}
			
			var checkTemplate = function(){
				var firstLoad = {},
					tmpOBJ = {};
				
				var queryElements = function(){
					var elementsArray=document.getElementsByTagName('link'); 			
					for(var i=0, current; current = elementsArray[i];i++){
						var currentHREF = current.href;
						if(currentHREF && current.getAttribute('rel').toLowerCase()=='stylesheet'){
							var url = convert2absolutePath(currentHREF);
							
							if(!firstLoad[url] && activeDependencies.files.css[url]) {
								log.warning('Include CSS replicado: <strong>'+url+'</strong>');
								continue;
							}
							tmpOBJ[url] = true;						
							activeDependencies.files.css[url] = true; 						
							Stack.loaded(url, 'css');
						}
					}
								
					elementsArray=document.getElementsByTagName('script'); 			
					for(var i=0, current; current = elementsArray[i];i++){
						var scriptEXP = /javascript/i,
							currentSRC = current.src,
							url = convert2absolutePath(currentSRC);
							
						if (currentSRC && (scriptEXP.test(current.getAttribute('type')) || scriptEXP.test(current.getAttribute('language')))){
							if(!firstLoad[url] && activeDependencies.files.js[url]) {
								log.warning('Include JS replicado: <strong>'+url+'</strong>.');
								continue;
							}
						
							tmpOBJ[url] = true;
							activeDependencies.files.js[url]= true; 	
							
							Stack.loaded(url, 'js');
						} 
					}
					
					firstLoad = tmpOBJ;
					return undefined;
				}
				
				// doubleCheck
				queryElements();
				//$(document).ready(function(){
					//queryElements();
					//checkTemplate = undefined; // release
				//});			
				
				return undefined;
			}();
			
		// Constructor <<
		
		var autoDetectAttributes = function(url){
			
			if((/\.css$/i).test(url)) var typeAttribute = "text/css", urlAttributeName = "href";
			else if((/\.js$/i).test(url)) var typeAttribute = "text/javascript", urlAttributeName = "src";
			else {
				log.critical('Não foi possível identificar o tipo de tag para url: \n' + url);
				return null;
			}

			var attributesOBJ = {};
			attributesOBJ.type = typeAttribute;
			attributesOBJ[urlAttributeName] = url;
			
			return attributesOBJ;
		}
		
		var attachTimeOutHandler = function(tagOBJ, timeout, errorHandler){
			timeout = timeout || require.timeout;
			if(timeout){
				//alert('timeoutando em: ' + timeout);
				var url = tagOBJ.src || tagOBJ.href;
				
				function check(){
					window.clearInterval(checkInterval);
					
					if(!Stack.LoadedFiles[url]){
						Stack.failed(url);
						tagOBJ.onload = tagOBJ.onreadystatechange = null;
						headElement.removeChild(tagOBJ);
						//errorHandler();
					}			
				}
				
				var checkInterval=window.setInterval(check, timeout);
			}
			return undefined;
		}
		
		var monitorNewCss = function(index,url){
			function check(){
				if(document.styleSheets[index]){
					if(url){	
						var currentURL = url,
							internalAttributes = url.match(/[?&]codeVersion=[^&]+/i);
						
						if(internalAttributes) currentURL = currentURL.replace(internalAttributes[0], '');
						Stack.loaded(currentURL, 'css');
						//if(window.console) console.log("Novo include CSS:\n" + url);
					}
					window.clearInterval(checkInterval);
				} 
			} 
			
			var checkInterval=window.setInterval(check, 50);
			return undefined;
		}
		
		
		var createElement = function(userDefinedOBJ, errorHandler){
			// detect element type
			if((/text\/javascript/i).test(userDefinedOBJ.type)) var tagName = "script", urlAttributeName = "src";
			else if((/text\/css/i).test(userDefinedOBJ.type)) var tagName = "link", urlAttributeName = "href";
			else return log.warning('Tag desconhecida para o include: ' + userDefinedOBJ.type);		
			
			// splice custom attributes
			var customOptions = {};
			if(userDefinedOBJ['timeout']) customOptions.timeout = userDefinedOBJ['timeout'], delete userDefinedOBJ['timeout'];
			
			// set attributes
			var tagOBJ = document.createElement(tagName);
			
			var url = userDefinedOBJ[urlAttributeName];
			Stack.loading(url);
			
			
			// attach callback
			if(tagName == "script"){
				tagOBJ.onload = tagOBJ.onreadystatechange = function(){
					if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
						var currentURL = this.src,
							internalAttributes = this.src.match(/[?&]codeVersion=[^&]+/i);
						
						if(internalAttributes) currentURL = currentURL.replace(internalAttributes[0], '');
						
						
						//if(window.console) console.log("Novo include Javascript:\n" + currentURL);
					
						this.onload = this.onreadystatechange = null;
						//objHead.removeChild(this);
						headElement.removeChild(tagOBJ);
						//if(window.console) console.log("agora foi "+!!$.combobox);
						
						//setTimeout(function(){Stack.loaded(currentURL, 'js')},1000);
						Stack.loaded(currentURL, 'js');
						log.checkpoint("Novo include Javascript:\n" + currentURL);
						
						return undefined;
					}
				};
			}
			
			for (var attributeName in defaultAttributes[tagName]) tagOBJ[attributeName] = defaultAttributes[tagName][attributeName];
			for (var attributeName in userDefinedOBJ) tagOBJ[attributeName] = userDefinedOBJ[attributeName];
			
			if(tagName == "link"){  // tagName == "link"
				monitorNewCss(document.styleSheets.length, url)			
			}
			if(errorHandler) attachTimeOutHandler(tagOBJ, customOptions.timeout, errorHandler);
			headElement.appendChild(tagOBJ);
		}
		
		//=-=-=-=-=-=-=-=-=-
		// Public Commands >>
		//=-=-=-=-=-=-=-=-=-	
		this.files = function(statementsObjectsARRAY){
			if(!statementsObjectsARRAY || !(statementsObjectsARRAY instanceof Object)) return log.critical('Erro ao utilizar o método require.files.');
			
			// forgiving url expressed as a String
			statementsObjectsARRAY.dependencies = (typeof(statementsObjectsARRAY.dependencies) == "string") ? [statementsObjectsARRAY.dependencies] : statementsObjectsARRAY.dependencies;
			
			var structErrors = modMan.tools.getStructErrors({
				data:statementsObjectsARRAY,
				model:{
					dependencies:Array,
					success:Function
				}
			});
			if(structErrors) return log.critical('Erro ao utilizar a ferramenta requires. \n' + structErrors);
			
			var finalStack = [],
				foundTypeErrors = false;
			while(statementsObjectsARRAY.dependencies.length){
				var current = statementsObjectsARRAY.dependencies.shift(),
					url = current.src || current.href || current;
					url = convert2absolutePath(url.replace(/^\s?|\s?$/,'')); // trim

				// if not declared, detect file type
				if(typeof(current) == "string") current = autoDetectAttributes(current);
				if(!current) {
					foundTypeErrors = true;
					continue;
				}
				
				finalStack.push(current);
			}
			
			if(foundTypeErrors && typeof(errorHandler) == 'function') {
				errorHandler = errorHandler || window.alert;
				return errorHandler(new TypeError('Erros foram encontrados durante a detecção do tipo de include em uma ou mais urls. Verifique mais detalhes no log registrado no console.'));
			}
			
			Stack.register({
				requires:finalStack,
				success:statementsObjectsARRAY.success,
				error:statementsObjectsARRAY.error
			});
			
			return undefined;
		}
		
		this.extensions = function(statementOBJECT){
			if(!statementOBJECT || !(statementOBJECT instanceof Object)) return log.critical('Erro ao utilizar o método require.extensions.');
			
			var structErrors = modMan.tools.getStructErrors({
				data:statementOBJECT,
				model:{
					dependencies:Array,
					success:Function
				},
				help:{
					dependencies:"Deve ser um objeto tipo Array, composto por identificadores (strings) das extensões desejadas."
				}
			});
			if(structErrors) return log.critical('Erro ao utilizar o método require.extensions. \n' + structErrors);
			
			var unknowExtensions = [],
				externalScriptsList = [];
			while(statementOBJECT.dependencies.length) {
				var currentId = statementOBJECT.dependencies.shift();
				if(!Library.extensions[currentId]) {
					unknowExtensions.push(currentId);
					continue;
				}
				
				if(Library.extensions[currentId].source){
					if(typeof(Library.extensions[currentId].source) == 'function') {
						Library.extensions[currentId].source();
						Library.extensions[currentId].source = true;
						activeDependencies.extensions[currentId] = true; 
					}
					continue;
				} 
				
				if (typeof(Library.extensions[currentId].scriptPath) == 'string') {
					externalScriptsList.push(modMan.globals.stage.coreBaseUrl + Library.extensions.baseDIR + Library.extensions[currentId].scriptPath);
				}
				
			}
			if(unknowExtensions.length) return log.critical('Referência(s) não encontrada(s) na biblioteca: <strong>'+unknowExtensions.join(', ')+'</strong>.');
			
			if(externalScriptsList.length) {
				require.files({
					dependencies:externalScriptsList, 
					success:statementOBJECT.success,
					error:statementOBJECT.error
				});
			} else if(statementOBJECT.success) statementOBJECT.success();
		}
		
		//this.components = function(componentName, callback){
		this.components = function(nameSelectorHashObjectsARRAY){
			if(!nameSelectorHashObjectsARRAY || !(nameSelectorHashObjectsARRAY instanceof Array)) return log.critical('Erro ao utilizar o método require.components.\n');
			
			var foundTypeErrors = [];
			while(nameSelectorHashObjectsARRAY.length){
				var current = nameSelectorHashObjectsARRAY.shift();
				
				var structErrors = modMan.tools.getStructErrors({
					data:current,
					model:{
						id:String,
						selector:String,
						success:Function
					}
				});
				if(structErrors) {
					foundTypeErrors.push(structErrors);
					continue;
				}
				
				if(!Library.components[current.id]) {
					foundTypeErrors.push('Referência(s) não encontrada(s) na biblioteca: <strong>'+current.id+'</strong>.');
					continue;
				}
				
				(function(current){
					var callbackFUNCTION = (Library.components[current.id].CONSTRUCTOR) ? 
										function(){Library.components[current.id].CONSTRUCTOR(current.selector, current.success)} : 
										current.success;
					
					require.extensions({
						dependencies:Library.components[current.id].dependencies.extensions,
						success:callbackFUNCTION,
						error:current.error
					});			
				})(current)
			}
			
			if(foundTypeErrors.length) return log.critical('Erros encontrados na chamada ao método require.components:\n' + foundTypeErrors.join('<br/>'));
		}
		
		// backward compatibility
		$.include = function(pathsARRAY, callback, errorHandler){
			if(!pathsARRAY || (!pathsARRAY.length && typeof(pathsARRAY) != 'string'))  return log.critical('Erro encontrado na utilziação do método $.include.');
			if(typeof(pathsARRAY) == 'string') pathsARRAY = [pathsARRAY];
			
			var fileList = [];
			while(pathsARRAY.length){
				var current = pathsARRAY.shift();
				fileList.push(modMan.globals.stage.coreBaseUrl+current);
			}
			
			require.files({
				dependencies:fileList, 
				success:callback,
				error:errorHandler
			});
		}
		
		this.jsonP = function(configsOBJ){
			
			var url = configsOBJ.url,
				wrapperName = configsOBJ.wrapperName,
				cachedValue = modMan.globals.data.feeds[wrapperName];
				
			if(configsOBJ.cache && cachedValue) {
				log.checkpoint('<strong>Carregando direto do cache</strong><br/>');
				configsOBJ.callback(cachedValue);
				
				return true;
			}
				
			// get value from global scope (no request)
			if(window[wrapperName] && typeof(window[wrapperName]) != 'function') {
				configsOBJ.callback(window[wrapperName]);
				
				if(configsOBJ.cache)  modMan.globals.data.feeds[wrapperName] = window[wrapperName].prototype;
				
				window[wrapperName] = undefined;
				
				return true;
			}
			
			if(!configsOBJ.cache) {
				url += (configsOBJ.url.match(/\?/)) ? '&' : '?';
				url += 'cache=' + new Date().getTime();
			}
				
			var jsonpQueueListKey = url.replace(/\s/g,'');
			if(!jsonpQueueList[wrapperName]) jsonpQueueList[wrapperName] = {};

			
			if(!window[wrapperName]) {
				window[wrapperName] = function(responseOBJ){
					modMan.globals.data.feeds[wrapperName] = responseOBJ;
				}
			}				
			
			if(!configsOBJ.cache || !jsonpQueueList[wrapperName][jsonpQueueListKey]){
			
				require.files({
					dependencies:[{type:"text/javascript", src:url}],
					success:function(){
						var jsonpQueueListKey = url.replace(/\s/g,'');
						
						log.checkpoint('Executando '+jsonpQueueList[wrapperName][jsonpQueueListKey].length+' callback(s) para o jsonP '+url+'<br/>');
						
						while(jsonpQueueList[wrapperName][jsonpQueueListKey].length) {
							var callback = jsonpQueueList[wrapperName][jsonpQueueListKey].shift();
								callback(modMan.globals.data.feeds[wrapperName]);
						}
					}			
				});
			}				

			if(!jsonpQueueList[wrapperName][jsonpQueueListKey]) jsonpQueueList[wrapperName][jsonpQueueListKey] = [];
				jsonpQueueList[wrapperName][jsonpQueueListKey].push(configsOBJ.callback);

		}
		
		this.xml = function(){
			
		}
		
		this.post = function(){
			
		}
		// Public Methods <<
	}
	
	var tools = {
		log:Log,
		metrics:new function Metrics(){

			var currentMetricsValues = { // default values for mandatory params
				terra_info_service : window.terra_info_service,
				terra_info_channel: window.terra_info_channel,
				terra_info_type: window.terra_info_type,
				terra_info_id: window.terra_info_id,
				terra_info_channeldetail: window.terra_info_channeldetail,
				
				terra_stats_regCLK: window.terra_stats_regCLK,
				terra_stats_idCrtfc: window.terra_stats_idCrtfc,
				terra_stats_uv_c: window.uv_c || window.terra_stats_uv_c
			}
			var hit = function(){
				try {
					terra_stats_regTraffic();
					modMan.log.checkpoint('[Métricas registradas] » terra_info_type: <strong>'+modMan.tools.metrics.getCurrentValues().terra_info_type+'</strong>');
				} catch(e) {
					var countryCode = (modMan.globals.page.country) ? modMan.globals.page.country.toLowerCase() : 'br',
						scriptUrl = (!document.domain || (/hlg\./i).exec(document.domain)) ? 'http://s1.trrsf.com.br/metrics/js/'+countryCode+'/content.js' : "/metrics/js/"+countryCode+"/content.js";
					
					modMan.log.critical('Erro ao disparar a função que recarrega métricaa: <strong>terra_stats_regTraffic</strong>. '+ (!window.terra_stats_regTraffic ? 'Por favor, certifique-se que o template faz include do seguinte script: ' + scriptUrl : '» '+ e.message));
				}
			}
			
			var setValues = this.setValues = function(newMetricValues){
				currentMetricsValues = $.extend(currentMetricsValues, newMetricValues || {});
			}

			this.getCurrentValues = function(){
				return currentMetricsValues;
			}

			this.reg = function(newMetricValues){
				var notFoundValues = [];
					
				if(typeof newMetricValues == 'object') setValues(newMetricValues);				
				
				for(var current in currentMetricsValues){					
					if(typeof(currentMetricsValues[current]) != 'undefined') window[current] = currentMetricsValues[current];
					else {
						notFoundValues.push(current);
						delete currentMetricsValues[current];
					}
				}
				
				if(notFoundValues.length) modMan.log.critical('Não foi possível encontrar o valor para as seguintes variáveis de métricas: ' + notFoundValues.join(', ') + '. Registrando demais valores encontrados.');
				try {
					hit();
				} catch(e){
					modMan.log.critical('[Erro encontrado ao definir variáveis de métricas] » ' + e.message);
				}
			}
		},
		reloadMetrics:function(metricsValuesOBJ){
			//var PROXY_URL = modMan.globals.page.baseURL + "_tpl/metrics.html?",
			var PROXY_URL = modMan.globals.stage.coreBaseUrl.replace(/s\d\.trrsf/, 'stf.terra') + "_tpl/metrics.html?",
				requiredMetricsVariables = ['terra_info_service', 'terra_info_channel', 'terra_info_channeldetail', 'terra_info_type', 'terra_info_id', 'terra_stats_idCrtfc', 'terra_stats_uv_c'],
				notFoundValues = [],
				$metricsLoaderFrame = $('#metricsLoaderFrame'),
				
				metricsValuesOBJ = $.extend({ // default
					terra_info_service: window.terra_info_service,
					terra_info_channel: window.terra_info_channel,
					terra_info_channeldetail: window.terra_info_channeldetail,
					terra_info_type: window.terra_info_type,
					terra_info_id: window.terra_info_id,
					terra_stats_idCrtfc: window.terra_stats_idCrtfc,
					terra_stats_uv_c: window.uv_c || window.terra_stats_uv_c
				}, metricsValuesOBJ || {});				
				
			for(var i = 0, current; current = requiredMetricsVariables[i]; i++){	
				if(typeof(metricsValuesOBJ[current]) == 'undefined') {
					notFoundValues.push(current);
					requiredMetricsVariables.splice(i,1);
					i--;
				}
			}
			
			if(notFoundValues.length) modMan.log.warning('Não foi possível encontrar o valor para as seguintes variáveis de métricas: ' + notFoundValues.join(', '));
			while(requiredMetricsVariables.length){
				var current = requiredMetricsVariables.shift();
				
				PROXY_URL += current + '=' + metricsValuesOBJ[current];
				if(requiredMetricsVariables.length) PROXY_URL += '&';
			}
			PROXY_URL += "&country="+modMan.globals.page.country;
			
			if($metricsLoaderFrame.length) $metricsLoaderFrame.attr('src', PROXY_URL);
			else $(document.body).append('<iframe id="metricsLoaderFrame" src="'+PROXY_URL+'" width="0" height="0" style="position:absolute;left:-100px;top:-100px;"></iframe>');
		},
		pubMan: new function(){
						
			var _SELF = this,
				PROXY_TPL_PATH = globals.stage.coreBaseUrl + "_tpl/advertising.html",
				ADS_CONTAINER_SELECTOR = '.trr-ctn-advertising:last',
				CURRENT_CONTAINER_SELECTOR = ADS_CONTAINER_SELECTOR + ' > div:last',
				AD_PLACEHOLDER_SELECTOR_PREFIX = "tgm-",
				AD_CONTAINER_SELECTOR_PREFIX = "ctn-tgm-",
				
				autoDetectedTags = ['top', 'right', 'ppi', 'bottom', 'textlinks'],
				
				$interface = {
					adsContainer:null,
					placeholders:{},
					containers:{},
					framedAds:{}
				},
				
				info = {
					exibitions:{},
					rejected:{}
				};
				
			var createIframeHTML = function(currentTagId){
				var placeholdersHeigth = $interface.placeholders[currentTagId].height(),
					placeholdersWidth = $interface.placeholders[currentTagId].width(),
					HTML = '<iframe allowtransparency="true" height="'+placeholdersHeigth+'" width="'+placeholdersWidth+'" src="'+PROXY_TPL_PATH+'?tag='+(window.tgmKey || "br.test2010.home")+'&amp;area='+currentTagId+'&amp;site='+(window.site || "")+'&amp;zone='+(window.zone || "")+'" frameborder="0" scrolling="no" ><//iframe>';
				
				return HTML;
			}
			
			var placeAd = function(currentTagId){				
				var $container = $interface.containers[currentTagId],
					$placeholder = $interface.placeholders[currentTagId],
					scrollPosition = (navigator.userAgent.match(/ie/i)) ? (window.pageYOffset || document.documentElement.scrollTop) : 0,
					placeholderBorderLeftWidth = parseInt(($placeholder.css('borderLeftWidth')).replace(/[^\d]+/,'')) || 0,
					leftPosition = ($placeholder.offset().left + placeholderBorderLeftWidth) - $interface.adsContainer.offset().left ,
					topPosition = $placeholder.offset().top;
					
					if(scrollPosition > 0 && !globals.page.ready) topPosition += scrollPosition;
					
				$container.attr("style","position:absolute; display:block; top:"+topPosition+"px; left:"+leftPosition+'px;');
				
				if(!info.exibitions[currentTagId]) info.exibitions[currentTagId] = 0;
				info.exibitions[currentTagId]++;
				
				return undefined;
			}
			
			// constructor »
			
			// constructor «
			
			this.getInfo = function(){
				return info;
			}
			
			this.load = function(currentTagId, extraInfo, tagId){
			
				tagId = tagId || currentTagId;
				
				if(tagId.match(/default/)) {
					tgm.ShowArea('default');
					return true;
				}
				
				if(!globals.page.ready && !$interface.adsContainer){
					$interface.adsContainer = $(ADS_CONTAINER_SELECTOR);
					if(!$interface.adsContainer.length){
						$interface.adsContainer = null;
						log.critical('Erro ao localizar container reponssável por receber as tags de publicidade. O elemento deve casar com o seguinte seletor: <strong>'+ ADS_CONTAINER_SELECTOR + '</strong>.');
						return false;
					}
				}
				
				if($interface.placeholders[currentTagId]) return _SELF.reload([currentTagId]);
				
				$interface.placeholders[currentTagId] = $('#' + AD_PLACEHOLDER_SELECTOR_PREFIX + currentTagId);
				$interface.containers[currentTagId] = $(CURRENT_CONTAINER_SELECTOR).attr('id', AD_CONTAINER_SELECTOR_PREFIX + currentTagId);
				
				if(globals.page.ready && $interface.placeholders[currentTagId].length){
				
					if($interface.framedAds[currentTagId]) return _SELF.reload([currentTagId]);
					else {
						var containerElement = document.createElement('div');
							containerElement.id = AD_CONTAINER_SELECTOR_PREFIX + currentTagId;
							containerElement.innerHTML = createIframeHTML(currentTagId);
						
						if(!$interface.adsContainer.length) {
							$('#container').append('<div class="'+ADS_CONTAINER_SELECTOR.replace(/^\./,'')+'"></div>');
							$interface.adsContainer = $(ADS_CONTAINER_SELECTOR);
						}
						
						$interface.adsContainer.append(containerElement);
						$interface.containers[currentTagId] = $(containerElement);
						placeAd(currentTagId);
						
						if(!info.exibitions[currentTagId]) info.exibitions[currentTagId] = 0;
						info.exibitions[currentTagId]++;
						
						return;
					}
				}
				
				if(!$interface.placeholders[currentTagId].length || !$interface.containers[currentTagId].length) {
				
					var errrorMsg = ''+
					'Erro ao localizar container de origem ou destino para publicidade.\n'+
					'Seletor de origem (placeholder): <strong> '+ '#'+AD_PLACEHOLDER_SELECTOR_PREFIX + currentTagId + '</strong> (elemento '+($interface.placeholders[currentTagId].length ? 'encontrado' : '<strong style="color:red;">não encontrado</strong>')+')\n'+
					'Seletor de destino (tag container): '+CURRENT_CONTAINER_SELECTOR+' (elemento '+($interface.containers[currentTagId].length ? 'encontrado' : '<strong style="color:red;">não encontrado</strong>')+')';

				
					if(!info.rejected[currentTagId]) info.rejected[currentTagId] = errrorMsg;
					
					//log.warning(errrorMsg);
					return false;
				}
				
				if(extraInfo) tgm.ShowArea(tagId, extraInfo);
				else tgm.ShowArea(tagId, 'site='+(window.site || ""), 'zone='+(window.zone || ""));
				
				placeAd(currentTagId);
				
				return true;
			}
			
			this.reload = function(tagIdsARRAY){
				tagIdsARRAY = tagIdsARRAY || autoDetectedTags;
				
				
				for(var i = 0, currentTagId; currentTagId = tagIdsARRAY[i]; i++){
					
					if(!$interface.placeholders[currentTagId]) {
						$interface.placeholders[currentTagId] = $('#'+ AD_PLACEHOLDER_SELECTOR_PREFIX + currentTagId);
						$interface.containers[currentTagId] = $('#'+ AD_CONTAINER_SELECTOR_PREFIX + currentTagId);
									
						if(!$interface.placeholders[currentTagId].length || !$interface.containers[currentTagId].length) {										
							if(!$interface.placeholders[currentTagId].length) delete $interface.placeholders[currentTagId];
							if(!$interface.containers[currentTagId].length) delete $interface.containers[currentTagId];
							
							if($interface.placeholders[currentTagId] && !$interface.containers[currentTagId]) {
								//log.warning('tag inválida: '+ currentTagId);
								delete $interface.placeholders[currentTagId];
								_SELF.load(currentTagId);
							} else {									
								var errrorMsg = 'Erro ao localizar placeholder para publicidade <strong>'+currentTagId+'</strong>.';								
								if(!info.rejected[currentTagId]) info.rejected[currentTagId] = errrorMsg;									
							}
							
							continue;
						}
					}
					
				
					if ($interface.framedAds[currentTagId]) $interface.framedAds[currentTagId].get(0).src += '';
					else {								
						$interface.containers[currentTagId].html(createIframeHTML(currentTagId));
						$interface.framedAds[currentTagId] = $interface.containers[currentTagId].find('iframe:first');
					}

					if(!info.exibitions[currentTagId]) info.exibitions[currentTagId] = 0;
					info.exibitions[currentTagId]++;
					
				}
				
				return undefined;
			}
			
			this.placeAds = function(tagIdsARRAY){
				tagIdsARRAY = tagIdsARRAY || autoDetectedTags;
				if(!$interface.adsContainer) $interface.adsContainer = $(ADS_CONTAINER_SELECTOR);
				
				for(var i = 0, currentTagId; currentTagId = tagIdsARRAY[i]; i++){
					var $placeholder = $('#'+AD_PLACEHOLDER_SELECTOR_PREFIX + currentTagId),
						$container = $('#'+AD_CONTAINER_SELECTOR_PREFIX + currentTagId);
						
					if(!$interface.placeholders[currentTagId] && !$placeholder.length) {
						var errrorMsg = ''+
						'Erro ao localizar container de origem ou destino para publicidade.\n'+
						'Seletor de origem (placeholder): <strong> '+ '#'+AD_PLACEHOLDER_SELECTOR_PREFIX + currentTagId + '</strong> (elemento '+($placeholder.length ? 'encontrado' : '<strong style="color:red;">não encontrado</strong>')+')\n'+
						'Seletor de destino (tag container): '+CURRENT_CONTAINER_SELECTOR+' (elemento '+($container.length ? 'encontrado' : '<strong style="color:red;">não encontrado</strong>')+')';
					
						if(!info.rejected[currentTagId]) info.rejected[currentTagId] = errrorMsg;
					
						continue;
					}
					
					if(!$interface.placeholders[currentTagId]) $interface.placeholders[currentTagId] = $placeholder;
					if(!$interface.containers[currentTagId]) $interface.containers[currentTagId] = $container;
					
					placeAd(currentTagId);	

					return undefined;
				}				
			
			}
			
			this.destroyAds = function(tagIdsARRAY){
				tagIdsARRAY = tagIdsARRAY || autoDetectedTags;
				
				for(var i = 0, currentTagId; currentTagId = tagIdsARRAY[i]; i++){
					if($interface.containers[currentTagId]){
						log.checkpoint('Removendo publicidade carregada via pubMan: <strong>' + currentTagId + '</strong>.');
						$interface.containers[currentTagId].remove();
						$interface.containers[currentTagId] = undefined;
					} else {
						var $currentAd = $('#ctn-tgm-'+currentTagId);
						if($currentAd.length) {
							log.checkpoint('Removendo publicidade que não foi instanciada pelo modMan: <strong>' + currentTagId + '</strong>.');
							$currentAd.remove();
						}
					}
					
				}
			}
		},
		getStructErrors: function(referenceOBJECT){
			if(typeof(referenceOBJECT) != 'object' || referenceOBJECT.length) return 'TypeError encontrado na estrutura de um ou mais parâmetros transmitidos ao método "tools.getStructErrors"';
			
			if(typeof(referenceOBJECT.data) != 'object' || typeof(referenceOBJECT.model) != 'object')  return 'TypeError encontrado na estrutura do objeto. Verifique se ele possui variáveis tipo Object associadas às propriedades "data" e "model" (a propriedade "help" é opcional).';
			
			referenceOBJECT.help = referenceOBJECT.help || {};
			var errorMsg = "";
			for(var key in referenceOBJECT.data){
				if(referenceOBJECT.data[key] === undefined) continue;
				if(referenceOBJECT.model[key]){
					var capitalizedTypeString = referenceOBJECT.model[key].toString().replace(/^\w/, referenceOBJECT.model[key].toString().substring(0,1).toUpperCase());
					if(referenceOBJECT.data[key] && referenceOBJECT.data[key].constructor == referenceOBJECT.model[key] || (window[capitalizedTypeString] && referenceOBJECT.data[key] instanceof window[capitalizedTypeString])) continue;
					
					if(errorMsg) errorMsg += '<br/><br/>\n\n';
					if(referenceOBJECT.model[key] instanceof RegExp && (typeof referenceOBJECT.data[key] != 'string' || !referenceOBJECT.data[key].match(referenceOBJECT.model[key]))) {
						errorMsg += "O valor de <em>" + key + "</em> deve ser do tipo <strong>String</strong> e casar com a seguinte expressão: <strong>"+referenceOBJECT.model[key]+"</strong>.";
					} else {
						errorMsg += "O valor de <em>" + key + "</em> deve ser do tipo <strong>"+(referenceOBJECT.model[key].name || referenceOBJECT.model[key].constructor.name || referenceOBJECT.model[key].toString().match(/[A-Z][^\s\(\)]+/) || capitalizedTypeString)+"</strong>.";
					}
					errorMsg += "  Valor atual: <strong>"+referenceOBJECT.data[key]+" ["+(referenceOBJECT.data[key].constructor.name  || (referenceOBJECT.data[key] instanceof  Array ? "Array":null)  || (referenceOBJECT.data[key] instanceof  RegExp ? "RegExp":null)  || (typeof(referenceOBJECT.data[key])+'').replace(/^\w/,(typeof(referenceOBJECT.data[key])+'').substring(0,1).toUpperCase()))+"]</strong>.";
					if(referenceOBJECT.help[key]) errorMsg += '<br/><strong>DICA: </strong>'+referenceOBJECT.help[key];
				}
			}
			return errorMsg || null;
		},
		Components:function(callback){
			
			var loaded = {} // Stores references to already loaded files
			
			var matchLibrary = function(ext, url){
				if (!loaded[ext]) return false;
				else {
					for(var i = 0; i < loaded[ext].length; i++){
						if(loaded[ext][i] == url) return true;
					}					
				}
				return false;
			}
			
			var set =function(componentsOBJ, callback){
				if(typeof(componentsOBJ) != 'object' || (!componentsOBJ['js'] && !componentsOBJ['css'])) {
					if(callback) callback();
					return false;
				}
				var componentsARRAY = [];
				if(componentsOBJ['css']) componentsARRAY = componentsARRAY.concat(componentsOBJ['css']);				
				if(componentsOBJ['js']) componentsARRAY = componentsARRAY.concat(componentsOBJ['js']);
			
				if(!componentsARRAY.length) callback();
				else {
					log.checkpoint('checking components: \n' + componentsARRAY.join('\n'));
					$.include(componentsARRAY, callback);
				}
			}
			
			var confirm = function(ext, url){
				if(!loaded[ext]) loaded[ext] = [];
				loaded[ext].push(url);
			}
			
			return {
				matchLibrary:matchLibrary,
				set:set,
				confirm:confirm
			}
		}(),
		parseTPL:function (variablesOBJ, templateSTR){
			if(!variablesOBJ || !templateSTR) return templateSTR;
			
			var tagPrefix = "({|##)",
				tagSufix = "(}|##)",
				placeholderEXP = new RegExp('{\s?foreach([^{]|{[^\/])+{\/foreach}'+'|'+tagPrefix + '[\\w\\d._[\\]\'\"-]+' + tagSufix, 'gi'),
				tags = templateSTR.match(placeholderEXP);
			
			if(!tags) return templateSTR;
			
			while(tags.length){
				var currentTag = tags.shift(),
					levelsSTR = (currentTag.match(/foreach/gi)) ? currentTag.match(/from=[^}]+/)[0].replace(/from=/, '') : currentTag.replace(/\[['"]?/,'.').replace(/['"]?\]/,''),
					tagMarkersEXP = new RegExp('^' + tagPrefix + '|' + tagSufix + '$', 'gi'),
					levels = levelsSTR.replace(tagMarkersEXP,'').split('.'),
					dataOBJ = variablesOBJ;
					
				while(levels.length){
					var currentLevel = levels.shift(),
						currentData = dataOBJ[currentLevel];

					if(currentData === null) currentData = '';
					if(typeof(currentData) != 'undefined' && !levels.length) {
						if(currentTag.match(/foreach/gi) && typeof(currentData) == 'object') {
							var loopItem = currentTag.replace(/^{foreach[^}]+}|{\/foreach}$/gi,''),
								tmpData = '';

							for(var key in currentData){
								tmpData += loopItem.replace(/{value/gi,'{'+currentLevel+'["'+key+'"]').replace(/{key}/,key);
							}
							tags=tags.concat(tmpData.match(/{[^}]+}/g));
							currentData = tmpData;
						} 
						templateSTR = templateSTR.replace(currentTag, currentData);
					}
					else if(currentData) dataOBJ = currentData;
					else break;
				}
			}			

			return templateSTR;
		},
		base64:new function(){				
			var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

			this.encode = function(input) {
				if(input){
					var output = "";
					var chr1, chr2, chr3;
					var enc1, enc2, enc3, enc4;
					var i = 0;

					do {
						chr1 = input.charCodeAt(i++);
						chr2 = input.charCodeAt(i++);
						chr3 = input.charCodeAt(i++);

						enc1 = chr1 >> 2;
						enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
						enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
						enc4 = chr3 & 63;

						if (isNaN(chr2)) {
							enc3 = enc4 = 64;
						} else if (isNaN(chr3)) {
							enc4 = 64;
						}

						output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
						keyStr.charAt(enc3) + keyStr.charAt(enc4);
					} while (i < input.length);	
					
					return output;
				}
			}

			this.decode = function(input) {
			   var output = "";
			   var chr1, chr2, chr3;
			   var enc1, enc2, enc3, enc4;
			   var i = 0;

			   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			   do {
				  enc1 = keyStr.indexOf(input.charAt(i++));
				  enc2 = keyStr.indexOf(input.charAt(i++));
				  enc3 = keyStr.indexOf(input.charAt(i++));
				  enc4 = keyStr.indexOf(input.charAt(i++));

				  chr1 = (enc1 << 2) | (enc2 >> 4);
				  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				  chr3 = ((enc3 & 3) << 6) | enc4;

				  output = output + String.fromCharCode(chr1);

				  if (enc3 != 64) {
					 output = output + String.fromCharCode(chr2);
				  }
				  if (enc4 != 64) {
					 output = output + String.fromCharCode(chr3);
				  }
			   } while (i < input.length);

			   return output;
			}
		},
		adjustTime:function(dateOBJ){
			var time = dateOBJ.toLocaleTimeString();
			
			//var hours = time.split(':')[0];
			var hours = dateOBJ.getHours();
			//var minutes = time.split(':')[1];
			var minutes = dateOBJ.getMinutes();
			
			var usa = (modMan.globals.page.country == 'US') ? true : false;
			var sufix = false;
			var sep = "h";
			
			if(modMan.globals.page.country != 'BR') sep = ":";
			if (usa){
				if(hours>12) {
					hours = hours - 12;
					sufix = "pm";
				} else {
					sufix = "am";
				}
			}
			if(hours<10) hours = '0' + hours.toString().match(/\d$/);
			if(minutes<10) minutes = '0'+minutes.toString().match(/\d$/);
			
			var parsedTime = hours + sep + minutes;
			if(sufix) parsedTime += sufix;
			
			return parsedTime;
		},
		/*
		 * PARAMETERS
		 * - url (URL of the popup)
		 * - name (Name of the popup)
		 * - w (Width)
		 * - h (Height)
		 * - scrolling (no = 0 / yes = 1)
		 */
		openPopup:function(url,name,w,h,scrolling) {
			scrolling = scrolling || 'auto';
			var leftPosition = (screen.width) ? (screen.width-w)/2 : 0,
				topPosition = (screen.height) ? (screen.height-h)/2 : 0,
				settings = "toolbar=no,location=no,directories=no,status=no,menubar=no,height="+h+",width="+w+",top="+topPosition+",left="+leftPosition+",scrollbars="+scrolling+",resizable=0";
			
			return window.open(url,name,settings);
		},
		isNewGalleryUrl:function(url){
			if(globals.page.country == 'BR' && (/\/galeria(s)?\//).test(url)) return false;		
			return true;
		},
		cookie:{
			create:function(name,value,hours){
				if (hours) {
					var date = new Date();
					date.setTime(date.getTime()+(hours*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
				
				return undefined;
			},
			read:function(name){
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0, c; c = ca[i];i++) {
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			},
			erase:function(name){
				this.create(name,"",-1);
				//return undefined;
			}
		},
		getQueryStringVars:function(locationSTR){
			locationSTR = locationSTR || document.location;
			var queryStringEXP = /[^?]+$/,
				queryString = queryStringEXP.exec(locationSTR);

			if(!queryString) return null;

			var variables = queryString[0].replace('&amp;',"&").split('&'),
				valuesOBJ = {};
			
			while(variables.length){
				var values = variables.shift().split('=');
				valuesOBJ[values[0]] = (values[1]) ? unescape(values[1]) : true;
			}

			return valuesOBJ;
		},
		stripTags: function(str, removeTagContent) {
			removeTagContent = removeTagContent || false;
			if (removeTagContent == true) return str.replace(/<[^>]+>[^<]*<\/[^>]+>/gi, '');
			else return str.replace(/<\/?[^>]+>/gi, '');
		},
		LazyLoader:function LazyLoader(){
			// toSingleton
             if(!modMan.tools.LazyLoader.prototype._instance) {
                 if(this instanceof modMan.tools.LazyLoader) modMan.tools.LazyLoader.prototype._instance = this;
                 else return modMan.tools.LazyLoader.prototype._instance = new modMan.tools.LazyLoader();
             } else return modMan.tools.LazyLoader.prototype._instance;
             modMan.tools.LazyLoader.constructor = null;
			
			
			// LazyLoader constructor >> 
				var log = new Log.CONSTRUCTOR('LazyLoader'),
					activeListeners = 0;
				
				function getViewportHeight() {
					var height = window.innerHeight; // Safari, Opera
					var mode = document.compatMode;

					if ( (mode || !$.support.boxModel) ) { // IE, Gecko
						height = (mode == 'CSS1Compat') ?
						document.documentElement.clientHeight : // Standards
						document.body.clientHeight; // Quirks
					}

					return height;
				}

				$(window).scroll(function () {
					var vpH = getViewportHeight(),
						scrolltop = (document.documentElement.scrollTop ?
							document.documentElement.scrollTop :
							document.body.scrollTop),
						elems = [];
					
					// naughty, but this is how it knows which elements to check for
					$.each($.cache, function () {
						if (this.events && this.events.inview) {
							elems.push(this.handle.elem);
						}
					});

					if (elems.length) {
						$(elems).each(function () {
							var $el = $(this),
								top = $el.offset().top,
								height = $el.height(),
								inview = $el.data('inview') || false;

							if (scrolltop > (top + height) || scrolltop + vpH < top) {
								if (inview) {
									$el.data('inview', false);
									$el.trigger('inview', [ false ]);                        
								}
							} else if (scrolltop < (top + height)) {
								if (!inview) {
									$el.data('inview', true);
									$el.trigger('inview', [ true ]);
								}
							}
						});
					}
				});
			// LazyLoader constructor <<
			
			this.set = function(selector, callback){				
				
				$(selector).bind('inview', function (event, visible) {
					if (visible) {
						log.checkpoint('Disparando callback para o seletor <strong>'+ $(this).selector + '</strong>.');
						
						callback(event, visible);
						$(this).unbind('inview');
						
						activeListeners--;
						if(!activeListeners) $(window).unbind('scroll');						
					}
				});	
				
				if(!activeListeners) 	$(window).scroll();
				activeListeners++;
			}

		},
		Cron:function Cron(secondsInterval){
			if(this == window) return new Cron(secondsInterval);

			var interval = typeof(secondsInterval) == 'number' ? secondsInterval * 1000 : 0,
				jobs = [],
				timer = null;
				
			var triggerJobs = function(){
				for(var i = 0, currentJob; currentJob = jobs[i]; i++){
					currentJob();
				}
			}
			
			this.setJob = function(jobFUNCTION) {
				if(typeof(jobFUNCTION) != 'function') return new Error('O método só recebe funcões como primeiro e único parâmetro.');
				
				jobs.push(jobFUNCTION);
				
				return this;
			}
			
			this.changeInterval = function(secondsInterval){
				if(typeof(secondsInterval) != 'number') return new Error('O método changeInterval deve receber uma variável tipo Number que represente o tempo desejado, em segundos.');
				
				return this;
			}
			
			this.start = function(){
				if(!interval || !jobs.length) return new Error('É preciso definir intervalo e funções para este objeto.');
				
				timer = window.setInterval(triggerJobs, interval);
				
				return this;
			}
			
			this.stop = function(){
				timer = window.clearInterval(timer);
				
				return this;
			}
		},
		pageReloader:new function(){
			var timer = null,
				cookieName = 'trrScrollPosition',
				previousReloadInterval = 0;
			
			var reloadAction = function(){
				var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
				
				tools.cookie.create(cookieName, scrollPosition);
				document.location += '';				
			}
			
			this.on = function(secondsNumber){
				secondsNumber = secondsNumber || previousReloadInterval;
				
				if(!secondsNumber) return false;
				
				if( (/voidRefresh/i).test(document.location)) {
					log.checkpoint('Auto-refresh configurado para acontecer em ' + secondsNumber + ' segundos, mas IMPEDIDO pelo parâmetro "voidRefresh" contido na url.');
					return false;
				}				
				
				previousReloadInterval = secondsNumber;				
				
				var currentCookie = tools.cookie.read(cookieName);	
				
				if(currentCookie) {
					if(!globals.page.ready){
						$(document).ready(function(){
							window.scrollTo(0, currentCookie);
						});
					}
					
					tools.cookie.erase(cookieName)
				}
				
				log.checkpoint('Auto-refresh configurado para acontecer em ' + secondsNumber + ' segundos.');
				timer = setInterval(function(){reloadAction()}, secondsNumber * 1000);
			}			
			
			this.off = function(){
				log.checkpoint('Auto-refresh interrmpido.');
				if(timer) clearInterval(timer), timer = null;
			}
		}
	}
	
	// forgiving old tools structure references
	tools.jsonP = require.jsonP;
	
	// forgiving old popup method references
	window.abre = function (url,janela,larg,alt,scroll){
		if (!scroll) { scroll='auto' }
		window.open(url,janela,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars="+scroll+",resizable=no,copyhistory=no,width="+larg+",height="+alt);
	}
	
	var events = {
		beforeStart:function(){
			// prepare debugging mode >>
			if(globals.stage.debugging){
				document.onkeyup = function(evt){
					var e = window.event || evt,
						keyunicode= e.charCode || e.keyCode;

					var container = $('#mod-console'),
						cookieName = 'console',
						pwd ="dDNyckA=";
						
					if(keyunicode == 113) { // F2
						if(container.length) return container.toggle('normal');
						
						var savedPass = tools.cookie.read(cookieName);
							inputPass =  savedPass || tools.base64.encode(prompt("Por favor, digite a senha."));
						
						if(inputPass && inputPass == pwd){
							tools.cookie.create('console', pwd, 1); // renew current cookie
							
							var container = document.createElement('hr');
							container.id = "consoleContainer";
							document.body.appendChild(container);
							
							load.modules([
								{
									id:"modConsole",
									selector:"#consoleContainer",
									loadSkin:true
								}
							]);
						}
					}
					
					if(container.length && keyunicode == 9) { // tab
						globals.data.instances.modConsole[0].togglePosition();
					}
				}
			}
			
			return undefined;
		}(),
		load:null,
		afterEnd:null	
	}
	
	var library = {
		modules:{
			extend:function(moduleFactoryModelOBJECT){
				if(typeof(moduleFactoryModelOBJECT) != 'object' || moduleFactoryModelOBJECT.length) return log.critical('Erros encontrados ao extender o objeto Library.<br/>'+structErrors);;
				
				var structErrors = tools.getStructErrors({
					data:moduleFactoryModelOBJECT,
					model:{
						info:Object,
						CONSTRUCTOR:Function
					}
				});
				if(structErrors) return log.critical('Erros encontrados ao extender o objeto Library.<br/>'+structErrors);
				if(Library.modules[moduleFactoryModelOBJECT.info.id] && Library.modules[moduleFactoryModelOBJECT.info.id].source) {
					log.warning('Sobrescrevendo referência existente para o construtor do módulo <strong>'+moduleFactoryModelOBJECT.info.id+'</strong>.');
				}
				
				Library.modules[moduleFactoryModelOBJECT.info.id] = {
					source:moduleFactoryModelOBJECT
				}
				
				log.checkpoint('Módulo cadastrado na biblioteca local » '+ moduleFactoryModelOBJECT.info.id);
				
			}
		}
	}
	
	var load = function(){
		//-+-+-+-+-+-+-+-+
		// Local VARS
		//-+-+-+-+-+-+-+-+
		var firstLoad = true,
			modulesQueue = [],
			modTypeInProgress = [],
			loaded = {};
		// Local VARS //
	
		var modules = function(modulesOBJ){
			var modByType = {};
			
			// Validation loop
			for(var no = 0; no < modulesOBJ.length; no++){
				var mod = modulesOBJ[no];
				
				// Valide template
				if(!mod.selector || !$(mod.selector).length) {
					log.critical(mod.id + " - Elemento container não localizado. O parâmetro '<strong>selector</strong>' está incorreto ou não foi especificado. Seu valor atual é: <strong>" + mod.selector + "</strong>");
					continue;
				}
				
				// Check if there are permission for this module in the library
				if(!Library.modules[mod.id]) {
					log.critical(mod.id + " - Script não encontrado na biblioteca.");
					continue;
				}
								
				if(!modByType[mod.id]) {
					modTypeInProgress.push(mod.id);
					modByType[mod.id] = [];
				}
				modByType[mod.id].push(mod);				
			}
			
			// Execution loop			
			for(var modType in modByType){
				(function(modType){					
					if(typeof(Library.modules[modType].source) == 'object'){
						log.checkpoint('Carregando módulo '+modType+' direto da biblioteca (sem requisição).');
						
						var modPrefs = modByType[modType].shift(),
							sameTypeQueue = modByType[modType],
							callModPrefs = !!!modTypeInProgress.length;
						
						//alert(modTypeInProgress.length + '\n' + modType + '\n' + callModPrefs);
						
						if (Library.modules[modType].source.dependencies){
							log.checkpoint(modType + " - Avaliando pré-requisitos para o seletor " + modPrefs.selector);
							components(Library.modules[modType].source, modPrefs, sameTypeQueue);
						} else {
							modulesQueue.push(modPrefs);
						}
						
						return undefined;
					}
									
					log.checkpoint('Requisitando script para: ' + modType);
					var url = globals.stage.coreBaseUrl + Library.modules.baseDIR + Library.modules[modType].scriptPath;
						require.files({
							dependencies:[url],
							success:function(){
								//alert(modType+'\n'+!!Library.modules[modType].source)
								var moduleOBJ = Library.modules[modType].source,
									modPrefs = modByType[modType].shift(),
									
									sameTypeQueue = modByType[modType],
									callModPrefs = !!!modTypeInProgress.length;
								
								//alert(moduleOBJ.dependencies);
								if (moduleOBJ.dependencies){
									log.checkpoint(modType + " - Avaliando pré-requisitos para o seletor " + modPrefs.selector);
									components(moduleOBJ, modPrefs, sameTypeQueue);
								} else {
									modulesQueue.push(modPrefs);
								}
							},
							error:function(){
								alert('deu erro no pedido da url: '+url);
							}
						});
				})(modType);
			}	
			
		}
		
		var components = function(modOBJ, modPrefs, sameTypeQueue){
			var loadSkin = modPrefs.loadSkin;
			var dependenciesOBJ = modOBJ.dependencies;
			var urlsOBJ = {};
			//alert('aqui \n' + modOBJ.name);
			
			
			if(dependenciesOBJ.underTerra && !globals.page.underTerra) {
				log.critical(modPrefs.id + ' - Este módulo só pode ser carregado sob o domínio do Terra');
				if(callModPrefs) preferences();
				return false;
			}
			
			if(dependenciesOBJ.flash && !globals.user.flash.installed) {
				log.warning(modPrefs.id + ' - Este módulo precisa de flash para ser instanciado');
				if(callModPrefs) preferences();
				contingency(modPrefs);
				return false;
			}
			
			if(dependenciesOBJ && dependenciesOBJ.js){
				urlsOBJ['js'] = [];
				for(var type in dependenciesOBJ.js){
					var item = dependenciesOBJ.js[type],
						tempType = (type.match(/helpers|plugins/)) ? 'extensions' : type,
						//base = globals.page.baseURL + Library[type].baseDIR;
						base = Library[tempType].baseDIR;
					
					if(typeof(item) == 'string') urlsOBJ['js'].push(globals.stage.coreBaseUrl + item);
					else if(typeof(item) == 'object' && item.length){
						for (var i = 0; i < item.length; i++){
							if(!Library[tempType][item[i]]) {
								log.critical(item[i] + ' - não encontrado na biblioteca '+ type);
								return false;
							}
							var url =  base + Library[tempType][item[i]].scriptPath;
							urlsOBJ['js'].push(url);
						}
					}
					/* alert(
						'type : ' + type +'\n'+
						'itemName : ' + itemName +'\n'+
						'baseURL : ' + baseURL +'\n'
					); */
				}
				//alert(urlsOBJ.toSource());
				tools.Components.set(urlsOBJ, function(){
					var shift = modTypeInProgress.shift();
					//log.checkpoint('chamando internalTimer\n' + modPrefs.id);
					modulesQueue.push(modPrefs);
					if(sameTypeQueue.length) {
						for(var i = 0; i < sameTypeQueue.length; i++){
							modulesQueue.push(sameTypeQueue[i]);
						}
					}
					if(!modTypeInProgress.length) {
						//alert('chamando módulos. logo após ' + modPrefs.id);
						preferences();
					}
				});
			} else {				
				var shift = modTypeInProgress.shift();
				modulesQueue.push(modPrefs);
				if(sameTypeQueue.length) {
					for(var i = 0; i < sameTypeQueue.length; i++){
						modulesQueue.push(sameTypeQueue[i]);
					}
				}
				
				if(!modTypeInProgress.length) {
					preferences();
				}
			}
		}
		
		var play = function() {
			var now = function(modPrefs){
				//alert("play para " + modPrefs.id);
				
				var PARAMS = Interface(modPrefs);
				if (!PARAMS) new contingency(modPrefs);
				else {
					var extraTools = {
						log: new Log.CONSTRUCTOR(modPrefs.id),
						pageReloader:tools.pageReloader
					}
					
					try{
						extraTools.log.checkpoint("Creating new instance.");
						var instance = new Library.modules[modPrefs.id].source.CONSTRUCTOR(jQuery, PARAMS, extraTools);					
						if(!globals.data.instances[modPrefs.id]) globals.data.instances[modPrefs.id] = [];
							globals.data.instances[modPrefs.id].push(instance);
						
						loaded[modPrefs.id + '_' + modPrefs.selector] = true;
					} catch (errorOBJ){
						var msg = ""+
							"Erro ao instanciar módulo: "+modPrefs.id+" \n"+
							'['+errorOBJ.name+'] -> '+errorOBJ.message + "\n" +
							"Arquivo: " + errorOBJ.fileName +'\n'+
							"Linha: " + errorOBJ.lineNumber;
						
						log.critical(msg);
					}
					
					if(!modulesQueue.length && globals.page.lazyLoad) {
						$(window).unbind('scroll');
					}
				}
				
			}
			
			var onViewPort = function(modPrefs){
				if($(modPrefs.selector + ":in-viewport").length) {
					play.now(modPrefs); 
				} else {
					log.checkpoint('scrolling');
					
					$(window).scroll(function() { 		
						if(!loaded[modPrefs.id + '_' + modPrefs.selector] && $(modPrefs.selector + ":in-viewport").length) {
							new play.now(modPrefs);
						}
					});
				}
			}

			return {
				now:now,
				onViewPort:onViewPort
			}
			
		}();
		
		var preferences = function(){
			//alert('em preferences: ' + modulesQueue.length + " itens");
				if(firstLoad){		
					//$(document).ready(function(){
						while(modulesQueue.length){
							var modPrefs = modulesQueue.shift();
							if(globals.page.lazyLoad) new play.onViewPort(modPrefs);
							else play.now(modPrefs);
							
							if(!modulesQueue.length) firstLoad = false;
						}
					//});			
				} else {
					while(modulesQueue.length){
						var modPrefs = modulesQueue.shift();
						play.now(modPrefs);					
					}
				}
		}
		
		var Interface = function (modPrefs){
			log.checkpoint(modPrefs.id + " - Analisando interface.");
			
			
			var moduleOBJ = Library.modules[modPrefs.id].source;
			
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			// Double-check for basic dependencies
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			if(!$(modPrefs.selector).length) {
				log.critical(modPrefs.id+' - Recipiente (DOM element) não encontrado. Favor, verificar seletor e template.');
				return false;
			}
					
			// Checking for module object
			if(!moduleOBJ) {
				log.critical(modPrefs.id + ' - Não foi possível localizar o script para este módulo. Confirme a localização do js e o nome do objeto carregado.' )
				return false;
			}
			
			// Checking for constructor
			if (!moduleOBJ.CONSTRUCTOR){
				log.critical(modPrefs.id + ' - Não foi possível localizar um construtor para este módulo. Verifique se o objeto possui um método chamado "CONSTRUCTOR".' )
				return false;
			}	
			
			// Checking for contingency method
			/* if (!moduleOBJ.CONTINGENCY){
				log.warning(modPrefs.id + ' - Este módulo não possui um método de contingência. Em caso de erros, apenas o procedimento padrão será adotado.' );
			}	 */		
			// Double-check for basic dependencies //
			
			
			var PARAMS = {}; // private object - stores valid params		
		
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			// Validate specific PARAMS
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			if (moduleOBJ.params) {
				var params = {};
				if(modPrefs.params) params = $.extend({}, modPrefs.params);
				
				var defaults = moduleOBJ.params.defaults || {};
				
				if(defaults) params = $.extend(defaults, modPrefs.params);				
				
				if(window.trrConstantData && window.trrConstantData && window.trrConstantData[modPrefs.id]) {
					params =  $.extend(params, window.trrConstantData[modPrefs.id]);	
					var msg = '';
					for (var paramName in window.trrConstantData[modPrefs.id]) {
						if(msg) msg += '<br/>';
						msg += '<strong>'+paramName + '</strong>: ' + window.trrConstantData[modPrefs.id][paramName];
					}
					log.checkpoint('Preservando parâemtros definidos como constantes para o módulo <em>'+modPrefs.id+'</em>, neste contexto:<br/>'+msg);
				}
				
				var required = moduleOBJ.params.required || moduleOBJ.params.needed;
				if (required) {
					// Check if there are instructions for required params (help propertie)
					if (!moduleOBJ.params.helpMsg /*deprecated*/ && !moduleOBJ.params.help) {
						log.critical(modPrefs.id + ' - There are no help instructions for required params. Create an "help" propertie inside that object.');
						return false;
					}
					// if none was set
					if (!params) {
						log.critical(modPrefs.id + ' - Requires some especific params. Documentation: ' + moduleOBJ.params.helpMsg);
						return false;
					}
					for (var paramName in required){
						// Checking if the required param was especified
						if(!params[paramName] && typeof(params[paramName]) != 'boolean' && params[paramName] != 0){
							log.critical(modPrefs.id + ' - Param missing: "' + paramName +'". It also should match this model: ' + required[paramName]);
							return false;
						}
						if(typeof(required[paramName]) == 'string'){
							switch(required[paramName].toLowerCase()){
								// Validating normal strings
								case 'string':
									if (typeof(params[paramName]) == 'string') continue;
									else {
										log.critical(modPrefs.id + ' - ' + paramName + ' should be an string');
										return false;
									}
								break;							
								
								// Validating boolean
								case 'boolean':
									if (typeof(params[paramName]) == 'boolean') continue;
									else {
										log.critical(modPrefs.id + ' - "' + paramName + '" should be boolean');
										return false;
									}
								break;
								
								// Validating number
								case 'number':
									if (typeof(params[paramName]) == 'number') continue;
									else {
										log.critical(modPrefs.id + ' - ' + paramName + ' should be an number');
										return false;
									}
								break;
								
								// Validating array
								case 'array':
									if (typeof(params[paramName]) == 'object' && params[paramName].length) continue;
									else {
										log.critical(modPrefs.id + ' - ' + paramName + ' should be an array');
										return false;
									}
								break;
								
								// if its not one of these, but its still string
								default:
									// Double check for RegExp (FIrefox 2)
									if(required[paramName].exec(params[paramName])) continue;
									log.critical(modPrefs.id + ' - Unknown specified type inside the string "' + paramName + '". Check the constructor object.');
									return false;
								break;
							}
						} else if(typeof(required[paramName]) == 'object' && (/^\/.*\/.*/).exec(required[paramName].toString())) {
							// Validating RegExp
							if(required[paramName].exec(params[paramName])) continue;
							else{
								log.critical(modPrefs.id + ' - ' + paramName + ' should match this RegExp: ' + required[paramName]);
								return false;
							}
						} else {
							// Double check for RegExp (FIrefox 2)
							if(required[paramName].exec(params[paramName])) continue;
							log.critical(modPrefs.id + ' - Unknown specified type for "' + paramName + '". Check the constructor object.');
							return false;
						}
					}
				}
				
				// If everything is alright
				for(var paramName in params){
					PARAMS[paramName] = params[paramName];
				}
				log.checkpoint(modPrefs.id + ' - Parâmetros OK.');
			}
			// Validate specific PARAMS //
			
			
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			// Adjust module language and region
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			PARAMS["LNG"] = {};
			PARAMS["RGN"] = {};
			if (moduleOBJ.locale) {
				// LNG
				if(moduleOBJ.locale.LNG) {
					var primaryLNG = moduleOBJ.locale.LNG[globals.page.lang],
						secondaryLNG = moduleOBJ.locale.LNG[globals.page.locale];
					
					// dealing with exception language definitions (forgiving deprecated ones)
					if(!primaryLNG && globals.page.country == 'BR') primaryLNG = moduleOBJ.locale.LNG['br'];
					else if(!primaryLNG && globals.page.country == 'AR') primaryLNG = moduleOBJ.locale.LNG['ar'];
						
					if(primaryLNG || secondaryLNG) {
						PARAMS["LNG"] = primaryLNG || {};						
						
						if(secondaryLNG) PARAMS["LNG"] = $.extend(primaryLNG, secondaryLNG);
						
						// Check for default specification
						if (!moduleOBJ.locale.defaultLNG) log.warning(modPrefs.id + ' - A propriedade "defaultLNG" não foi encontrada. Este módulo pode não funcionar corretamente em outros idiomas.');
					} else {
						// Check for default specification
						if (!moduleOBJ.locale.defaultLNG) {
							log.critical(modPrefs.id + ' - Não existem variáveis de idioma para "'+globals.user.lang+'". A propriedade "defaultLNG" também não foi definida. ');
							return false;
						}
						else {
							PARAMS["LNG"] = moduleOBJ.locale.LNG[moduleOBJ.locale.defaultLNG.toLowerCase()];
							log.warning(modPrefs.id + ' - Não existem variáveis de idioma para "'+globals.user.lang+'". O padrão foi implementado.')
						}
					}
				} else {
					log.warning(modPrefs.id+ " - O objeto 'LNG' não foi encontrado. Verifique se ele realmente é desnecessário.");
				}
				
				// RGN
				if(moduleOBJ.locale.RGN) {
					if(moduleOBJ.locale.RGN[globals.page.country.toUpperCase()]) {
						PARAMS["RGN"] = moduleOBJ.locale.RGN[globals.page.country.toUpperCase()];
						// Check for default specification
						if (!moduleOBJ.locale.defaultRGN.toUpperCase()) log.warning(modPrefs.id + ' - A propriedade "defaultRGN" não foi encontrada. Este módulo pode não funcionar corretamente em outros idiomas.');
					} else {
						// Check for default specification
						if (!moduleOBJ.locale.defaultRGN.toUpperCase()) {
							log.critical(modPrefs.id + ' - Não existem variáveis de região para "'+globals.page.country+'". A propriedade "defaultRGN" também não foi definida. ');
							return false;
						}
						else {
							PARAMS["RGN"] = moduleOBJ.locale.RGN[moduleOBJ.locale.defaultRGN.toUpperCase()];
							log.warning(modPrefs.id + ' - Não existem variáveis de região para "'+globals.page.country+'". O padrão foi implementado.')
						}
					}
				} else {
					log.warning(modPrefs.id+ " - O objeto 'RGN' não foi encontrado. Verifique se ele realmente é desnecessário.");
				}
				
			}
				
			// Extendind locale objects with controlled vocabulary
			/*
			$.extend(PARAMS['LNG'], controlled.LNG);
			$.extend(PARAMS['RGN'], controlled.RGN); 
			*/
			PARAMS['LNG']['controlled'] = controlled.LNG;
			PARAMS['RGN']['controlled'] = controlled.RGN;
			
			log.checkpoint(modPrefs.id + ' - Configurações de seção (LNG e/ou RGN) foram avaliadas.');			
			// Adjust module language and region //
			
			
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
			// Skin interpretation
			//-+-+-+-+-+-+-+-+-+-+-+-+-+
					
			// Validating skin settings
			if(modPrefs.loadSkin){
				if(!moduleOBJ.skins) {
					log.critical(modPrefs.id + " - o parâmetro 'loadSkin' foi definido como 'true', mas o módulo não possui a propriedade um objeto 'skins'. Certifique-se \que módulo requer arquivos externos para habilitar esta opção.");
					return false;
				}
				
				var skinsOBJ = moduleOBJ.skins;			
				var skin = {};
				// Checking skin presence
				if(modPrefs.skinName && skinsOBJ.items[modPrefs.skinName]) {
					skin.id = modPrefs.skinName;
					log.checkpoint(modPrefs.id + " - Validando skin: " + modPrefs.skinName);
					
				} else if (skinsOBJ.items[skinsOBJ.defaultSkinName]) {				
					skin.id = skinsOBJ.defaultSkinName;
					log.checkpoint(modPrefs.id + " - Validando skin padrão.")
				} else if (skinsOBJ.items[skinsOBJ.backupSkinName]){
					skin.id = skinsOBJ.backupSkinName;
					log.critical(modPrefs.id + " - Validando skin de backup.");
					return false;
				} else {
					if (!skinsOBJ.items[skinsOBJ.defaultSkinName]) {
						log.critical(modPrefs.id + " - O skin padrão não foi localizado. Verifique se o objeto é uma pririedade de 'items' e se o o seu nome tem o sufix 'skn_'.");
						return false;
					}
				}
				
				// Validating skin interface
				var currentSkin = skinsOBJ.items[skin.id]
				if(!currentSkin.tplBody) {
					log.critical(modPrefs.id + " - o parâmetro 'tplBody' não foi encontrado.");
					return false;
				} else {
					if(typeof(currentSkin.tplBody) != 'string') {
						log.critical(modPrefs.id + " - o parâmetro 'tplBody' deve ser uma string contendo a estrutura HTML para o módulo.");
						return false;
					}
				}
				
				// Parsing template
				if (PARAMS["LNG"] || PARAMS["RGN"]) {
					var lngOBJ = (PARAMS["LNG"]) ? PARAMS["LNG"] : false;
					var rgnOBJ = (PARAMS["RGN"]) ? PARAMS["RGN"] : false;
					
					var TPL = tools.parseTPL({LNG:lngOBJ, RGN:rgnOBJ}, currentSkin.tplBody);
				}
				
				// Including styles
				if(currentSkin.css && currentSkin.css.length) {
					var moduleBaseURL = Library.modules.baseDIR + modPrefs.id.toLowerCase().replace('mod','') + '/';
					
					if(typeof(currentSkin.css) == 'string') {
						tools.Components.set({css:moduleBaseURL + currentSkin.css});
					} else {
						var newCssArray = [];
						for(var i = 0; i < currentSkin.css.length;i++){
							var currentCss = moduleBaseURL + currentSkin.css[i];
							newCssArray.push(currentCss);
						}
						tools.Components.set({css:newCssArray});
					}
				}
				
				if(TPL && modPrefs.loadSkin) {
					$(modPrefs.selector).replaceWith(TPL);
					var selectorAttr = TPL.match(/(id=|class=)+('|")[^'"]+['"]/gi)[0];
					var newSelector = ((/id/i).test(selectorAttr)) ? selectorAttr.replace(/(id=)|( )/gi, '#').replace(/['\"]/g,'') : selectorAttr.replace(/(class=)|( )/gi, '.').replace(/['\"]/g,'');
					//alert(newSelector);
				}
			}
			// Deliver recipient
			PARAMS['preLoadedSkin'] = !modPrefs.loadSkin;
			PARAMS['skinName'] = (skin && skin.id) ? skin.id : modPrefs.skinName;
			PARAMS["recipient"] = (newSelector) ? $(newSelector) : $(modPrefs.selector);
			
			// Define loading state
			//PARAMS["recipient"].addClass("loading");
			
			// Applying transition effects
			if(globals.page.transitionEffects) $(modPrefs.selector).hide().fadeIn('slow');
			// Skin interpretation//
			
			//alert(PARAMS.id + '\n' +  $(modPrefs.selector).length);
			return PARAMS;
		}
		
		var contingency = function(modOBJ){
			log.checkpoint(modOBJ.id + ' - Problemas encontratos. Disparando método de contingência.');
			if($(modOBJ.selector).length) {
				var skinsOBJ = Library.modules[modOBJ.id].source.skins;
				var backupSkinName = skinsOBJ.backupSkinName;
				if(backupSkinName && skinsOBJ.items[backupSkinName]){
					log.checkpoint(modOBJ.id + ' - Incluindo template de backup - ' + skinsOBJ.backupSkinName);
					
					tools.Components.set(skinsOBJ.items[backupSkinName].css, function(){
						$(modOBJ.selector).html(skinsOBJ.items[backupSkinName].tplBody);
					});
					
					
				} else $(modOBJ.selector).html('Um problema foi detectado neste módulo.');
			}
			else log.critical(modOBJ.id + ' - Não foi possível localizar um elemento HTML para receber o template de backup.');
		}
		
		return {
			modules:modules
		}
	}();
	
	// Public //
	
	var start = function(setupOBJ){
		
		//-+-+-+-+-+-+-+-+-+-+-+-+
		// Parsing configs
		//-+-+-+-+-+-+-+-+-+-+-+-+
		if(setupOBJ.configs) {
			var version = setupOBJ.configs.coreVersion || details.coreVersion;

			if(setupOBJ.configs.reloadInterval) tools.pageReloader.on(setupOBJ.configs.reloadInterval);

			if(setupOBJ.configs.locale && typeof(setupOBJ.configs.locale) == 'string') {
				var localeLevels = setupOBJ.configs.locale.match(/\w\w/gi);
				
				// forgiving country definition
				if(localeLevels.length == 1 && Regions[localeLevels[0].toUpperCase()]){
					var correctCountry = Regions[localeLevels[0].toUpperCase()].isoCode;
					localeLevels[1] = correctCountry;
					localeLevels[0] = Regions[correctCountry].lang;
				}
				
				globals.page.lang = localeLevels[0].toLowerCase();
				
				
				if(typeof(localeLevels[1]) == 'string' && localeLevels[1].match(/es/i))  localeLevels[1] = globals.page.country;
				if(localeLevels[1]) globals.page.country = localeLevels[1].toUpperCase();			
			
			} else { // deprecated params
				if(setupOBJ.configs.pageCountry && typeof(setupOBJ.configs.pageCountry) == 'string' && setupOBJ.configs.pageCountry.toLowerCase() != 'auto') globals.page.country = setupOBJ.configs.pageCountry.toUpperCase();
				if(setupOBJ.configs.pageLang && typeof(setupOBJ.configs.pageLang) == 'string' && setupOBJ.configs.pageLang.toLowerCase() != 'auto') {	
					var lngLevels = setupOBJ.configs.pageLang.match(/\w\w/gi);
					globals.page.lang = lngLevels[0].toLowerCase();
					if(lngLevels[1]) {
						globals.page.lang += '-' + lngLevels[1].toUpperCase();
						globals.page.country = lngLevels[1].toUpperCase();
					}
				}
			}
			globals.page.locale = globals.page.lang + '-' + globals.page.country;
			
			if(!globals.stage.type.match(/HLG|DSV/) && setupOBJ.configs.pageCountry && !setupOBJ.configs.baseURL) globals.stage.coreBaseUrl = details.prdBaseDomain + details.portalDir + details.coreVersion + '/'  + details.coreDirPath;
			
			if(setupOBJ.configs.baseURL) {
				globals.page.baseURL = setupOBJ.configs.baseURL.replace(/(\/core)?\/?$/,'') + '/';
				globals.stage.coreBaseUrl = globals.page.baseURL.replace(/\/(atm|portal)\/.*/,'') + '/' + details.portalDir + details.coreVersion + '/' + details.coreDirPath;
			}
			
			if(setupOBJ.configs.lazyLoad) {
				$.include(globals.stage.coreBaseUrl + '/_js/jquery.viewport.js');
				globals.page.lazyLoad = true;
			}
			
			globals.page.transitionEffects = setupOBJ.configs.transitionEffects;
		}
		
		$.ImportBasePath = globals.stage.coreBaseUrl;
		if($.browser.safari) $.useBrowserCache = false;
		
		// Set locale objects
		errorMsgs = (errorMsgs[globals.user.lang]) ? errorMsgs[globals.user.lang] : errorMsgs[globals.user.lang];
		controlled.LNG = (controlled.LNG[globals.page.lang]) ? controlled.LNG[globals.page.lang] : controlled.LNG[controlled.defaultLNG.toLowerCase()];
		controlled.RGN = (controlled.RGN[globals.page.country]) ? controlled.RGN[globals.page.country] : controlled.RGN[controlled.defaultRGN.toUpperCase()];
		
		// Habilitando exception locales em CSS (exceto BR)
		if(globals.page.country != 'BR') {
			
			// primary language class
			if(globals.page.lang.match(/ar/i)) $(document.body).addClass('LNG_es' ).addClass('LNG_es-AR' ); // AR extends ES
			else $(document.body).addClass('LNG_' + globals.page.locale.match(/\w\w/g)[0]);
			
			// locale language class - always extends primary language class
			$(document.body).addClass('LNG_'+globals.page.locale);		
			
			// defined country class
			$(document.body).addClass('RGN_' + globals.page.country);
		}		
	
		if(setupOBJ.modules) load.modules(setupOBJ.modules);
		
		return modMan.start = load.modules;
	}
	
	
	var help = function(){
		if (!log.console.active) tools.console();
		var publicMethods = [];
		for(method in tools){
			if(method != 'help') publicMethods.push(method);
		}
		var msg = ""+
		"Total de métodos transversais: " + (publicMethods.length)+".\n"+
		"São eles: " + publicMethods.join(', ') + ".";
		log.help(msg);
	}
	
	var observer = {
		list:{}, // stores cross-component methods
		set:function(name, method){
			if(!this.list[name]) this.list[name] = [];
			
			this.list[name].push(method);
		},
		play:function(name){
			if (this.list[name]) {
				for(var no = 0; no < this.list[name].length; no++){
					this.list[name][no].call();
				}
			} else log.warning(LNG.couldntFondMethodsFor + ' "' + name + '"');
		}
	}
	return {
		require:require,
		globals:globals,
		library:library,
		start:start,
		load:load.modules,
		log:log,
		tools:tools,
		help:help
	}
}(jQuery);

} catch (errorOBJ){
	
	errorOBJ.message = ""+
		"Um erro foi encontrado no código da classe 'ModMan'. Detalhes: \n"+
		'['+errorOBJ.name+'] -> '+errorOBJ.message + "\n" +
		"Arquivo: " + (errorOBJ.fileName || errorOBJ.sourceURL || errorOBJ.url || 'core.modMan.js')+'\n'+
		"Linha: " + (errorOBJ.lineNumber || errorOBJ.line || errorOBJ.number);
		
	if(errorOBJ.stack || errorOBJ.stacktrace) errorOBJ.messsage += '\nStack: '+(errorOBJ.stack || errorOBJ.stacktrace);
	
	if(window.modMan) modMan.tool.log.critical(errorOBJ.message);
	else throw new Error(errorOBJ.message);
}