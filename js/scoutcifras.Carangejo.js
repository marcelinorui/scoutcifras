/*******************************************************************************************************/
/*                                           Carangejo                                                 */
/*******************************************************************************************************/
function CodigoCarangejo($obj,codigo, texto) {
	var appendTxt = '';

	for (var i = texto.length -1 ; i >= 0; i--) {
		appendTxt += texto.charAt(i);
	}
	$obj.CodigoOut.innerHTML = appendTxt;
}

cifras_selection.push({ titulo: 'Carangejo', nome: 'CG', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoCarangejo($obj,c, t); } });
