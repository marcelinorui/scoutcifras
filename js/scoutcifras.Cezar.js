/*******************************************************************************************************/
/*                                           Cezar                                                     */
/*******************************************************************************************************/
function CodigoCezar($obj,codigo, texto, password) {
	var cezar = [];
	var num = parseInt(password) % 26;

	var A = "A".charCodeAt(0);

	for (var j = 0; j < 26; j++) {
		cezar.push(String.fromCharCode(j + A));
	}

	for (; num > 0; num--) {
		cezar.push(cezar.shift());
	}

	CodificaComDicionario($obj,texto, cezar);
}
cifras_selection.push({ titulo: 'Cezar', nome: 'CZ', password: true, passwordType: 'numeric', valor: 0, cifra: function ($obj, c, t, i, p) { CodigoCezar($obj,c, t, p); } });
