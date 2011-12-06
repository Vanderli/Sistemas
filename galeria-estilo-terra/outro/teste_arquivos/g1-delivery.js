/*
 * jQuery Form Plugin
 * version: 2.07 (03/04/2008)
 * @requires jQuery v1.2.2 or later
 *
 * Examples at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
 (function($) {
/**
 * ajaxSubmit() provides a mechanism for submitting an HTML form using AJAX.
 *
 * ajaxSubmit accepts a single argument which can be either a success callback function
 * or an options Object.  If a function is provided it will be invoked upon successful
 * completion of the submit and will be passed the response from the server.
 * If an options Object is provided, the following attributes are supported:
 *
 *  target:   Identifies the element(s) in the page to be updated with the server response.
 *            This value may be specified as a jQuery selection string, a jQuery object,
 *            or a DOM element.
 *            default value: null
 *
 *  url:      URL to which the form data will be submitted.
 *            default value: value of form's 'action' attribute
 *
 *  type:     The method in which the form data should be submitted, 'GET' or 'POST'.
 *            default value: value of form's 'method' attribute (or 'GET' if none found)
 *
 *  data:     Additional data to add to the request, specified as key/value pairs (see $.ajax).
 *
 *  beforeSubmit:  Callback method to be invoked before the form is submitted.
 *            default value: null
 *
 *  success:  Callback method to be invoked after the form has been successfully submitted
 *            and the response has been returned from the server
 *            default value: null
 *
 *  dataType: Expected dataType of the response.  One of: null, 'xml', 'script', or 'json'
 *            default value: null
 *
 *  semantic: Boolean flag indicating whether data must be submitted in semantic order (slower).
 *            default value: false
 *
 *  resetForm: Boolean flag indicating whether the form should be reset if the submit is successful
 *
 *  clearForm: Boolean flag indicating whether the form should be cleared if the submit is successful
 *
 *
 * The 'beforeSubmit' callback can be provided as a hook for running pre-submit logic or for
 * validating the form data.  If the 'beforeSubmit' callback returns false then the form will
 * not be submitted. The 'beforeSubmit' callback is invoked with three arguments: the form data
 * in array format, the jQuery object, and the options object passed into ajaxSubmit.
 * The form data array takes the following form:
 *
 *     [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * If a 'success' callback method is provided it is invoked after the response has been returned
 * from the server.  It is passed the responseText or responseXML value (depending on dataType).
 * See jQuery.ajax for further details.
 *
 *
 * The dataType option provides a means for specifying how the server response should be handled.
 * This maps directly to the jQuery.httpData method.  The following values are supported:
 *
 *      'xml':    if dataType == 'xml' the server response is treated as XML and the 'success'
 *                   callback method, if specified, will be passed the responseXML value
 *      'json':   if dataType == 'json' the server response will be evaluted and passed to
 *                   the 'success' callback, if specified
 *      'script': if dataType == 'script' the server response is evaluated in the global context
 *
 *
 * Note that it does not make sense to use both the 'target' and 'dataType' options.  If both
 * are provided the target will be ignored.
 *
 * The semantic argument can be used to force form serialization in semantic order.
 * This is normally true anyway, unless the form contains input elements of type='image'.
 * If your form must be submitted with name/value pairs in semantic order and your form
 * contains an input of type='image" then pass true for this arg, otherwise pass false
 * (or nothing) to avoid the overhead for this logic.
 *
 *
 * When used on its own, ajaxSubmit() is typically bound to a form's submit event like this:
 *
 * $("#form-id").submit(function() {
 *     $(this).ajaxSubmit(options);
 *     return false; // cancel conventional submit
 * });
 *
 * When using ajaxForm(), however, this is done for you.
 *
 * @example
 * $('#myForm').ajaxSubmit(function(data) {
 *     alert('Form submit succeeded! Server returned: ' + data);
 * });
 * @desc Submit form and alert server response
 *
 *
 * @example
 * var options = {
 *     target: '#myTargetDiv'
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc Submit form and update page element with server response
 *
 *
 * @example
 * var options = {
 *     success: function(responseText) {
 *         alert(responseText);
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc Submit form and alert the server response
 *
 *
 * @example
 * var options = {
 *     beforeSubmit: function(formArray, jqForm) {
 *         if (formArray.length == 0) {
 *             alert('Please enter data.');
 *             return false;
 *         }
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc Pre-submit validation which aborts the submit operation if form data is empty
 *
 *
 * @example
 * var options = {
 *     url: myJsonUrl.php,
 *     dataType: 'json',
 *     success: function(data) {
 *        // 'data' is an object representing the the evaluated json data
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc json data returned and evaluated
 *
 *
 * @example
 * var options = {
 *     url: myXmlUrl.php,
 *     dataType: 'xml',
 *     success: function(responseXML) {
 *        // responseXML is XML document object
 *        var data = $('myElement', responseXML).text();
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc XML data returned from server
 *
 *
 * @example
 * var options = {
 *     resetForm: true
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc submit form and reset it if successful
 *
 * @example
 * $('#myForm).submit(function() {
 *    $(this).ajaxSubmit();
 *    return false;
 * });
 * @desc Bind form's submit event to use ajaxSubmit
 *
 *
 * @name ajaxSubmit
 * @type jQuery
 * @param options  object literal containing options which control the form submission process
 * @cat Plugins/Form
 * @return jQuery
 */
$.fn.ajaxSubmit = function(options) {
    
    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location.toString(),
        type: this.attr('method') || 'GET'
    }, options || {});

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) return this;

    var a = this.formToArray(options.semantic);
    //alert(">>> "+a);
	
	if (options.data) {
        options.extraData = options.data;
		for (var n in options.data)
            a.push( { name: n, value: options.data[n], id: id } );
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) return this;

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) return this;

    var q = $.param(a);

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  // data is null for 'get'
    }
    else
        options.data = q; // data is the query string for 'post'

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
        var oldSuccess = options.success || function(){};
        callbacks.push(function(data) {
            $(options.target).html(data).each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i](data, status, $form);
    };

    // are there files to upload?
    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j])
            found = true;

    // options.iframe allows user to force iframe mode
   if (options.iframe || found) { 
       // hack to fix Safari hang (thanks to Tim Molendijk for this)
       // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
       if ($.browser.safari && options.closeKeepAlive)
           $.get(options.closeKeepAlive, fileUpload);
       else
           fileUpload();
       }
   else
       $.ajax(options);

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUpload() {
        var form = $form[0];
        var opts = $.extend({}, $.ajaxSettings, options);

        var id = 'jqFormIO' + (new Date().getTime());
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];
        var op8 = $.browser.opera && window.opera.version() < 9;
        if ($.browser.msie || op8) io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {}
        };

        var g = opts.global;
        // trigger ajax global events so that activity/block indicators work like normal
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);

        var cbInvoked = 0;
        var timedOut = 0;

        // take a breath so that pending repaints get some cpu time before the upload starts
        setTimeout(function() {
            // make sure form attrs are set
            var t = $form.attr('target'), a = $form.attr('action');
            $form.attr({
                target:   id,
                encoding: 'multipart/form-data',
                enctype:  'multipart/form-data',
                method:   'POST',
                action:   opts.url
            });

            // support timout
            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            // add "extra" data to form if provided in options
            var extraInputs = [];
            try {
                if (options.extraData)
                    for (var n in options.extraData)
                        extraInputs.push(
                            $('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
                                .appendTo(form)[0]);
            
                // add iframe to doc and submit the form
                $io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                form.submit();
            }
            finally {
                // reset attrs and remove "extra" input elements
                $form.attr('action', a);
                t ? $form.attr('target', t) : $form.removeAttr('target');
                $(extraInputs).remove();
            }
        }, 10);

        function cb() {
            if (cbInvoked++) return;

            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;
                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                xhr.getResponseHeader = function(header){
                    var headers = {'content-type': opts.dataType};
                    return headers[header];
                };

                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    xhr.responseText = ta ? ta.value : xhr.responseText;
                    if (xhr.responseText.indexOf('<pre>') > -1 && $(xhr.responseText).html()) {
                        xhr.responseText = ta ? ta.value : $(xhr.responseText).html();
                    }
                }
                else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                    xhr.responseXML = toXml(xhr.responseText);
                }
                data = $.httpData(xhr, opts.dataType);
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }

            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            // clean up
            setTimeout(function() {
                $io.remove();
                xhr.responseXML = null;
            }, 100);
        };

        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * Note that for accurate x/y coordinates of image submit elements in all browsers
 * you need to also use the "dimensions" plugin (this method will auto-detect its presence).
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.  See ajaxSubmit for a full description of the options argument.
 *
 *
 * @example
 * var options = {
 *     target: '#myTargetDiv'
 * };
 * $('#myForm').ajaxSForm(options);
 * @desc Bind form's submit event so that 'myTargetDiv' is updated with the server response
 *       when the form is submitted.
 *
 *
 * @example
 * var options = {
 *     success: function(responseText) {
 *         alert(responseText);
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc Bind form's submit event so that server response is alerted after the form is submitted.
 *
 *
 * @example
 * var options = {
 *     beforeSubmit: function(formArray, jqForm) {
 *         if (formArray.length == 0) {
 *             alert('Please enter data.');
 *             return false;
 *         }
 *     }
 * };
 * $('#myForm').ajaxSubmit(options);
 * @desc Bind form's submit event so that pre-submit callback is invoked before the form
 *       is submitted.
 *
 *
 * @name   ajaxForm
 * @param  options  object literal containing options which control the form submission process
 * @return jQuery
 * @cat    Plugins/Form
 * @type   jQuery
 */
$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().bind('submit.form-plugin',function() {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function() {
        // store options in hash
        $(":submit,input:image", this).bind('click.form-plugin',function(e) {
            var $form = this.form;
            $form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    $form.clk_x = e.offsetX;
                    $form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $(this).offset();
                    $form.clk_x = e.pageX - offset.left;
                    $form.clk_y = e.pageY - offset.top;
                } else {
                    $form.clk_x = e.pageX - this.offsetLeft;
                    $form.clk_y = e.pageY - this.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function() { $form.clk = $form.clk_x = $form.clk_y = null; }, 10);
        });
    });
};


/**
 * ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
 *
 * @name   ajaxFormUnbind
 * @return jQuery
 * @cat    Plugins/Form
 * @type   jQuery
 */
$.fn.ajaxFormUnbind = function() {
    this.unbind('submit.form-plugin');
    return this.each(function() {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });

};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 *
 * The semantic argument can be used to force form serialization in semantic order.
 * This is normally true anyway, unless the form contains input elements of type='image'.
 * If your form must be submitted with name/value pairs in semantic order and your form
 * contains an input of type='image" then pass true for this arg, otherwise pass false
 * (or nothing) to avoid the overhead for this logic.
 *
 * @example var data = $("#myForm").formToArray();
 * $.post( "myscript.cgi", data );
 * @desc Collect all the data from a form and submit it to the server.
 *
 * @name formToArray
 * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
 * @type Array<Object>
 * @cat Plugins/Form
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
	
    for(var i=0, max=els.length; i < max; i++) {
        var el 	= els[i];
        var n 	= el.name;
		var id 	= el.id;
		if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x, id: id+'.x'}, {name: n+'.y', value: form.clk_y, id: id+'.y'});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j], id: id[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v, id: id});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x, id: id+'.x'}, {name: n+'.y', value: form.clk_y, id: id+'.y'});
        }
    }
	
    return a;
};


/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 *
 * The semantic argument can be used to force form serialization in semantic order.
 * If your form must be submitted with name/value pairs in semantic order then pass
 * true for this arg, otherwise pass false (or nothing) to avoid the overhead for
 * this logic (which can be significant for very large forms).
 *
 * @example var data = $("#myForm").formSerialize();
 * $.ajax('POST', "myscript.cgi", data);
 * @desc Collect all the data from a form into a single string
 *
 * @name formSerialize
 * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
 * @type String
 * @cat Plugins/Form
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};


/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 *
 * The successful argument controls whether or not serialization is limited to
 * 'successful' controls (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.
 *
 * @example var data = $("input").fieldSerialize();
 * @desc Collect the data from all successful input elements into a query string
 *
 * @example var data = $(":radio").fieldSerialize();
 * @desc Collect the data from all successful radio input elements into a query string
 *
 * @example var data = $("#myForm :checkbox").fieldSerialize();
 * @desc Collect the data from all successful checkbox input elements in myForm into a query string
 *
 * @example var data = $("#myForm :checkbox").fieldSerialize(false);
 * @desc Collect the data from all checkbox elements in myForm (even the unchecked ones) into a query string
 *
 * @example var data = $(":input").fieldSerialize();
 * @desc Collect the data from all successful input, select, textarea and button elements into a query string
 *
 * @name fieldSerialize
 * @param successful true if only successful controls should be serialized (default is true)
 * @type String
 * @cat Plugins/Form
 */
$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};


/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 *
 * @example var data = $("#myPasswordElement").fieldValue();
 * alert(data[0]);
 * @desc Alerts the current value of the myPasswordElement element
 *
 * @example var data = $("#myForm :input").fieldValue();
 * @desc Get the value(s) of the form elements in myForm
 *
 * @example var data = $("#myForm :checkbox").fieldValue();
 * @desc Get the value(s) for the successful checkbox element(s) in the jQuery object.
 *
 * @example var data = $("#mySingleSelect").fieldValue();
 * @desc Get the value(s) of the select control
 *
 * @example var data = $(':text').fieldValue();
 * @desc Get the value(s) of the text input or textarea elements
 *
 * @example var data = $("#myMultiSelect").fieldValue();
 * @desc Get the values for the select-multiple control
 *
 * @name fieldValue
 * @param Boolean successful true if only the values for successful controls should be returned (default is true)
 * @type Array<String>
 * @cat Plugins/Form
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If the given element is not
 * successful and the successful arg is not false then the returned value will be null.
 *
 * Note: If the successful flag is true (default) but the element is not successful, the return will be null
 * Note: The value returned for a successful select-multiple element will always be an array.
 * Note: If the element has no value the return value will be undefined.
 *
 * @example var data = jQuery.fieldValue($("#myPasswordElement")[0]);
 * @desc Gets the current value of the myPasswordElement element
 *
 * @name fieldValue
 * @param Element el The DOM element for which the value will be returned
 * @param Boolean successful true if value returned must be for a successful controls (default is true)
 * @type String or Array<String> or null or undefined
 * @cat Plugins/Form
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};


/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 *
 * @example $('form').clearForm();
 * @desc Clears all forms on the page.
 *
 * @name clearForm
 * @type jQuery
 * @cat Plugins/Form
 */
$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

/**
 * Clears the selected form elements.  Takes the following actions on the matched elements:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 *
 * @example $('.myInputs').clearFields();
 * @desc Clears all inputs with class myInputs
 *
 * @name clearFields
 * @type jQuery
 * @cat Plugins/Form
 */
$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};


/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 *
 * @example $('form').resetForm();
 * @desc Resets all forms on the page.
 *
 * @name resetForm
 * @type jQuery
 * @cat Plugins/Form
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};


/**
 * Enables or disables any matching elements.
 *
 * @example $(':radio').enabled(false);
 * @desc Disables all radio buttons
 *
 * @name select
 * @type jQuery
 * @cat Plugins/Form
 */
$.fn.enable = function(b) { 
    if (b == undefined) b = true;
    return this.each(function() { 
        this.disabled = !b 
    });
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 *
 * @example $(':checkbox').select();
 * @desc Checks all checkboxes
 *
 * @name select
 * @type jQuery
 * @cat Plugins/Form
 */
$.fn.select = function(select) {
    if (select == undefined) select = true;
    return this.each(function() { 
        var t = this.type;
        if (t == 'checkbox' || t == 'radio')
            this.checked = select;
        else if (this.tagName.toLowerCase() == 'option') {
            var $sel = $(this).parent('select');
            if (select && $sel[0] && $sel[0].type == 'select-one') {
                // deselect all other options
                $sel.find('option').select(false);
            }
            this.selected = select;
        }
    });
};

})(jQuery);/*
 * jQuery validation plug-in 1.6
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}var validator=$.data(this[0],'validator');if(validator){return validator;}validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}this.submit(function(event){if(validator.settings.debug)event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}return false;}return true;}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}return handle();}else{validator.focusInvalid();return false;}});}return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend({},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}if(params.constructor!=Array){params=[params];}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)this.element(element);else if(element.parentNode.name in this.submitted)this.element(element.parentNode)},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator");validator.settings["on"+event.type]&&validator.settings["on"+event.type].call(validator,this[0]);}$(this.currentForm).delegate("focusin focusout keyup",":text, :password, :file, select, textarea",delegate).delegate("click",":radio, :checkbox, select, option",delegate);if(this.settings.invalidHandler)$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus();}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}if(dependencyMismatch)return;if(this.objectLength(rules))this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)return arguments[i];}return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}if(!this.labelContainer.append(label).length)this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))return this.findByName(element.name).filter(':checked').length;}return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}if(rules.messages){delete rules.messages}return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=(previous.message=response||validator.defaultMessage(element,"remote"));errors[element.name]=$.isFunction(message)?message(value):message;validator.showErrors(errors);}previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))return"dependency-mismatch";if(/[^0-9-]+/.test(value))return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)nDigit-=9;}nCheck+=nDigit;bEven=!bEven;}return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}return(pendingRequests[port]=ajax.apply(this,arguments));}return ajax.apply(this,arguments);};})(jQuery);;(function($){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){if($.browser.msie)return false;this.addEventListener(original,$.event.special[fix].handler,true);},teardown:function(){if($.browser.msie)return false;this.removeEventListener(original,$.event.special[fix].handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};});$.extend($.fn,{delegate:function(type,delegate,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});},triggerEvent:function(type,target){return this.triggerHandler(type,[$.event.fix({type:type,target:target})]);}})})(jQuery);$(function() {
	$(".materia-impressao a").click(function() { 
		window.print();
		return false;
	});
	$(".compartilhar .btn-compartilhar").toggle(
		function() { 
			$(".compartilhar ul").show();
			$(this).css("background-position", "0 -40px");
		},
		function() { 
			$(".compartilhar ul").hide();
			$(this).css("background-position", "0 0");
		}
	);

	$('#input-link-ferramentas').click(function() {
		$(this).select();
	});
});if (!this.JSON) {

// Create a JSON object only if one does not already exist. We create the
// object in a closure to avoid creating global variables.

    JSON = function () {

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            escapeable.lastIndex = 0;
            return escapeable.test(string) ?
                '"' + string.replace(escapeable, function (a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    return '\\u' + ('0000' +
                            (+(a.charCodeAt(0))).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        }


        function str(key, holder) {

// Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

// What happens next depends on the value's type.

            switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// If the object has a dontEnum length property, we'll treat it as an array.

                if (typeof value.length === 'number' &&
                        !(value.propertyIsEnumerable('length'))) {

// The object is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                                partial.join(',\n' + gap) + '\n' +
                                    mind + ']' :
                              '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                            mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }

// Return the JSON object containing the stringify and parse methods.

        return {
            stringify: function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

// If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                        (typeof replacer !== 'object' ||
                         typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

                return str('', {'': value});
            },


            parse: function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' + ('0000' +
                                (+(a.charCodeAt(0))).toString(16)).slice(-4);
                    });
                }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function' ?
                        walk({'': j}, '') : j;
                }

// If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            }
        };
    }();
}var tab_selected = 0;
$(document).ready(function() {
    
    $(".maisvistas > .ui-tabs").tabs({
        cache: true,
        cookie: {
            expires: 30
        }
    });
    
    var $tooltipTemplate = $([
            '<div class="maisvistas-tooltip destaque">',
                '<a>',
                    '<div class="foto">',
                        '<span class="canto-ce"></span>',
                        '<span class="canto-cd"></span>',
                        '<span class="canto-re"></span>',
                        '<span class="canto-rd"></span>',
                    '</div>',
                    '<div class="texto"><span class="descricao"></span></div>',
                '</a>',
            '</div>'
        ].join(""));
        
    $(".maisvistas-fotos, .maisvistas-videos").each(function() {
        var $container = $(this);
            
            function handlerContainerLeave(event) {
                $container.find(".maisvistas-tooltip").stop().hide();
            }
            
            function handlerImageOver(event) {
                var that = this,
                    $thisImage = $(this),
                    $imageList = $thisImage.parents("ul:first"),
                    $tooltip = $container.find(".maisvistas-tooltip"),
                    $tooltipLink = $tooltip.children(),
                    $tooltipDivImage = $tooltipLink.children(".foto"),
                    $tooltipImage = $thisImage.clone(),
                    $tooltipText =  $tooltipLink.children(".texto"),
                    $tooltipNumber = $tooltipText.children(".numero"),
                    $tooltipDescription = $tooltipText.children(".descricao"),
                    positions = $thisImage.parents(".foto").position(),
                    dimensions = {height: $thisImage.height(), width: $thisImage.width()},
                    resizeFactor = 0.04,
                    finalWidth = dimensions.width + parseInt((dimensions.width * resizeFactor).toFixed(0), 10),
                    finalHeight = dimensions.height + parseInt((dimensions.height * resizeFactor).toFixed(0), 10),
                    imageMargin = 4,
                    textHeight = 54,
                    itemNum = 0,
                    inverted = false,
                    invertedModifier;
                
                $tooltip
                    .attr("className", "")
                    .addClass("maisvistas-tooltip")
                    .addClass($imageList.attr("className"));
                    
                switch ($thisImage.attr("className")) {
                    case "fotoPequena":
                        $tooltip.addClass("inverted");
                        inverted = true;
                        $tooltip.addClass("bg2");
                        break;
                        
                    case "fotoMedia":
                        $tooltip.addClass("bg3");
                        break;
                        
                    case "videoPequeno":
                        $tooltip.addClass("inverted");
                        inverted = true;
                        $tooltip.addClass("bg1");
                        break;
                        
                    case "videoGrande":
                        $tooltip.addClass("bg4");
                        break;
                }
                
                invertedModifier = (inverted === true ? 60 : 0);
                
                $imageList.find("img").each(function(i, o) {
                    if (that === o) {
                        itemNum = i;
                    }
                });
                
                
                $tooltip
                    .stop()
                    .css({
                        "top": (positions.top - (finalHeight - dimensions.height) / 2).toFixed(0) - 5 - invertedModifier,
                        "left": (positions.left - (finalWidth - dimensions.width) / 2).toFixed(0) - 4,
                        "height": finalHeight + (imageMargin * 2) + textHeight + (inverted === true ? 7 : 0),
                        "width": (inverted === true ? finalWidth + (imageMargin * 2.0): finalWidth + (imageMargin * 2)),
                        "display": "block",
                        "opacity": 0
                    })
                    .animate({
                        "opacity": 1
                    });
                
                    
                $tooltipLink
                    .attr({
                        "href": $thisImage.parent().attr("href"),
                        "title": $thisImage.attr("alt")
                    });
                    
                    
                $tooltipDivImage
                    .css({
                        "top": imageMargin + invertedModifier,
                        "left": imageMargin,
                        "height": finalHeight,
                        "width": finalWidth
                    })
                    .children("img")
                        .remove()
                    .end()
                        .append($tooltipImage);
                    
                    
                $tooltipImage
                    .attr("alt", $thisImage.attr("alt"))
                    .css({
                        "height": finalHeight,
                        "width": finalWidth
                    });
                    
                    
                $tooltipText
                    .css({
                        "height": inverted === true ? 72 : 48,
                        "top": inverted === true ? 0 : finalHeight + (imageMargin * 2)
                    });
                    
                    
                $tooltipNumber
                    .css("backgroundPosition", "5px " + (10 - 50 * itemNum) + "px")
                    
                    
                $tooltipDescription
                    .text($thisImage.attr("alt").replace(/\([^)]*\)$/,''));
            }
            
            function handlerTooltipLeave(event) {
                $(this).stop().hide();
            }
            
            $container
                .mouseleave(handlerContainerLeave)
                .find("img")
                    .mouseover(handlerImageOver)
                .end()
                .append($tooltipTemplate.clone())
                .find(".maisvistas-tooltip")
                    .mouseleave(handlerTooltipLeave);
            
    });
    
});/**
 * Tabs - jQuery plugin for accessible, unobtrusive tabs
 * @requires jQuery v1.1.1
 *
 * http://stilbuero.de/tabs/
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 2.7.4
 */
(function($){$.extend({tabs:{remoteCount:0}});$.fn.tabs=function(initial,settings){if(typeof initial=='object')settings=initial;settings=$.extend({initial:(initial&&typeof initial=='number'&&initial>0)?--initial:0,disabled:null,bookmarkable:$.ajaxHistory?true:false,remote:false,spinner:'Loading&#8230;',hashPrefix:'remote-tab-',fxFade:null,fxSlide:null,fxShow:null,fxHide:null,fxSpeed:'normal',fxShowSpeed:null,fxHideSpeed:null,fxAutoHeight:false,onClick:null,onHide:null,onShow:null,navClass:'tabs-nav',selectedClass:'tabs-selected',disabledClass:'tabs-disabled',containerClass:'tabs-container',hideClass:'tabs-hide',loadingClass:'tabs-loading',tabStruct:'div'},settings||{});$.browser.msie6=$.browser.msie&&($.browser.version&&$.browser.version<7||/MSIE 6.0/.test(navigator.userAgent));function unFocus(){scrollTo(0,0);}return this.each(function(){var container=this;var nav=$('ul.'+settings.navClass,container);nav=nav.size()&&nav||$('>ul:eq(0)',container);var tabs=$('a',nav);if(settings.remote){tabs.each(function(){var id=settings.hashPrefix+(++$.tabs.remoteCount),hash='#'+id,url=this.href;this.href=hash;$('<div id="'+id+'" class="'+settings.containerClass+'"></div>').appendTo(container);$(this).bind('loadRemoteTab',function(e,callback){var $$=$(this).addClass(settings.loadingClass),span=$('span',this)[0],tabTitle=span.innerHTML;if(settings.spinner){span.innerHTML='<em>'+settings.spinner+'</em>';}setTimeout(function(){$(hash).load(url,function(){if(settings.spinner){span.innerHTML=tabTitle;}$$.removeClass(settings.loadingClass);callback&&callback();});},0);});});}var containers=$('div.'+settings.containerClass,container);containers=containers.size()&&containers||$('>'+settings.tabStruct,container);nav.is('.'+settings.navClass)||nav.addClass(settings.navClass);containers.each(function(){var $$=$(this);$$.is('.'+settings.containerClass)||$$.addClass(settings.containerClass);});var hasSelectedClass=$('li',nav).index($('li.'+settings.selectedClass,nav)[0]);if(hasSelectedClass>=0){settings.initial=hasSelectedClass;}if(location.hash){tabs.each(function(i){if(this.hash==location.hash){settings.initial=i;if(($.browser.msie||$.browser.opera)&&!settings.remote){var toShow=$(location.hash);var toShowId=toShow.attr('id');toShow.attr('id','');setTimeout(function(){toShow.attr('id',toShowId);},500);}unFocus();return false;}});}if($.browser.msie){unFocus();}containers.filter(':eq('+settings.initial+')').show().end().not(':eq('+settings.initial+')').addClass(settings.hideClass);$('li',nav).removeClass(settings.selectedClass).eq(settings.initial).addClass(settings.selectedClass);tabs.eq(settings.initial).trigger('loadRemoteTab').end();if(settings.fxAutoHeight){var _setAutoHeight=function(reset){var heights=$.map(containers.get(),function(el){var h,jq=$(el);if(reset){if($.browser.msie6){el.style.removeExpression('behaviour');el.style.height='';el.minHeight=null;}h=jq.css({'min-height':''}).height();}else{h=jq.height();}return h;}).sort(function(a,b){return b-a;});if($.browser.msie6){containers.each(function(){this.minHeight=heights[0]+'px';this.style.setExpression('behaviour','this.style.height = this.minHeight ? this.minHeight : "1px"');});}else{containers.css({'min-height':heights[0]+'px'});}};_setAutoHeight();var cachedWidth=container.offsetWidth;var cachedHeight=container.offsetHeight;var watchFontSize=$('#tabs-watch-font-size').get(0)||$('<span id="tabs-watch-font-size">M</span>').css({display:'block',position:'absolute',visibility:'hidden'}).appendTo(document.body).get(0);var cachedFontSize=watchFontSize.offsetHeight;setInterval(function(){var currentWidth=container.offsetWidth;var currentHeight=container.offsetHeight;var currentFontSize=watchFontSize.offsetHeight;if(currentHeight>cachedHeight||currentWidth!=cachedWidth||currentFontSize!=cachedFontSize){_setAutoHeight((currentWidth>cachedWidth||currentFontSize<cachedFontSize));cachedWidth=currentWidth;cachedHeight=currentHeight;cachedFontSize=currentFontSize;}},50);}var showAnim={},hideAnim={},showSpeed=settings.fxShowSpeed||settings.fxSpeed,hideSpeed=settings.fxHideSpeed||settings.fxSpeed;if(settings.fxSlide||settings.fxFade){if(settings.fxSlide){showAnim['height']='show';hideAnim['height']='hide';}if(settings.fxFade){showAnim['opacity']='show';hideAnim['opacity']='hide';}}else{if(settings.fxShow){showAnim=settings.fxShow;}else{showAnim['min-width']=0;showSpeed=1;}if(settings.fxHide){hideAnim=settings.fxHide;}else{hideAnim['min-width']=0;hideSpeed=1;}}var onClick=settings.onClick,onHide=settings.onHide,onShow=settings.onShow;tabs.bind('triggerTab',function(){var li=$(this).parents('li:eq(0)');if(container.locked||li.is('.'+settings.selectedClass)||li.is('.'+settings.disabledClass)){return false;}var hash=this.hash;if($.browser.msie){$(this).trigger('click');if(settings.bookmarkable){$.ajaxHistory.update(hash);location.hash=hash.replace('#','');}}else if($.browser.safari){var tempForm=$('<form action="'+hash+'"><div><input type="submit" value="h" /></div></form>').get(0);tempForm.submit();$(this).trigger('click');if(settings.bookmarkable){$.ajaxHistory.update(hash);}}else{if(settings.bookmarkable){location.hash=hash.replace('#','');}else{$(this).trigger('click');}}});tabs.bind('disableTab',function(){var li=$(this).parents('li:eq(0)');if($.browser.safari){li.animate({opacity:0},1,function(){li.css({opacity:''});});}li.addClass(settings.disabledClass);});if(settings.disabled&&settings.disabled.length){for(var i=0,k=settings.disabled.length;i<k;i++){tabs.eq(--settings.disabled[i]).trigger('disableTab').end();}};tabs.bind('enableTab',function(){var li=$(this).parents('li:eq(0)');li.removeClass(settings.disabledClass);if($.browser.safari){li.animate({opacity:1},1,function(){li.css({opacity:''});});}});tabs.bind('click',function(e){var trueClick=e.clientX;var clicked=this,li=$(this).parents('li:eq(0)'),toShow=$(this.hash),toHide=containers.filter(':visible');if(container['locked']||li.is('.'+settings.selectedClass)||li.is('.'+settings.disabledClass)||typeof onClick=='function'&&onClick(this,toShow[0],toHide[0])===false){this.blur();return false;}container['locked']=true;if(toShow.size()){if($.browser.msie&&settings.bookmarkable){var toShowId=this.hash.replace('#','');toShow.attr('id','');setTimeout(function(){toShow.attr('id',toShowId);},0);}var resetCSS={display:'',overflow:'',height:''};if(!$.browser.msie){resetCSS['opacity']='';}function switchTab(){if(settings.bookmarkable&&trueClick){$.ajaxHistory.update(clicked.hash);}toHide.animate(hideAnim,hideSpeed,function(){$(clicked).parents('li:eq(0)').addClass(settings.selectedClass).siblings().removeClass(settings.selectedClass);toHide.addClass(settings.hideClass).css(resetCSS);if(typeof onHide=='function'){onHide(clicked,toShow[0],toHide[0]);}if(!(settings.fxSlide||settings.fxFade||settings.fxShow)){toShow.css('display','block');}toShow.animate(showAnim,showSpeed,function(){toShow.removeClass(settings.hideClass).css(resetCSS);if($.browser.msie){toHide[0].style.filter='';toShow[0].style.filter='';}if(typeof onShow=='function'){onShow(clicked,toShow[0],toHide[0]);}container['locked']=null;});});}if(!settings.remote){switchTab();}else{$(clicked).trigger('loadRemoteTab',[switchTab]);}}else{alert('There is no such container.');}var scrollX=window.pageXOffset||document.documentElement&&document.documentElement.scrollLeft||document.body.scrollLeft||0;var scrollY=window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop||0;setTimeout(function(){window.scrollTo(scrollX,scrollY);},0);this.blur();return settings.bookmarkable&&!!trueClick;});if(settings.bookmarkable){$.ajaxHistory.initialize(function(){tabs.eq(settings.initial).trigger('click').end();});}});};var tabEvents=['triggerTab','disableTab','enableTab'];for(var i=0;i<tabEvents.length;i++){$.fn[tabEvents[i]]=(function(tabEvent){return function(tab){return this.each(function(){var nav=$('ul.tabs-nav',this);nav=nav.size()&&nav||$('>ul:eq(0)',this);var a;if(!tab||typeof tab=='number'){a=$('li a',nav).eq((tab&&tab>0&&tab-1||0));}else if(typeof tab=='string'){a=$('li a[@href$="#'+tab+'"]',nav);}a.trigger(tabEvent);});};})(tabEvents[i]);}$.fn.activeTab=function(){var selectedTabs=[];this.each(function(){var nav=$('ul.tabs-nav',this);nav=nav.size()&&nav||$('>ul:eq(0)',this);var lis=$('li',nav);selectedTabs.push(lis.index(lis.filter('.tabs-selected')[0])+1);});return selectedTabs[0];};})(jQuery);/**
 * Este script tem como finalidade exibir containers de conteudo com base no índice de uma aba que foi clicada
 * 
 * @author Diego Fleury
 * 
 */

var TabsAssociatedNumerically = (function(config) {
    
    var $ = jQuery;
      
    /* private variables */
    var __priv = {
    };
    
    
    /* public variables */
    var __pub = $.extend(true, {
        jc: { // jQuery Cache
            box: null,
            tabs: null,
			contents: null
        },
		activeClass: 'active',
		tabsSelector: null,
		contentsSelector: null,
        change: function() {},
		start: function() {}
    }, config);
    
    
    
    
    
    
    /* private methods */
    var __private__ = {
        
        /**
         * Inicia a lógica e retorna o que é público deste objeto
         * @return Object
         */
        init: function() {
            
			this.cacheDom();
            this.bindEvents();
			
			__pub.start.call(__public__, __public__);
            
            return __public__;
            
        },
		
		/**
		 * Seleciona os elementos da Dom e coloca em cache de memória
		 */
		cacheDom: function() {

			__pub.jc.box = $(__pub.boxSelector);
			__pub.jc.tabs = __pub.jc.box.find(__pub.tabsSelector);
			__pub.jc.contents = __pub.jc.box.find(__pub.contentsSelector);
			
		},
        
        /**
         * Aplica os manipuladores de eventos aos controles
         */
        bindEvents: function() {
            __pub.jc.tabs.bind('click', function() { __public__.openTab.call(__public__, $(this)); });
        }
        
    };
    
    
    /* public methods and variables */
    var __public__ = {
        
        // Todas variáveis que são públicas são adicionadas em options 
        options: __pub,
        
        /**
         * Abre o popin de edição e pega os valores atuais
         */
        openTab: function($tab) {
            
			var $siblingActive = $tab.addClass(__pub.activeClass).siblings("." + __pub.activeClass).removeClass(__pub.activeClass);
			
			if ($siblingActive.size() > 0) {

                var index = $tab.prevAll().size();
				var $newContent = __pub.jc.contents.eq(index).addClass(__pub.activeClass);
				var $oldContent = $newContent.siblings("." + __pub.activeClass).removeClass(__pub.activeClass);
				
				__pub.change.call($tab, $siblingActive, $tab, $oldContent, $newContent, index);
				
			}
			
        }
        
    };
    
    return __private__.init();
    
});/**
 * jQuery Templates
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by: Stan Lemon <stanlemon@mac.com>
 *
 * Based off of the Ext.Template library, available at:
 * http://www.extjs.com
 *
 * This library provides basic templating functionality, allowing for macro-based
 * templates within jQuery.
 *
 * Basic Usage:
 *
 * var t = $.template('<div id="foo">Hello ${name}, how are you ${question}?  I am ${me:substr(0,10)}</div>');
 *
 * $(selector).append( t , {
 *     name: 'Stan',
 *     question: 'feeling',
 *     me: 'doing quite well myself, thank you very much!'
 * });
 *
 * Requires: jQuery 1.2+
 *
 *
 * @todo    Add callbacks to the DOM manipulation methods, so that events can be bound
 *          to template nodes after creation.
 */
(function($){
	
	/**
	 * Create a New Template
	 */
	$.template = function(html, options) {
		return new $.template.instance(html, options);
	};

	/**
	 * Template constructor - Creates a new template instance.
	 *
	 * @param 	html 	The string of HTML to be used for the template.
	 * @param 	options An object of configurable options.  Currently
	 * 			you can toggle compile as a boolean value and set a custom
	 *          template regular expression on the property regx by
	 *          specifying the key of the regx to use from the regx object.
	 */
	$.template.instance = function(html, options) {
        // If a custom regular expression has been set, grab it from the regx object
        if ( options && options['regx'] ) options.regx = this.regx[ options.regx ];

		this.options = $.extend({
			compile: 		false,
			regx:           this.regx.standard
		}, options || {});

		this.html = html;

		if (this.options.compile) {
			this.compile();   
		}
		this.isTemplate = true;
	};

	/**
	 * Regular Expression for Finding Variables
	 *
	 * The default pattern looks for variables in JSP style, the form of: ${variable}
	 * There are also regular expressions available for ext-style variables and
	 * jTemplate style variables.
	 *
	 * You can add your own regular expressions for variable ussage by doing.
	 * $.extend({ $.template.re , {
	 *     myvartype: /...../g
	 * }
	 *
	 * Then when creating a template do:
	 * var t = $.template("<div>...</div>", { regx: 'myvartype' });
	 */
	$.template.regx = $.template.instance.prototype.regx = {
	    jsp:        /\$\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        ext:        /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        jtemplates: /\{\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}\}/g
	};
	
	/**
	 * Set the standard regular expression to be used.
	 */
	$.template.regx.standard = $.template.regx.jsp;
	
	/**
	 * Variable Helper Methods
	 *
	 * This is a collection of methods which can be used within the variable syntax, ie:
	 * ${variable:substr(0,30)} Which would only print a substring, 30 characters in length
	 * begining at the first character for the variable named "variable".
	 *
	 * A basic substring helper is provided as an example of how you can define helpers.
	 * To add more helpers simply do:
	 * $.extend( $.template.helpers , {
	 *	 sampleHelper: function() { ... }	
	 * });
	 */
	$.template.helpers = $.template.instance.prototype.helpers = {
		substr : function(value, start, length){
			return String(value).substr(start, length);
		},
		shortstr : function(value, length){
			return value ? value.length >= length ? String(value).substr(0, length) + '...' : value : '';
		}
	};


	/**
	 * Template Instance Methods
	 */
	$.extend( $.template.instance.prototype, {
		
		/**
		 * Apply Values to a Template
		 *
		 * This is the macro-work horse of the library, it receives an object
		 * and the properties of that objects are assigned to the template, where
		 * the variables in the template represent keys within the object itself.
		 *
		 * @param 	values 	An object of properties mapped to template variables
		 */
		apply: function(values) {
			if (this.options.compile) {
				return this.compiled(values);
			} else {
				var tpl = this;
				var fm = this.helpers;

				var fn = function(m, name, format, args) {
					if (format) {
						if (format.substr(0, 5) == "this."){
							return tpl.call(format.substr(5), values[name], values);
						} else {
							if (args) {
								// quoted values are required for strings in compiled templates, 
								// but for non compiled we need to strip them
								// quoted reversed for jsmin
								var re = /^\s*['"](.*)["']\s*$/;
								args = args.split(',');

								for(var i = 0, len = args.length; i < len; i++) {
									args[i] = args[i].replace(re, "$1");
								}
								args = [values[name]].concat(args);
							} else {
								args = [values[name]];
							}

							return fm[format].apply(fm, args);
						}
					} else {
						return values[name] !== undefined ? values[name] : "";
					}
				};

				return this.html.replace(this.options.regx, fn);
			}
		},

		/**
		 * Compile a template for speedier usage
		 */
		compile: function() {
			var sep = $.browser.mozilla ? "+" : ",";
			var fm = this.helpers;

			var fn = function(m, name, format, args){
				if (format) {
					args = args ? ',' + args : "";

					if (format.substr(0, 5) != "this.") {
						format = "fm." + format + '(';
					} else {
						format = 'this.call("'+ format.substr(5) + '", ';
						args = ", values";
					}
				} else {
					args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
				}
				return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
			};

			var body;

			if ($.browser.mozilla) {
				body = "this.compiled = function(values){ return '" +
					   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn) +
						"';};";
			} else {
				body = ["this.compiled = function(values){ return ['"];
				body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn));
				body.push("'].join('');};");
				body = body.join('');
			}
			eval(body);
			return this;
		}
	});


	/**
	 * Save a reference in this local scope to the original methods which we're 
	 * going to overload.
	 **/
	var $_old = {
	    domManip: $.fn.domManip,
	    text: $.fn.text,
	    html: $.fn.html
	};

	/**
	 * Overwrite the domManip method so that we can use things like append() by passing a 
	 * template object and macro parameters.
	 */
	$.fn.domManip = function( args, table, reverse, callback ) {
		if (args[0].isTemplate) {
			// Apply the template and it's arguments...
			args[0] = args[0].apply( args[1] );
			// Get rid of the arguements, we don't want to pass them on
			delete args[1];
		}

		// Call the original method
		var r = $_old.domManip.apply(this, arguments);

		return r;
	};

    /**
     * Overwrite the html() method
     */
	$.fn.html = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.html.apply(this, [value]);

		return r;
	};
	
	/**
	 * Overwrite the text() method
	 */
	$.fn.text = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.text.apply(this, [value]);

		return r;
	};

})(jQuery);/**
  *
  * @author Time de Jornalismo 1
  * @version 1.0
  * @description Plugin de jQuery para o box widget playlist wide
  * @requires jquery
  * @requires jquery.template
  * @param {String} [url="url do request"] Necessario url para popular box
  *
 **/

(function($){

     var TEMPLATE_MIDIA = $.template(
         '     <p class="chapeu">${chapeu}</p>'+
             '     <p class="titulo entry-title" rel="bookmark">${titulo}</p>'+
             '     <p class="entry-summary subtitulo">${subtitulo}</p>'+
             '     <ul class="rodape"></ul>'
     );
     var TEMPLATE_INFO_ITEM = $.template(
         '<li id="playlist-item-${midia}">'+
             '   <span class="canto-caixa-ce"></span>'+
             '   <span class="canto-caixa-cd"></span>'+
             '   <span class="canto-caixa-re"></span>'+
             '   <span class="canto-caixa-rd"></span>'+
             '    <div class="foto l110">'+
             '       <span class="canto-ce"></span>'+
             '       <span class="canto-cd"></span>'+
             '       <span class="canto-re"></span>'+
             '       <span class="canto-rd"></span>'+
             '       <img width="110" height="69" />'+
             '    </div>'+
             '    <p class="entry-title" rel="bookmark">${titulo}</p>'+
             '</li>'
     );

     var TEMPLATE_ITEM_VAZIO = $.template(
         '<li class="item-vazio">'+
             '   <span class="canto-caixa-ce"></span>'+
             '   <span class="canto-caixa-cd"></span>'+
             '   <span class="canto-caixa-re"></span>'+
             '   <span class="canto-caixa-rd"></span>'+
             '</li>'
     );

     $.extend(
         $.fn,
         {
             widgetPlaylistWide: function (options) {

                 var $container = ($(this));

                 var settings = jQuery.extend({
                                                  playlistUrlItem: false,
                                                  playlistQtdImagens: 4
                                              }, options);

                 prepararLinksDaPlaylist = function (data) {
                     var $rodape = $container.find(".chamada-rodape li a");
                     $rodape.html(data.link.Link.titulo + " &raquo;");
                     $rodape.attr("href", data.link.Link.href);
                 }

                 recuperarItensPlaylist = function (){
                     $('.destaque-playlist', $container).addClass('loading-midia-destaque');
                     $('.playlist', $container).addClass('loading-midia');
                     $.ajax(
                         {
                             url: settings.playlistUrlItem,
                             dataType: "json",
                             type: "GET",
                             success: function(data) {
                                 montarItensPlaylist(data.itens);
                                 prepararLinksDaPlaylist(data);
                             }
                         }
                     );
                 }

                 montarItensPlaylist = function(data, links){
                     var total_itens = data.length;
                     var quantidade_img = settings.playlistQtdImagens;
                     var indice = 0;

                     popularInfoItens = function () {
                         $.each(data, function (index){
                                    var midia = this.Midia;
                                    var foto = midia.foto_do_tamanho.DP.Foto;
                                    $('.playlist ul', $container).append( TEMPLATE_INFO_ITEM , {
                                                                              midia: index,
                                                                              id: midia.id_banco,
                                                                              chapeu: midia.chapeu,
                                                                              titulo: midia.titulo,
                                                                              subtitulo: midia.subtitulo,
                                                                              imagem: foto.url,
                                                                              imagem_titulo: foto.titulo
                                                                          });
                                });

                         if (total_itens < 4) {
                             $('.playlist ul li.item-vazio').die().live('click',function(){
                                                                            return false;
                                                                        });
                             var itens_vazios = 4 - total_itens;
                             for (i=0; i < itens_vazios; i++){
                                 $('.playlist ul', $container).append(TEMPLATE_ITEM_VAZIO)
                             }
                         }
                     }
                     popularImgItens = function () {

                         $.each(data, function (index){
                                    if (indice >= total_itens) return false;
                                    var midia = data[indice].Midia;
                                    var titulo = midia.titulo;
                                    var foto = midia.foto_do_tamanho.DP.Foto.url;
                                    var img_item = $('.playlist ul li img', $container)[indice]
                                    $(img_item).attr({
                                                         'src':foto,
                                                         'alt':titulo,
                                                         'title':titulo
                                                     });
                                    indice = indice + 1;
                                    if (indice == quantidade_img) return false;
                                });
                         quantidade_img = quantidade_img + settings.playlistQtdImagens;
                     }

                     popularInfoItens();
                     popularImgItens()

                     $('.mode-horizontal li img', $container)
                         .addClass('loading-midia-destaque')
                         .load(function (){
                                   $(this, $container).removeClass('loading-midia-destaque');
                               });

                     $('.horizontal-next a').live('click', function(){
                                                      if ($(this).hasClass('inativo')) return false;
                                                      $(this).removeAttr('href');
                                                      popularImgItens();
                                                      return false;
                                                  });

                     $('.destaque-playlist', $container).removeClass('loading-midia-destaque');
                     $('.playlist', $container).removeClass('loading-midia');

                     montarDestaqueSelecionado(data);
                                        
                     destaqueSelecionado($($container).find('.playlist li:first'), data, false);
                     
                     /* $('.playlist li:first').load(function({
                        destaqueSelecionado($('.playlist li:first', $container), data, false);
                     }); */

                     $('.widget-playlist-wide .mode-horizontal').jflow({
                                                                           itens: 4,
                                                                           mode : 'horizontal',
                                                                           item: '.mode-horizontal li',
                                                                           prev: '.horizontal-prev a',
                                                                           next: '.horizontal-next a'
                                                                       });


                 }

                 montarDestaqueSelecionado = function (data){
                     $('.playlist li', $container).die().live('click', function(event){
                                                                  $('.media', $container).addClass('loading-midia-destaque');
                                                                  destaqueSelecionado(this, data, true);
                                                              })
                     montarDataPlaylist(data);
                 }

                 destaqueSelecionado = function (target, data, statusVideo){

                     if ($('.media', $container).hasClass('loading-midia-destaque') == false){
                         $('.media', $container).addClass('loading-midia-destaque');
                     }

                     var _self = target;
                     if ($(_self ).hasClass('on-selected')) return false;
                     $('.playlist li', $container).removeClass('on-selected');
                     $(_self ).addClass('on-selected');
                     var item = $(_self).attr('id').split('-');
                     item = parseInt(item[2]);

                     var midia = data[item].Midia;

                     

                     $('.media-info', $container).html( TEMPLATE_MIDIA , {
                                                            id: midia.id_banco,
                                                            chapeu: midia.chapeu,
                                                            titulo: midia.titulo,
                                                            subtitulo: midia.subtitulo
                                                        }).attr('id',midia.id_banco);

                     var chapeu = $('.media-info .chapeu', $container);
                     if(chapeu.text() == "") chapeu.remove();

                     var quantidade_itens = data.length;
                     var item_selecionado = $(target).attr('id');

                     var $rodape = $container.find(".rodape");
                     if (midia.links) {
                         $.each(
                             midia.links, function (index)
                             {
                                 var link = this.Link;
                                 if ((link.titulo.length == 0) && (link.href.length == 0)) {
                                     return true;
                                 }

                                 var template = '<li><a href="' + link.href + '">' + link.titulo + '</a></li>';

                                 $rodape.append(template);
                             }
                         );
                     }

                     montarInfoPaginacao(quantidade_itens, item_selecionado);                                      			                        

                            function mudaVideoPlaylistWide(id, valor) {
                                var midiaEmbed = {
                                    midiaId: midia.id_banco,
                                    banda: "N",
                                    autoStart: statusVideo
                                };
                                    
                                var embed = new GMCEmbed(midiaEmbed);
                                embed.attach("embed-playlist-wide");
                                    
                                midiaEmbed.midiaId = id;
                                midiaEmbed.autoStart = valor;
                                embed = new GMCEmbed(midiaEmbed);
                                embed.attach("embed-playlist-wide");
                            }
                                    
                            function pararMidiaPlaylistWide() {
                                embed.destroy();
                            }
                                     
                     mudaVideoPlaylistWide(midia.id_banco, statusVideo);                     

                 }

                 montarDataPlaylist = function (data){
                     if ($('.widget-titulo .separador', $container).hasClass('separador') == true) return false;
                     var mesesAno = new Array ("janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro");
                     var date = data[0].Midia.data_exibicao;
                     date = date.substring(0,10).split('-');
                     var mes = parseInt(date[1] - 1);
                     var dia = parseFloat(date[2]);
                     var template_date = '<span class="separador">|</span><span class="data">'+dia+ " de " + mesesAno[mes] + " de " + date[0]+'</span>';
                     $('.widget-titulo', $container).append(template_date);
                 }

                 montarInfoPaginacao = function (quantidade_itens, item_selecionado){
                     var item_selecionado = item_selecionado.split('-');
                     var item = parseInt(item_selecionado[2]) + 1;
                     $('.widget-titulo .info-paginacao', $container).remove();
                     $('.widget-titulo', $container).append('<span class="info-paginacao">reportagem <span>'+item+'</span> de '+quantidade_itens+'</span>');
                 }
                 
         

                 recuperarItensPlaylist();
             }
         }
     );
 })(jQuery);/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);/**
  * @author Alexandre Magno (http://blog.alexandremagno.net)
  * @version 1.0
  * @description Plugin de jQuery para Carousel que suporta orientacao vertical e horizontal
  * @requires ScrollTo
  * @param {String} [item=".noticia-plantao"] O seletor usado como referencia para o carousel
  * @param {Number} [itens=5] A quantidade de itens que ira deslizar no carousel
  * @param {String} [inativeClass="inativo"] Classe inserida na paginacao quando chegar nos limites de paginacao
  * @param {String} [prev=".widget-plantao-botao-topo a"] Seletor usado como botao de voltar
  * @param {String} [next=".widget-plantao-botao-rodape a"] Seletor usado como botao de avancar
  * @param {String} [mode="vertical"] Modo de orientacao dos slides, aceita os parametros horizontal e vertical
  * @param {Number} [speed=800] Velocidade em milisegundos do slide
  * @example
  * <div id="container">
  * 	<ul>
  * 		<li>item 1</li>
  * 		<li>item 2</li>
  * 		<li>item 3</li>
  * 		<li>item 4</li>
  * 	</ul>
  * </div>
  * $('#container').jflow({
  * 	itens: 3,
  * 	mode: 'horizontal'
  * });
  * @returns {Object} jQuery
  *
  *
 */

 (function($) {
    $.fn.jflow = function(params){

        var options = {
            item: '.noticia-plantao',
            itens: 5,
            inativeClass : 'inativo',
            prev: '.widget-plantao-botao-topo a',
            next: '.widget-plantao-botao-rodape a',
            mode: 'vertical',
            speed: 800
        }

        var op = $.extend(options, params);
         var $self = this;
         var count = 0;
         var $flowbox = $(op.item);
         var li_count = $(op.item).length;

         if(li_count<=op.itens) {
             $(op.next).addClass(op.inativeClass);
         }
         var li_amount = 0;
         if(li_count<op.itens) {
             li_amount = li_count;
         } else {
             li_amount = op.itens;
         }

         var max_itens = li_count-op.itens;
         var flowbox_dimensions = op.mode == 'vertical' ? $flowbox.outerHeight(true) : $flowbox.outerWidth(true);
         var li_size = flowbox_dimensions;
         var overall_size = li_count*flowbox_dimensions;
         var overflow_size = li_size*li_amount;

         if(op.mode=='vertical') {
        	 $self.css({
	             'height':overflow_size,
	             'overflow' : 'hidden'
	         });
         } else {
        	 $self.css({
        		 'width': overflow_size,
        		 'overflow':'hidden'
        	 });
        	 $self.children(':first').css({
	             'width':overall_size
	         });
         }
         $(op.prev).addClass(op.inativeClass).bind('click',function(){
            if(count>0) {
                count-=op.itens;
                $self.scrollTo( $(op.item).eq(count), op.speed, {onAfter: function (){
                    if(count==0) {
                        $(op.prev).addClass(op.inativeClass);
                    }
                }});
                $(op.next).removeClass(op.inativeClass);
            }
            //IE 7 Bug
            $(this).blur();
            return false;
         });

         $(op.next).bind('click',function(){
        	 	if(count<max_itens) {
                    count+=op.itens;
                    $self.scrollTo( $(op.item).eq(count), op.speed, {onAfter: function (){
                    	if(count>=max_itens) {
                           $(op.next).addClass(op.inativeClass);
                        }
                    }});
                    $(op.prev).removeClass(op.inativeClass);
                }
                //IE7 Bug
                $(this).blur();
         });

    };

})(jQuery);glb = typeof glb === "undefined" ? {} : glb;
    glb.Fipe = (function(config) {

        var $ = jQuery;



        /* private variables */
        var __priv = {
            data: {},
            searchTypeProfiles: {}, // Veja no final
            suggestInitialized: false,
            searchType: null,
            vehicleType: null,
            selectedFipe: null,
            selectedYear: null,
            resultTemplate: null,
            firstVehicleTypeSelection: true,
            preventBlur: false
        };



        /* public variables */
        var __pub = $.extend(true, {
            url: '',
            jContainer: null,
            jVehicleType: null,
            jSearchKind: null,
            jSearchField: null,
            jSample: null,
            jYearField: null,
            jResultTemplate: null,
            jFipeCards: null,
            jNewQuery: null,
            jLoading: null
        }, config);



        /* private methods */
        var __private__ = {

            /**
             * Inicia a lógica e retorna o que é público deste objeto
             * @return Object
             */
            init: function() {

                __private__.cacheDom();
                __private__.bindEvents();

                __pub.jSearchKind.eq(0).triggerHandler("click");

                return __public__;

            },

            /**
             * Seleciona os elementos da Dom e coloca em cache de memória
             */
            cacheDom: function() {

                __pub.jContainer = $(__pub.container);
                __pub.jSearchKind = __pub.jContainer.find(__pub.searchKind);
                __pub.jVehicleType = __pub.jContainer.find(__pub.vehicleType);
                __pub.jSearchField = __pub.jContainer.find(__pub.searchField);
                __pub.jSample = __pub.jContainer.find(__pub.sample);
                __pub.jYearField = __pub.jContainer.find(__pub.yearField);
                __pub.jResultTemplate = __pub.jContainer.find(__pub.resultTemplate);
                __pub.jFipeCards = __pub.jContainer.find(__pub.cards);
                __pub.jNewQuery = __pub.jContainer.find(__pub.newQuery);
                __pub.jLoading = __pub.jContainer.find(__pub.loading);

            },

            /**
             * Aplica os manipuladores de eventos aos controles
             */
            bindEvents: function() {

                __pub.jContainer.bind("submit", function(event) { event.preventDefault(); });
                __pub.jSearchField
                    .one("keydown", {firstKey: true}, $.proxy(__public__.selectVehicleType, __public__))
                    .bind("keyup", $.proxy(__public__.searchFieldHasBeenModified, __public__))
                    .bind("focus", $.proxy(__public__.searchFieldFocus, __public__))
                    .bind("blur", $.proxy(__public__.searchFieldBlur, __public__));
                __pub.jVehicleType.bind("click", $.proxy(__public__.selectVehicleType, __public__));
                __pub.jSearchKind.bind("click", $.proxy(__public__.changeSearchKind, __public__));
                __pub.jYearField.bind("change", $.proxy(__public__.changeYearField, __public__));
                __pub.jNewQuery.bind("click",  $.proxy(__public__.newQuery, __public__));

            },

            /**
             * Carrega o json indicado como fonte de dados
             * @param filename {String} É o nome do arquivo (sem a extensão) que deve ser carregado e armazenado em __priv.data
             */
            loadVehiclesJSON: function(filename) {

                if (filename.toUpperCase().match(/[^A-Z]/)) {
                    throw new Error("Arquivo fonte inválido");
                }

                if (__priv.data[filename] === undefined) {

                    var url = __pub.url.concat(filename, ".json");

                    __private__.isMakingRequest(true);

                    $.getJSON(url, function(data) {

                        __private__.createDisplayName(data);
                        __priv.data[filename] = data;

                        __private__.feedSuggest.call(__public__);

                        __private__.isMakingRequest(false);
                    });

                } else {
                    __private__.feedSuggest.call(__public__);
                }

            },

            /**
             * Alimenta a fonte de dados do suggest
             */
            feedSuggest: function() {

                if (__priv.suggestInitialized === false) {

                    __pub.jSearchField.suggest({
                        dataSource: __priv.data[__priv.vehicleType],
                        searchPath: __priv.searchType.searchPath,
                        valuePath: 'cod_fipe',
                        template: __priv.searchType.templateGetter,
                        showOnFocus: false,
                        placeOn: '#glb-doc',
                        beforeRenderItems: function(options, $container) {
                            if (this.val().length < 3 || this.hasClass("noText") === true) {
                                return false;
                            }
                        },
                        renderFunction: function(options, newItem, $newItem) {
                            if (this.val() !== '') {
                                var regex = new RegExp('(' + this.val().replace(/([.()\[\]-_?!:|\^${}\\\/+*])/g,'\\$1') + ')','gi');
                                $newItem.html($newItem.text().replace(regex, '<strong>$1</strong>').concat(" &raquo;"));
                            }
                        },
                        afterRenderItems: function(options, $container) {
                            var $containerWrapper = options.instance._$containerWrapper;

                            

                            var
                                $input = options.instance._$input,
                                inputHeight = $input.outerHeight(),
                                inputPos = $input.offset(),
                                itemsLength = $container.children().size(),
                                $rounder = $containerWrapper.children(".rounder");
                            
                            inputPos.top += inputHeight;
                            $containerWrapper.css({
                                top: inputPos.top,
                                left: inputPos.left
                            });

                            if (itemsLength > 5) {
                                $rounder.height(189);
                                $rounder.scrollTop(0);
                                options.instance.showDropDown();
                            } else {
                                $rounder.css("height", "auto");

                                if (itemsLength === 0) {
                                    options.instance.hideDropDown();
                                } else {
                                    options.instance.showDropDown();
                                }
                            }
                            
                            __pub.jYearField.hide();
                        },
                        move: function(options, oldIndex, newIndex, $selectedOption) {
                            options.instance._$containerWrapper.children(".rounder").stop().scrollTo({"top": newIndex * 38, "left": 0}, 500);
                        },
                        change: function(options, oldValue, newValue) {
                            setTimeout(function() {
                                __public__.selectFipe.call(__public__, newValue);
                            }, 100);
                            __pub.jYearField.show();
                            options.instance.hideDropDown();
                        }
                    });

                    __priv.suggestInitialized = true;

                } else {

                    var suggestInstance = __pub.jSearchField.data("__glbsuggest__");
                    suggestInstance.refreshData(__priv.data[__priv.vehicleType]);

                }

                __private__.applyPreventBlur();
                __private__.applySelectionAction();
            },

            /**
             * Concatena modelo com a marca no atributo modelo
             * @param data {Array} Coleção de dados
             * @return Array
             */
            createDisplayName: function(data) {

                for (var i = 0, dataLength = data.length; i < dataLength; i++) {
                    data[i].nomeExibicao = [data[i].marca, data[i].modelo].join(" ");
                }

            },

            /**
             * Monta campo para escolha do ano e combustível
             * @param data {Array} Coleção de dados com anos e combustíveis
             */
            mountYearField: function(data) {

                var
                    dataLength = data.length,
                    optionTemplate = '<option value="{:id}">{:tipo}</option>',
                    options = [];

                options.push(TemplateHandler.applyData(optionTemplate, {id: "", "tipo": "selecione o ano do modelo"}));

                while (dataLength--) {

                    data[dataLength].id = dataLength;
                    options.push(TemplateHandler.applyData(optionTemplate, data[dataLength]));

                }

                __pub.jYearField.empty();
                __pub.jYearField.append(options.join(""));

            },

            /**
             * Mostra ou esconde o loader dependendo do parametro boleano informado
             * ou informa o status atual se nenhum parametro for informado
             * @param status {Boolean} Status do loader
             */
            isMakingRequest: function() {

                var status = arguments[0];

                if (status === undefined) {
                    return __pub.jLoading.is(":visible");
                } else {
                    __pub.jLoading[(status === true ? "show" : "hide")]();
                }

            },

            /**
             * Previne que o evento de blur do input seja disparado quando o mouse
             * estiver sobre o suggest. Isto corrige um problema que acontece
             * nos IEs sobre blur no campo de busca
             */
            applyPreventBlur: function() {
                $("#glb-doc > .dropdown-area.fipe-busca")
                    .filter(function() {
                        var preventApplied = !$(this).data("preventApplied");
                        $(this).data("preventApplied", true);
                        return preventApplied;
                    })
                    .hover(function() {
                       __priv.preventBlur = true;
                    }, function() {
                       __priv.preventBlur = false;
                    });
            },

            /**
             * Esconde suggest caso uma opção tenha sido clicada. Isto corrige
             * um problema que acontece nos IEs sobre blur no campo de busca
             */
            applySelectionAction: function() {
                $("#glb-doc > .dropdown-area.fipe-busca")
                    .filter(function() {
                        var preventApplied = !$(this).data("selectionApplied");
                        $(this).data("selectionApplied", true);
                        return preventApplied;
                    })
                    .bind("click", function(event) {
                        __public__.searchFieldBlur.call(__public__, true);
                    });
            }

        };



        /* public methods and variables */
        var __public__ = {

            // Todas variáveis que são públicas são adicionadas em options
            options: __pub,

            /**
             * Troca ícone do tipo selecionado e invoca o carregamento do json com
             * base no radio selecionado atualmente.
             */
            selectVehicleType: function(event) {

                var
                    $selectedType = this.options.jVehicleType.filter(":checked"),
                    selectedTypeValue = $selectedType.val();

                __priv.vehicleType = selectedTypeValue;

                // Troca o ícone do tipo de veículo a ser pesquisado
                this.options.jVehicleType.parent().removeClass("selected");
                $selectedType.parent().addClass("selected");

                __private__.loadVehiclesJSON(selectedTypeValue);

                if (arguments[0].data === undefined) {
                    this.resetSearchField();
                }

            },

            /**
             * Alterna entre busca por modelo e busca por código fipe
             * @param event {Event} Evento gerado pelo usuário
             */
            changeSearchKind: function(event) {

                this.options.jSearchKind.removeClass("selected");
                $(event.currentTarget).addClass("selected");

                if ($(event.currentTarget).attr("className").indexOf(__priv.searchTypeProfiles.byModel.classname) !== -1) {
                    __priv.searchType = __priv.searchTypeProfiles.byModel;
                } else {
                    __priv.searchType = __priv.searchTypeProfiles.byFipe;
                }

                this.applySearchTypeProfile();

                this.resetSearchField();

            },

            /**
             * Limpa o campo de busca
             */
            resetSearchField: function() {

                this.options.jSearchField.val("");
                __private__.isMakingRequest(false);
                this.searchFieldHasBeenModified();
                this.insertInsideSearchFieldLabel();
                this.hideSuggest();

            },

            /**
             * Aplica perfil de tipo de busca
             */
            applySearchTypeProfile: function() {

                this.options.jSample.html(__priv.searchType.sample);

                var suggestInstance = this.options.jSearchField.data("__glbsuggest__");

                if (suggestInstance !== undefined) {
                    suggestInstance.defineSearchPath(__priv.searchType.searchPath);

                    this.options.jContainer.find(".dropdown-area").remove();
                    suggestInstance.defineTemplate(__priv.searchType.templateGetter);
                    suggestInstance.defineItemTemplate(__priv.searchType.templateGetter);
                    suggestInstance.cleanTemplate();
                    suggestInstance.createDropDown();
                }

            },

            /**
             * Seleciona veículo de acordo com código passado
             * @param code {String} Código fipe
             */
            selectFipe: function(code) {

                var
                    url = [this.options.url, __priv.vehicleType, "/", code, ".json"].join(""),
                    vehicleData = __priv.data[__priv.vehicleType],
                    vehicleDataLength = vehicleData.length,
                    index, selectFipeJsonHandler;

                    selectFipeJsonHandler = function(data) {

                        __public__.setFipe(vehicleData[index], data);
                        __private__.isMakingRequest(false);

                    };

                    this.searchFieldHasBeenModified();

                    while (vehicleDataLength--) {

                        if (vehicleData[vehicleDataLength].cod_fipe === code) {

                            if (vehicleData[vehicleDataLength].details === undefined) {

                                index = vehicleDataLength;

                                __private__.isMakingRequest(true);

                                $.getJSON(url, selectFipeJsonHandler);

                            } else {
                                this.setFipe(vehicleData[vehicleDataLength], vehicleData[vehicleDataLength].details);
                            }

                        }

                    }

            },

            /**
             * Define o fipe selecionado pelo usuário
             * @param vehicle {Object} Referência do veículo selecionado
             * @param details {Object} Detalhes do veículo selecionado
             */
            setFipe: function(vehicle, details) {

                __priv.selectedFipe = vehicle;
                __priv.selectedFipe.details = details;

                __private__.mountYearField(details);
                __pub.jSample.hide();
                this.showYearField();

                this.options.jYearField.trigger("focus");

            },

            /**
             * Esconde o combobox de ano/combustível
             */
            hideYearField: function() {

                this.options.jYearField.hide();

            },

            /**
             * Mostra o combobox de ano/combustível
             */
            showYearField: function() {

                this.options.jYearField.show();

            },

            /**
             * Esconde suggest
             */
            hideSuggest: function() {

                var suggestInstance = this.options.jSearchField.data("__glbsuggest__");

                if (suggestInstance !== undefined) {
                    setTimeout(function() {
                        suggestInstance.hideDropDown();
                    }, 200);
                }

            },

            /**
             * Mostra o suggest
             */
            showSuggest: function() {

                var jSearchField = this.options.jSearchField;

                if (jSearchField.val().length > 2) {

                    var suggest = jSearchField.data("__glbsuggest__");

                    if (suggest !== undefined) {
                        __pub.jYearField.hide();
                        suggest.showDropDown();
                    }

                }

            },

            /**
             * Trata a seleção do ano do veículo
             */
            changeYearField: function(event) {

                var yearValue = $(event.currentTarget).val();

                if (yearValue === "") {
                    return false;
                }

                __priv.selectedYear = __priv.selectedFipe.details[yearValue];

                var
                    detailVehicleView = $.extend({}, __priv.selectedFipe),
                    detailYearView = $.extend({}, __priv.selectedYear);

                detailVehicleView.details = detailYearView;

                detailVehicleView.logoPath = [this.options.logosPath, "/marcas_", __priv.vehicleType, "/", __public__.slugify(detailVehicleView.marca), ".gif"].join("");
                detailVehicleView.details.valor = detailVehicleView.details.valor.replace(/,/g,".") + ",00";

                if (__priv.resultTemplate === null) {

                    __priv.resultTemplate = this.options.jResultTemplate.html();

                    var aux = this.options.jResultTemplate.next();
                    this.options.jResultTemplate.remove();
                    this.options.jResultTemplate = aux;

                }

                this.options.jResultTemplate.html(TemplateHandler.applyData(__priv.resultTemplate, detailVehicleView));

                __pub.jFipeCards.eq(0).hide();
                __pub.jFipeCards.eq(1).show();

            },

            /**
             * Reseta alguns estados do widget
             */
            searchFieldHasBeenModified: function(event) {

                var jSearchFieldValue = this.options.jSearchField.val();

                if (jSearchFieldValue !== __priv.oldValue) {

                    if (__priv.selectedFipe !== null) {

                        __priv.selectedFipe = null;
                        this.options.jSample.show();
                        this.hideYearField();

                        var suggestInstance = this.options.jSearchField.data("__glbsuggest__");
                        if (suggestInstance !== undefined) {
                            suggestInstance.reset();
                        }

                    }

                    __priv.oldValue = jSearchFieldValue;

                }

            },

            /**
             * Coloca o inside text do campo e esconde o suggest
             * @param force {Boolean} Força que o campo execute o blur
             */
            searchFieldBlur: function(force) {

                if (force === true || __priv.preventBlur === false) {

                    if (__priv.selectedFipe !== null) {
                        __pub.jYearField.show();
                    }
                    
                    this.insertInsideSearchFieldLabel();
                    this.hideSuggest();
                }

            },

            /**
             * Tira o inside text do campo e mostra o suggest
             */
            searchFieldFocus: function() {

                this.removeInsideSearchFieldLabel();
                this.showSuggest();

            },

            /**
             * Remove o texto de dentro do campo de busca
             */
            insertInsideSearchFieldLabel: function() {
                if ($.trim(this.options.jSearchField.val()) === "") {
                    this.options.jSearchField.val(__priv.searchType.defaultSearchFieldText);
                    this.options.jSearchField.addClass("noText");
                }
            },

            /**
             * Insere o texto de dentro do campo de busca
             */
            removeInsideSearchFieldLabel: function() {

                var prof = __priv.searchTypeProfiles;

                if ($.inArray($.trim(this.options.jSearchField.val()), [prof.byModel.defaultSearchFieldText, prof.byFipe.defaultSearchFieldText]) !== -1 ) {
                    this.options.jSearchField.val("");
                    this.options.jSearchField.removeClass("noText");
                }

            },

            /**
             * Prepara formulario para nova consulta
             */
            newQuery: function() {

                __public__.resetSearchField();
                __pub.jFipeCards.eq(0).show();
                __pub.jFipeCards.eq(1).hide();
                __pub.jSearchField.trigger("focus");

            },

            /**
             * Remove caracteres não padrões
             * @param text {String} Texto a ser limpo
             */
            slugify: function(text) {
                return text.toLowerCase()
                    .replace(/[áâèä]/g, "a")
                    .replace(/[ç]/g, "c")
                    .replace(/[éêèë]/g, "e")
                    .replace(/[íîìï]/g, "i")
                    .replace(/[ĺ]/g, "l")
                    .replace(/[ñń]/g, "n")
                    .replace(/[óôòö]/g, "o")
                    .replace(/[ŕ]/g, "r")
                    .replace(/[śŝ]/g, "s")
                    .replace(/[úûùü]/g, "u")
                    .replace(/[ýŷÿ]/g, "y")
                    .replace(/[ź]/g, "z")
                    .replace(/[^\-a-z0-9,&\s]+/g, '')
                    .replace(/\s/g, "_");
            }

        };



        __priv.searchTypeProfiles.byModel = {
            classname: "por-modelo",
            sample: "ex.: Volkswagen Polo, Fiat Uno, Opala, Variant",
            searchPath: "nomeExibicao",
            defaultSearchFieldText: "procure seu veículo",
            templateGetter: function() {
                var me = __priv.searchTypeProfiles.byModel;
                if (me.templateHtml === undefined) {
                    var $who = $('#suggest-fipe-template-model');
                    me.templateHtml = $who.html();
                    $who.remove();
                }
                return me.templateHtml;
            }
        };

        __priv.searchTypeProfiles.byFipe = {
            classname: "por-codigo",
            sample: "ex.: 006002-0",
            searchPath: "cod_fipe",
            defaultSearchFieldText: "digite o código fipe",
            templateGetter: function() {
                var me = __priv.searchTypeProfiles.byFipe;
                if (me.templateHtml === undefined) {
                    var $who = $('#suggest-fipe-template-fipe');
                    me.templateHtml = TemplateHandler.getHTML($who.get(0));
                    $who.remove();
                }
                return me.templateHtml;
            }
        };



        return __private__.init();

    });TemplateHandler = {

	'trim': function(text) {
	    return text.replace(/^[\s\t]*/, '').replace(/[\s\t]*$/, '');
	},
	
	'internalTrim': function(text) {
	    return text.replace(/[\s\t]{2,}/g, '');
	},
	
	'stripLineBreak': function(text) {
	    return text.replace(/\r?\n/g, '');
	},
	
	'extractOutter': function(extractionPoint, template) {
	    return decodeURIComponent(template.substring(0, template.indexOf('{@' + extractionPoint + '}')) +
	        template.substring(template.indexOf('{@' + extractionPoint + '/}') + extractionPoint.length + 4, template.length));
	},
	
	'extractInner': function(extractionPoint, template) {
        var
            endPoint = template.indexOf('{@' + extractionPoint + '/}'),
            innerTemplate = TemplateHandler.trim(template.substring(
                template.indexOf('{@' + extractionPoint + '}') + extractionPoint.length + 3,
                endPoint));

            if (innerTemplate.match(/<\/[^>]+>$/) === null) {
                innerTemplate = innerTemplate.concat("</", innerTemplate.match(/<([a-zA-Z]+)/)[1], ">");
            }

	    return decodeURIComponent(innerTemplate);
	},
	
	'walkValues': function(val, path) {
        var key = path.shift();
        
        if (path.length === 0) {
            return val[key] !== undefined ? val[key] : null;
        }
        
        val = val[key];
        
        return this.walkValues(val, path);
	},
	
	'applyData': function(template, values) {
		
        var that = this;
        
        // Substitui os endereços de dados pelo valores reais
        return template.replace(/\{\:([^{}]*)\}/g, function(exp, path){
            
            path = path.replace(/^item\./, '').split('.');
            
            var replacement = that.walkValues(values, path);
            
            if (replacement === null) {
                replacement = exp;
            }
            
            return replacement.toString();
            
        });
		
	},

    /**
     * @author KooiInc (http://stackoverflow.com/users/58186/kooiinc)
     * @see http://stackoverflow.com/questions/1231770/innerhtml-removes-attribute-quotes-in-internet-explorer
     *
     * Retorna o html de um elemento com as aspas nos campos.
     * Isso corrige um bug do IE 6-7 que ao dar innerHTML, o retorno é um código
     * onde os atributos de uma tag não vem com aspas. Ex.: <div id=foo class=bar>baz</div>
     */
    'getHTML': function(obj) {

        var IE7orLower = (navigator.appVersion.match(/MSIE [67]/) ? true : false), zz = obj.innerHTML;

        if (IE7orLower === true) {
            var z = zz.match(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g);

            if (z) {
                for (var i = 0; i < z.length; i++) {

                    var y, zSaved = z[i];

                    z[i] = z[i].replace(/(<?\w+)|(<\/?\w+)\s/, function(a){return a.toLowerCase();});
                    y = z[i].match(/\=[^'"\s]+[?'"\s+|?>]/g);

                    if (y) {
                        for (var j = 0; j < y.length; j++) {
                            z[i] = z[i].replace(y[j], y[j].replace(/\=([^\s]+)([?\s+|?>])/g,'="$1"$2'));
                        }
                    }

                    zz = zz.replace(zSaved, z[i]);
                }
            }
        }

        return zz;
    }

};(function($) {

    var Suggest = function(element, options) {
    
        /** @start Properties **/
       
            this._defaultOptions = {
                'dataSource': null,
                'searchPath': null,
                'valueField': null,
                'valuePath': null,
                'showOnFocus': true,
                'template': '<ul class="sugests-dropdown">{@dropdown-item}<li value="{:item.classe}">{:item.desc}</li>{@dropdown-item/}</ul>',
                'selectedClass': 'selectedItem'
            };
            
            this.unitOptions = $.extend(this._defaultOptions, options);
            
            this._$input = $(element);
            this._$valueField = undefined;
            this._$containerWrapper = undefined;
            this._$container = undefined;
            this._itemValue = undefined;
            this._selectedItemIndex = null;
            this._data = [];
            
            this._eNS = '.glbsuggest'; // eNS = eventsNamespace
            this._controlKeys = [13, 27, 38, 40]; // Enter, Esq, Arrow up, Arrow down
            this._nonPrintableKeys = [0, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];
            
            this.unitOptions.searchPath = this.unitOptions.searchPath.split('.');
            
            if (this.unitOptions.valuePath) {
                this.unitOptions.valuePath = this.unitOptions.valuePath.split('.');
            }

            this.unitOptions.instance = this;
            
        /** @end Properties **/
        
        
        /** @start Methods **/
            
            /**
             * Percorre a estrutura de dados recursivamente
             * @param {Object} val Árvore de dados
             * @param {Array} path Caminho a seguir
             * @return {Mixed} Valor encontrado na posição indicada 
             */
            var walkValues = function(val, path) {
                var key = path.shift();
                
                if (path.length === 0) {
                    return val[key] !== undefined ? val[key] : null;
                }
                
                val = val[key];
                
                return walkValues(val, path);
            };
        
            /**
             * Aplica os eventos que serão utilizados pelo campo de entrada
             */
            this.bindInputEvents = function() {
                
                var that = this;
                
                var inputHandlers = {
                    'key': {
                        'down': function(event) {
                            if ($.inArray(event.which, that._controlKeys) !== -1) {
                                event.preventDefault();
                            }

                            switch (event.which) {
                                
                                case 13: // Enter
                                    that.selectCurrentItem();
                                    break;
                                    
                                case 27: // Esc
                                    that.blur();
                                    break;
                                    
                                case 38: // Arrow Up
                                    that.previousItem();
                                    break;
                                    
                                case 40: // Arrow Down
                                    that.nextItem();
                                    break;
                                    
                            }
                        },
                        'up': function(event) {
                            // Se for alguma das teclas abaixo, cancela tratamento de evento keyUp
                            if ($.inArray(event.which, that._nonPrintableKeys) === -1) {
                                that.filter();
                                that.feedDropDown();
                                that.bindItensEvents();
                            }
                        }
                    },
                    'field': {
                        'focus': function(event) {
                            if (that.unitOptions.showOnFocus === true) {
                                that.showDropDown();
                            }
                        },
                        'blur': function(event) {
                            if (that.unitOptions.showOnFocus === true) {
                                that.hideDropDown();
                            }
                        }
                    }
                };

                this._$input
                    .bind('keydown' + this._eNS, inputHandlers.key.down)
                    .bind('keyup' + this._eNS, inputHandlers.key.up)
                    .bind('focus' + this._eNS, inputHandlers.field.focus)
                    .bind('blur' + this._eNS, inputHandlers.field.blur);

            };
            
            /**
             * Define que deverá receber o valor real da opção selecionada
             */
            this.defineValueField = function() {
                if (typeof this.unitOptions.valueField === 'function') {
                    this._$valueField = this.unitOptions.valueField.call(this._$input, this.unitOptions);
                } else if (typeof this.unitOptions.valueField === 'string') {
                    this._$valueField = $(this.unitOptions.valueField);
                }
            };

            /**
             * Define um novo caminho para busca no json
             * @param newSearchPath {String} Novo caminho de busca
             */
            this.defineSearchPath = function(newSearchPath) {

                if (typeof newSearchPath === 'string' && newSearchPath.match(/\w/)) {
                    this.unitOptions.searchPath = newSearchPath.split('.');
                }

            };
            
            /**
             * Define a string do template
             */
            this.defineTemplate = function() {

                if (typeof arguments[0] === "function") {
                    this.unitOptions.template = arguments[0];
                }

                this.unitOptions.template = this.unitOptions.template;
                
                if (typeof this.unitOptions.template === 'function') {
                    this.unitOptions.template = this.unitOptions.template.call(this._$input, this.unitOptions);
                }
                
            };
            
            /**
             * Limpa o html do template
             */
            this.cleanTemplate = function() {
                
                var th = TemplateHandler;
                this.unitOptions.template = th.stripLineBreak(th.internalTrim(th.trim(this.unitOptions.template)));
                
            };

            /**
             * Cria o menu drop-down que exibirá as opções
             */
            this.createDropDown = function() {

                var a = TemplateHandler.extractOutter('dropdown-item', this.unitOptions.template);
                this._$containerWrapper = $(a);

                if (this.unitOptions.placeOn === undefined) {
                    this._$input.after(this._$containerWrapper);
                } else {

                    this._$containerWrapper.addClass(["container-wrapper", this._$input.attr("className"), this._$input.attr("id")].join(" "));
                    $(this.unitOptions.placeOn).append(this._$containerWrapper);

                }
                
                var $itemsPlace = this._$containerWrapper.find('.items-place');
                if ($itemsPlace.size() === 1) {
                    this._$container = $itemsPlace;
                } else {
                    
                    var i = 0;
                    while (this._$containerWrapper.children().size() > 0 || i++ === 100) {
                        this._$container = this._$containerWrapper.children(':first');
                    }

                    if (i === 0 && this._$container === undefined) {
                        this._$container = this._$containerWrapper;
                    }
                    
                }
                
            };
            
            /**
             * Pega os dados que irão alimentar o drop-down
             */
            this.refreshData = function() {

                if (typeof arguments[0] === "object") {
                    this.unitOptions.dataSource =  arguments[0];
                }

                this.data = this.unitOptions.dataSource;
                
                if (typeof this.unitOptions.dataSource === 'function') {
                    this.data = this.unitOptions.dataSource.call(this._$input, this.unitOptions);
                }
                
                this._dataFiltered = this.data;
                
            };
            
            /**
             * Extrai o template que será utilizado para os itens
             */
            this.defineItemTemplate = function() {
                this._itemTemplate = TemplateHandler.extractInner('dropdown-item', this.unitOptions.template);
            };
            
            /**
             * Alimenta o drop-down com os itens
             */
            this.feedDropDown = function() {
                
                var newItem;
                var $newItem;
                
                if (typeof this.unitOptions.beforeRenderItems === 'function') {
                    if (this.unitOptions.beforeRenderItems.call(this._$input, this.unitOptions, this._$container) === false) {
                        return;
                    }
                }

                this._$container.empty();
                
                for (var i = 0; i < this._dataFiltered.length; i++) {
                    
                    newItem = TemplateHandler.applyData(this._itemTemplate, this._dataFiltered[i]);
                    $newItem = $(TemplateHandler.applyData(this._itemTemplate, this._dataFiltered[i]));
                    
                    if (typeof this.unitOptions.renderFunction === 'function') {
                        
                         var $suposeNewItem = this.unitOptions.renderFunction.call(this._$input, this.unitOptions, newItem, $newItem, this._dataFiltered, i);
                         if (typeof $suposeNewItem !== 'undefined' && $suposeNewItem.get(0).tagName !== 'undefined') {
                            $newItem = suposeNewItem;
                         }
                         
                    }
                    
                    this._$container.append($newItem);
                    
                }
                
                if (typeof this.unitOptions.afterRenderItems === 'function') {
                    this.unitOptions.afterRenderItems.call(this._$input, this.unitOptions, this._$container);
                }
                
            };

            /**
             * Aplica eventos que serão utilizados pelos itens do drop-down
             */
            this.bindItensEvents = function() {
                
                var that = this;

                var itensHandlers = {
                    'mouse': {
                        'click': function(event) {
                            
                            var $clickedItem = $(this);
                            var $allItems = $clickedItem.parent().children();
                            var index;
                            
                            $allItems.each(function(i) {
                               if (this === $clickedItem.get(0)) {
                                   index = i;
                                   return false;
                               } 
                            });
                            
                            that.selectItemIndex(index);
                            that.selectCurrentItem();
							
							that._$input.trigger('focus');
                            
                            if (that.unitOptions.showOnFocus === true) {
                                that.hideDropDown();
                            }
                        }
                    }
                };

                this._$container
                    .children()
                        .bind('click' + this._eNS, itensHandlers.mouse.click);

            };
            
            /**
             * Seleciona o próximo item
             */
            this.previousItem = function() {
                if (this._selectedItemIndex === null) {
                    this.selectItemIndex(0);
                } else if (this._selectedItemIndex - 1 === -1) {
                    this.selectItemIndex(0);
                } else {
                    this.selectItemIndex(this._selectedItemIndex - 1);
                }
            };
            
            /**
             * Seleciona o próximo item
             */
            this.nextItem = function() {
                if (this._selectedItemIndex === null) {
                    this.selectItemIndex(0);
                } else if (this._selectedItemIndex + 1 === this._$container.children().size()) {
                    this.selectItemIndex(this._selectedItemIndex);
                } else {
                    this.selectItemIndex(this._selectedItemIndex + 1);
                }
            };
            
            /**
             * Seleciona o item a partir de seu índice
             * @param {Number} index Índice do item a ser selecionado
             */
            this.selectItemIndex = function(index) {
                
				var willSelect = true;
				var $options = this._$container.children();
				var $selectedOption = $options.eq(index);
				
				if (typeof this.unitOptions.move === 'function') {
                    if (this.unitOptions.move.call(this._$input, this.unitOptions, this._selectedItemIndex, index, $selectedOption) === false) {
                        willSelect = false;
                    }
                }
				
				if (willSelect === true) {
					this._selectedItemIndex = index;
	                $options.removeClass(this.unitOptions.selectedClass);
					$selectedOption.addClass(this.unitOptions.selectedClass);
				}
                
            };
            
            /**
             * Seleciona o item corrente
             */
            this.selectCurrentItem = function() {
                
                if (this._dataFiltered.length > 0 && this._selectedItemIndex !== null) {
                    
                    var itemDisplay = walkValues(this._dataFiltered[this._selectedItemIndex], this.unitOptions.searchPath.slice(0));
                    var itemValue = walkValues(this._dataFiltered[this._selectedItemIndex], this.unitOptions.valuePath.slice(0));
                    var willChange = true;
                    
                    if (this._itemValue !== itemValue) {
                        if (typeof this.unitOptions.change === 'function') {
                            
                            if (this.unitOptions.change.call(this._$input, this.unitOptions, this._itemValue, itemValue) === false) {
                                willChange = false;
                            }
                            
                        }
                    }
                    
                    if (willChange === true) {
                        this._itemValue = itemValue;
                        this._$input.val(itemDisplay);
                        
                        if (typeof this._$valueField !== 'undefined') {
                            this._$valueField.val(itemValue);
                        }
                    }
                    
                    
                }
                
            };
            
            /**
             * Filtra os itens que serão exibidos
             */
            this.filter = function() {
                
                var search = this._$input.val();
                var newDataFiltered = [];
                
                if (search.length > 0 && this.data.length > 0) {
                    
                    for (var i = 0; i < this.data.length; i++) {
                        
                        if (walkValues(this.data[i], this.unitOptions.searchPath.slice(0)).toUpperCase().indexOf(search.toUpperCase()) !== -1) {
                            newDataFiltered.push(this.data[i]);
                        }
                        
                    }
                    
                    this._dataFiltered = newDataFiltered;
                    
                } else {
                    this._dataFiltered = this.data;
                }
                
                this._selectedItemIndex = null;
                
            };
            
            /**
             * Mostra o drop-down
             */
            this.showDropDown = function() {
                this._$containerWrapper.show();
            };
            
            /**
             * Esconde o drop-down
             */
            this.hideDropDown = function() {
                this._$containerWrapper.hide();
            };
            
            /**
             * 
             */
            this.blur = function() {
              if (this.unitOptions.showOnFocus === true) {
                  this.hideDropDown();
              }  
            };
            
            /**
             * Define configurações para o início do script
             */
            this.setupInitialState = function() {
                
                if (this.unitOptions.showOnFocus === true) {
                    this.hideDropDown();
                }
                
                this._$input.attr('autocomplete', 'off');
                
            };
			
			/**
			 * Devolve aos atributos da instância, seus valores iniciais
			 * @param values Define valores iniciais às variáveis de controle. (Opcional)
			 */
			this.reset = function() {
	            this._itemValue = undefined;
	            this._selectedItemIndex = null;
	            this._data = [];
				
				if (arguments.length === 1) {
					var values = arguments[0], prop;
					for (prop in values) {
						if (values.hasOwnProperty(prop)) {
							this['_' + prop] = values[prop];
						}
					}
				}
			};
            
        /** @end Methods **/

        /** @start Run **/
       
            this.bindInputEvents();
            this.defineValueField();
            
            this.defineTemplate();
            this.cleanTemplate();
            this.createDropDown();
            
            this.defineItemTemplate();
            this.refreshData();
            this.feedDropDown();
            
            this.bindItensEvents();
            
            this.setupInitialState();
            
        /** @end Run **/
    };

    $.fn.suggest = function(options) {
        
        return this.each(function() {

            var suggest = new Suggest(this, options);
	        $(this).data('__glbsuggest__', suggest);
            
        });

    };

})(jQuery);