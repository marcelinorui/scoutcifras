/*******************************************************************************************************/
/*                                           Carangejo                                                 */
/*******************************************************************************************************/
function CodigoCaranguejo($obj,codigo, texto) {
	var appendTxt = '';

	for (var i = texto.length -1 ; i >= 0; i--) {
		appendTxt += texto.charAt(i);
	}
	$obj.CodigoOut.html(appendTxt);
}

cifras_selection.push({ titulo: 'Caranguejo', nome: 'CG', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoCarangejo($obj,c, t); } });
