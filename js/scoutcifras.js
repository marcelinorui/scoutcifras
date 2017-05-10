  (function ($) {
        //
        // plugin definition
        //
        $.fn.scoutcifras = function($$options) {
          //;;; _debug(this);
          
          // build main options before element iteration
          var $settings = $.extend({}, $.fn.scoutcifras.defaults, $$options);
         
          // iterate and reformat each matched element
          return this.each(function() {
            $this = $(this);   
            // call our format function
            format($this);
			// init object
			init($this);
          });
        };
       
	    //
        // plugin defaults
        //
        $.fn.scoutcifras.defaults = cifras_selection;
		
        //
        // private function for debugging
        //
        function _debug($obj) {if (window.console && window.console.log) window.console.log('scoutcifras selection count: ' + $obj.size());}
	    function createTAG(tag,opt){var obj = document.createElement(tag);if ( opt != null ){$(obj).attr(opt);}return obj;}
        //
        // define and expose our format function
        //
        function format($obj) {
			 $obj.lastSelectedCodigo = 0;
			 var html = '<div class="form-horizontal">'+
							'<div class="form-group">'+
								'<label class="col-md-3 col-xs-3 col-sm-3 control-label">Cifra</label>'+
								'<div class="col-md-6 col-xs-6 col-sm-6"><select class="form-control" id="scoutcifras-select"></select></div>'+
							 '</div>'+
							 '<div class="form-group" id="scoutcifras-password">'+
								'<label class="col-md-3 col-xs-3 col-sm-3 control-label">Password</label>'+
								'<div class="col-md-3 col-xs-3 col-sm-3"><input class="form-control" type="text" id="scoutcifras-password-input"/>'+
									'<span id="scoutcifras-password-type" class="help-block"></span>'+
								'</div>'+								
							'</div>'+
							'<div class="form-group">'+
								'<label class="col-md-3 col-xs-3 col-sm-3 control-label">Texto a Cifrar</label>'+
								'<div class="col-md-7 col-xs-7 col-sm-7"><textarea class="form-control" id="scoutcifras-input" rows="5"></textarea></div>'+
								'<div class="col-md-2 col-xs-2 col-sm-2">'+
									'<button type="button" class="btn btn-block btn-default" id="btn-apagar">Apagar</button><br />'+
									'<button type="button" class="btn btn-block btn-primary" id="btn-gerar">Gerar</button>'+
								'</div>'+
							'</div>'+
							'<div class="form-group">'+
								'<label class="col-md-3 col-xs-3 col-sm-3 control-label">Texto Cifrado</label>'+
								'<div class="col-md-7 col-xs-7 col-sm-7"><div id="scoutcifras-output" style="padding: 6px 12px;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;font-size: 14px;box-shadow: inset 0 1px 1px rgba(0,0,0,.075);line-height: 1.42857143;transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;min-height: 34px;"></div></div>'+
								'<div class="col-md-2 col-xs-2 col-sm-2">'+
									'<button type="button" class="btn btn-block btn-default" id="btn-imprimir">Imprimir</button>'+									
								'</div>'
							'</div>'+
						'</div>';

			$obj.append(html);
			
			
			$obj.Select = $obj.find('#scoutcifras-select');
			$obj.scoutcifra_pw = $obj.find('#scoutcifras-password');
			$obj.Password = $obj.find('#scoutcifras-password-input');
			$obj.PasswordType = $obj.find('#scoutcifras-password-type');
			
			$obj.Generate = $obj.find('#btn-gerar');
			$obj.Texto = $obj.find('#scoutcifras-input');
			$obj.Apagar = $obj.find('#btn-apagar');
			
			$obj.CodigoOut = $obj.find('#scoutcifras-output');
			$obj.Print = $obj.find('#btn-imprimir');
						 
		};
				
		function ClearCodigo($obj){$obj.CodigoOut.html('');};
		
		function GenerateCode($obj){
			ClearCodigo($obj);
			var cod = cifras_selection[$obj.Select.prop('selectedIndex')];
            var texto = removeDiacritics($obj.Texto.val().toString().toUpperCase());
            var password = removeDiacritics($obj.Password.val().toString().toUpperCase());
			cod.valor = password;
            cod.cifra($obj, cod.nome, texto, cod.valor, password);
		};
		
		function ValidateText($obj){
			var texto = $($obj.Password).val().toString();
			if ( texto.length > 0 ){
				var re=/^[A-z]+$/; 
				if ( !re.test(texto) )
				{
					$obj.PasswordType.show();
				}
				else
				{
					$obj.PasswordType.hide();
				}
			}
		};
		
		function ValidateYear($obj){
			var texto = $($obj.Password).val().toString();
			if ( texto.length > 0)
			{
				if ( isNaN(texto) || (texto.length > 0 && texto.length < 4 ))
				{
					$obj.PasswordType.show();
				}
				else
				{
					$obj.PasswordType.hide();
				}
			}
		}
		
		function ValidateNumber($obj){
			var texto = $($obj.Password).val().toString();
			
			if ( texto.length > 0)
			{
				if ( isNaN(texto))
				{
					$obj.PasswordType.show();
				}
				else
				{
					$obj.PasswordType.hide();
				}
			}
		};
       
	    function init($obj){
			for (var i = 0; i < cifras_selection.length; i++) {
				$obj.Select.append('<option>' + cifras_selection[i].titulo + '</option>');
            }			
			
			$obj.Apagar.on('click', function () {
                ClearCodigo($obj);
                $obj.Texto.val('');
            });
			
			$obj.Generate.on('click', function () {
                GenerateCode($obj);
            });
			
			$obj.Print.on('click', function() { 
				$newdiv = $obj.CodigoOut.clone();
				$($newdiv).removeClass('scoutcifras').removeClass('scoutcifras-cipheredtext').printArea();
			});
			
			$obj.Select.on('change keyup keydown focusin focusout select' ,function() {
				MudaDeCifra($obj);
			});
			
			$obj.Texto.on('change keyup keydown focusin focusout select',function() {
                GenerateCode($obj);
			});
			
			MudaDeCifra($obj);
		};
       
		
		function MudaDeCifra($obj){
			var selectedCodigo = $obj.Select.prop('selectedIndex');
			var selectedCifra = cifras_selection[selectedCodigo];
			
			if (selectedCifra.password)
			{
				$($obj.scoutcifra_pw).show();
				if  ( selectedCifra.passwordType.length > -1)
				{
				
					$obj.PasswordType.text('');
					$obj.Password.off().on('change keyup keydown focusin focusout select',function(){
						GenerateCode($obj); 
					});
					if ( selectedCifra.passwordType === 'text')
					{
						$obj.PasswordType.text('Insira apenas texto');
						$obj.Password.on('change keyup keydown focusin focusout select',function(){ ValidateText($obj);});
					}
					else if( selectedCifra.passwordType === 'numeric') 
					{
						$obj.PasswordType.text('Insira um n�mero');
						$obj.Password.on('change keyup keydown focusin focusout select',function(){ ValidateNumber($obj) ;});
					}
					else if( selectedCifra.passwordType === 'year') 
					{
						$obj.PasswordType.text('Insira um ano');
						$obj.Password.on('change keyup keydown focusin focusout select',function(){ ValidateYear($obj) ;});
					}
					$obj.PasswordType.hide();					
				}
			}
			else
			{
				$obj.scoutcifra_pw.hide();
			}
			
			$obj.Password.val(selectedCifra.valor);
			
			if (selectedCodigo > 0 && $obj.lastSelectedCodigo != selectedCodigo) {
				$obj.lastSelectedCodigo = selectedCodigo;
				if ($obj.Texto.val().toString().length > 0) {
					GenerateCode($obj);                        
				} 
			}
			
		};
	  //
      // end of closure
      //
      })(jQuery);
	  
	  
  var cifras_selection = [{ titulo:'', nome: '', password: false, passwordType:'', valor: 0, cifra: function ($obj, c, t, i,p) { } }];
  
  
	var defaultDiacriticsRemovalMap = [
		{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
		{ 'base': 'AA', 'letters': /[\uA732]/g },
		{ 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
		{ 'base': 'AO', 'letters': /[\uA734]/g },
		{ 'base': 'AU', 'letters': /[\uA736]/g },
		{ 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
		{ 'base': 'AY', 'letters': /[\uA73C]/g },
		{ 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
		{ 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
		{ 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
		{ 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
		{ 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
		{ 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
		{ 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
		{ 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
		{ 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
		{ 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
		{ 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
		{ 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
		{ 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
		{ 'base': 'LJ', 'letters': /[\u01C7]/g },
		{ 'base': 'Lj', 'letters': /[\u01C8]/g },
		{ 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
		{ 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
		{ 'base': 'NJ', 'letters': /[\u01CA]/g },
		{ 'base': 'Nj', 'letters': /[\u01CB]/g },
		{ 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
		{ 'base': 'OI', 'letters': /[\u01A2]/g },
		{ 'base': 'OO', 'letters': /[\uA74E]/g },
		{ 'base': 'OU', 'letters': /[\u0222]/g },
		{ 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
		{ 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
		{ 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
		{ 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
		{ 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
		{ 'base': 'TZ', 'letters': /[\uA728]/g },
		{ 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
		{ 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
		{ 'base': 'VY', 'letters': /[\uA760]/g },
		{ 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
		{ 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
		{ 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
		{ 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }		
	];

	var changes;
	function removeDiacritics(str) {
		if (!changes) {
			changes = defaultDiacriticsRemovalMap;
		}
		for (var i = 0; i < changes.length; i++) {
			str = str.replace(changes[i].letters, changes[i].base);
		}
		return str;
	}
	
	function TraduzTextoComDicionario(texto,dicionario){
		var appendTxt = "";

		var A = "A".charCodeAt(0);
		var Z = "Z".charCodeAt(0);
		var Space = " ".charCodeAt(0);

		for (var i = 0; i < texto.length; i++) {
			var chr = texto.charCodeAt(i);

			if (chr >= A && chr <= Z) {
				appendTxt += dicionario[chr - A];
			}
			else {
				if (texto.charAt(i) == '\n') {
					appendTxt += '<br />';
				} else {
					if (chr == Space) {
						appendTxt += ' ';
					} else {
						appendTxt += texto.charAt(i);
					}
				}
			}
		}
		return appendTxt;
	}
	
	function AplicaDicionario(texto,dicionario){
		var appendTxt = "";

		var A = "A".charCodeAt(0);
		var Z = "Z".charCodeAt(0);
		var Space = " ".charCodeAt(0);

		for (var i = 0; i < texto.length; i++) {
			var chr = texto.charCodeAt(i);

			if (chr >= A && chr <= Z) {
				appendTxt += dicionario[chr - A];
			}
			else {
				appendTxt += texto.charAt(i);
			}
		}
		return appendTxt;
	}
	
	function CodificaComDicionario($obj,texto, dicionario) {
		$obj.CodigoOut.html(TraduzTextoComDicionario(texto,dicionario));
	}
	
	function CodigoSubstituicao($obj,codigo,texto) {
		var A = "A".charCodeAt(0);
		var Z = "Z".charCodeAt(0);
		var Space = " ".charCodeAt(0);
		//var CodigoOut = document.getElementById("CodigoOut");
		for (var i = 0; i < texto.length; i++) {
			var chr = texto.charCodeAt(i);
			if ((chr >= A && chr <= Z) || chr == Space) {
				AppendCodedChar($obj.CodigoOut,codigo, texto.charAt(i));
			} else {
				if (texto.charAt(i) == "\n") {
					var br = document.createElement("br");
					$obj.CodigoOut.append(br);
					$obj.CodigoOut.append(br);
				}
				else {
					$obj.CodigoOut.append(document.createTextNode(texto.charAt(i)));
				}
			}
		}
	}
	
	// function AppendCodedChar(pai, codigo, caracter) {
	// 	var i = document.createElement("IMG");
	// 	if (caracter == " ") {
	// 		i.setAttribute("src", codigo + "/Espaco.gif");
	// 	}
	// 	else {
	// 		i.setAttribute("src", codigo + "/" + caracter + ".gif");
	// 	}

	// 	pai.appendChild(i);
	// }
		
	function AppendCodedChar($pai, codigo, caracter) {
		var i = document.createElement('IMG');
		if (caracter == ' ') {
			i.setAttribute('src', GetCifra(codigo,'Espaco'));
		}
		else {
			i.setAttribute('src',GetCifra(codigo,caracter));
		}
		$pai.append(i);
	}
	
	function GetCifra(codigo,letra){
		for(var i =0; i < image_cifra.length; i++){
			if(image_cifra[i].nome == codigo){
				for(var j = 0; j < image_cifra[i].dic.length; j++){
					if ( image_cifra[i].dic[j].letra == letra){
						return image_cifra[i].dic[j].imagem;
					}
				}
				return image_cifra[i].dic;
			}
		}
	}
	
	var image_cifra = [{nome: '', dic: [{letra: '', imagem: ''}]}];
