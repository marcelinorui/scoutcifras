/*******************************************************************************************************/
/*                                            Metades	                                               */
/*******************************************************************************************************/
function CodigoMetades($obj,codigo,texto,password){
	var appendTxt = '';
	
	for(var i = 0; i < texto.length; i ++ ){
		var chr = texto.charAt(i);
		if (chr >= 'A' && chr <= 'Z')
		{
			appendTxt += chr;
		}
	}
	
	var Line0 = '';
	var Line1 = '';
	for(var i = 0; i < appendTxt.length; i++){
		if ( i%2 == 0){
			Line0 += appendTxt.charAt(i);
		} else {
			Line1 += appendTxt.charAt(i);
		}
	}	
	$obj.CodigoOut.html(Line0 + ' ' + Line1);
}
cifras_selection.push({ titulo: 'Metades', nome: 'MT', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoMetades($obj,c, t, p); } });
