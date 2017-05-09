/*******************************************************************************************************/
/*                                           Inverso                                                   */
/*******************************************************************************************************/
function CodigoInverso($obj,codigo,texto) {
	var dic = [];

	var Z = "Z".charCodeAt(0);
	for (var i = 0; i < 26; i++) { 
		dic.push(String.fromCharCode(Z-i));
	}

	CodificaComDicionario($obj,texto, dic);
}

cifras_selection.push({ titulo: 'Inverso', nome: 'CI', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoInverso($obj,c, t); } });
