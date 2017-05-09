/*******************************************************************************************************/
/*                                     Vogais por Pontos	                                           */
/*******************************************************************************************************/ 
function CodigoVogaisPorPontos($obj,codigo,texto,password){
	var appendTxt = '';
	for(var i = 0; i < texto.length; i ++ ){
		var chr = texto.charAt(i);
		if ( chr == 'A' || chr == 'E' || chr == 'I' || chr == 'O' || chr == 'U' ){
			appendTxt += '.';
		} else {
				if (chr == '\n') {
					appendTxt += '<br />';
				} else {
					if ( chr == ' '){
						appendTxt += ' ';
					} else {
						appendTxt += chr;
					}
				}
			}
	}
	$obj.CodigoOut.html(appendTxt);
}
cifras_selection.push({ titulo: 'Vogais por Pontos', nome: 'VP', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoVogaisPorPontos($obj,c, t, p); } });
