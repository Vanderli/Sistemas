/*
 * @author Alexandre Magno
 * @description Converte o xml do Globo Shopping em uma lista para ser usada no widget de shopping
 *
 */
jQuery.fn.shopping = function(url, limit,callback) {

    return this.each(function() {
        var self = this;
        $.ajax({
            type : "GET",
            url : url,
            dataType : "xml",
            success : function(xml) {
                itens = $.xml2json(xml,status);
                var lim = limit || itens.oferta.length;
                var html='';
                for(var index = 0; index < lim; index++){
                    var oferta = itens.oferta[index];
                    html +='<li><a href="'+ oferta.urldestino +'"><img class="foto" src="' + oferta.urlimagem + '" /></a><div class="dados-produto"><p class="loja">' + oferta.loja + '</p><p class="produto">' + oferta.nome + '</p><p class="preco">' + oferta.preco + '</p></div></li>';
                }
                $(self).html(html);
                if(typeof callback == 'function') {
                    callback.call(self,status);
                }
            },
            error: function(xhr,status) {
                if(typeof callback == 'function') {
                    callback.call(self,status);
                }
            }
        });
    });
};
