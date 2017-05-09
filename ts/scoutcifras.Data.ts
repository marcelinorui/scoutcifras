/*******************************************************************************************************/
/*                                        Datas                                                        */
/*******************************************************************************************************/
function CodigoData($obj,codigo,texto,password){
	
	var cDataHelper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789    ';
	var appendTxt = '';
	
	for(var i = 0; i < texto.length; i ++ ){
		var chr = texto.charAt(i);
		if ( (chr >= 'A' && chr <= 'Z') || (chr >= '0' && chr <= '9')  ){
			var idx = cDataHelper.indexOf(chr);
			var column = Math.floor(idx%10)+1;
			if (column >= 10 ) { column = column-10; }				
			appendTxt += password.charAt(Math.floor(idx/10)) + column;
		} else {
			if (chr == '\n') {
				appendTxt += '<br />';
			} else {
				if ( chr == ' '){
					appendTxt += ' ';
				}
			}
		}					
	}	
	$obj.CodigoOut.html(appendTxt);
}

cifras_selection.push({ titulo: 'Data', nome: 'DA', password: true, passwordType: 'year', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoData($obj,c, t, p); } });
