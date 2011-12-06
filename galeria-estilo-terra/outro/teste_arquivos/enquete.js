var RecaptchaOptions = {
    theme : 'custom',
    lang : 'pt',
    custom_theme_widget : 'recaptcha_widget'
};

var enquete = {
    estado: null,
    popin : null,
    validar_enquete : null,
    opcoesPopin: {
        autoOpen: true,
        modal: true,
        draggable: false,
        width: 500,
        zIndex: 100000,
        title: 'Interatividade',
        dialogClass: 'enquete-popin-container'
    },
    init: function(handler, target, url,estado) {
        this.eventoAdicionar(handler);
        this.popin = $(target);
        this.eventoResultadoParcial();
        this.url = url;
        this.estado = estado;
        this.captchaReload();
        if(estado === 'encerrada') {
            $('.visualizar-enquete .encerrada').bind('click',function(){
                return false;
            });
        }
    },
    captchaReload: function() {
        $('#recaptcha_reload').unbind('click.enquete').bind('click.enquete',function(){
            Recaptcha.reload();
            return false;
        });
    },
    desativarConfirmacao: function() {
        var $confirmacao = $('.confirmacao','.enquete-popin-container');
        $confirmacao.css('opacity','0.6');
        $('.respostas input:radio','.enquete-popin-container').bind('change',function(){
            $confirmacao.css('opacity','1');
        });
    },
    gerarPopin: function() {
        var self = this;
        var opcoes = $.extend(this.opcoesPopin, {
            beforeclose: function(e){
                self.limpa_formulario();
                self.popin.dialog('destroy');
                return false;
            },
            open: function(event,ui) {
                self.validarVoto();
                $('.acoes .votar a','.enquete-popin').unbind('click.enquete').bind('click.enquete',function(){
                    $('#enviar_enquete').submit();
                    return false;
                });
                self.desativarConfirmacao();
            }
        });
        
        this.popin.dialog(opcoes);
    },
    limpa_formulario:function(){
        var self = this;
        Recaptcha.reload();
        self.validar_enquete.resetForm();
        //bug no validate que nao reseta as classes usadas no highlight e unhighlight
        $('#recaptcha_response_field').parent().removeClass('campo-error');
    },
    eventoAdicionar: function(handler) {
        var self = this;
        $(handler).unbind('click.enquete').bind('click.enquete',function(){
            self.gerarPopin();
            return false;
        });
    },
    eventoResultadoParcial: function(){
        var self = this;
        var botaoResultadoParcial = $('.resultado-parcial a');

        botaoResultadoParcial.click(function(){
            $.get(self.url, function(data){
                var $resultado = $('.enquete-popin-resultado');

                var opcoes = $.extend(self.opcoesPopin, {
                    title: self.estado=='encerrada'? 'Vota&ccedil;&otilde;es Encerradas!': 'Interatividade',
                    beforeclose: function(e){
                        $resultado.dialog('destroy');
                        return false;
                    }
                });

                $resultado
                    .html(self.resultadoTemplate(data))
                    .dialog(opcoes);
            });

            return false;
        });
    },
    resultadoTemplate:function(data){
        var template = '<div class="resultado-container">'+
                    '<p class="pergunta">'+data.enquete.dados.pergunta+'</p>'+
                    '<ul class="respostas">';
                    var opcoes = data.enquete.opcoes;
                    for (var i=0; i < opcoes.length; i++){

                        var ultimo = i + 1 == opcoes.length ? 'class=ultimo' : '';
                        template +=  '<li '+ ultimo +' ><p class="resposta"><span class="percentual" >'+opcoes[i].percentual+'% </span><span class="item-resposta">'+opcoes[i].resposta+'</span></p></li>';
                    }
                    template += '</ul></div>';
                    return template;
    },
    validarVoto: function() {
        var self = this;
        var config = {
               focusInvalid: false,
               onkeyup: false,
               onfocusout: false,
               onclick: false,
               errorElement: 'p',
               rules: {
                   opcao_id : {
                       required: true
                   },
                   recaptcha_response_field : 'required'
               },
               messages: {
                   opcao_id: 'Selecione uma op&ccedil;&atilde;o de resposta',
                   recaptcha_response_field: 'Por favor, preencha os caracteres ao lado'
               },
               highlight: function(element,errorClass) {
                   $(element).addClass(errorClass);
                   var parent = $(element).parent();
                   if(parent.hasClass('caracteres-container')) parent.addClass('campo-error');
              },
              unhighlight: function(element,errorClass) {
                   $(element).removeClass(errorClass);
                   var parent = $(element).parent();
                   if(parent.hasClass('caracteres-container')) parent.removeClass('campo-error');
              },
               errorPlacement: function(error, element) {
                    if($(element).attr('type') == 'radio') {
                        error.insertAfter($('.enquete-popin .respostas'));
                    } else {
                        error.insertAfter($(element).parent());
                    }
               },
               submitHandler: self.enviar_voto

        };
        self.validar_enquete = $('#enviar_enquete').validate(config);
    },
    enviar_voto: function(form) {
        var self = this;
        $(form).ajaxSubmit({
            type: 'get',
            dataType: 'jsonp',
            success: function (data) {
                var $enquete = $('.enquete-popin');
                var $popinMsg = $('.enquete-popin-mensagens');
                var opcoes = $.extend(enquete.opcoesPopin, {
                    beforeclose: function(e){
                        $popinMsg.dialog('destroy');
                        return false;
                    }
                });

                if(data.toString() === 'recaptcha invalido') {
                    enquete.validar_enquete.showErrors({
                        'recaptcha_response_field' : 'Os caracteres digitados est&atilde;o incorretos'
                    });
                    $('#recaptcha_reload').trigger('click.enquete');

                } else if(data.toString() === 'ok') {
                    $enquete.dialog('close');
                    $popinMsg
                        .html('<p>Voto computado com sucesso</p>')
                        .dialog(opcoes);
                } else {
                    $enquete.dialog('close');
                    $popinMsg
                        .html('<p>N&atilde;o foi poss&iacute;vel computar seu voto.</p>')
                        .dialog(opcoes);
                }
            }
        });
        return false;
    }
};
