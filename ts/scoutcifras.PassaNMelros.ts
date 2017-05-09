/*******************************************************************************************************/
/*                                           Passa Melros                                              */
/*******************************************************************************************************/
function GetMelro(){
	return String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 26));
}

function PassaMelro($obj, codigo, texto, melro) {
	var textoFinal = '';

	var A = 'A'.charCodeAt(0);
	var Z = 'Z'.charCodeAt(0);

	for (var i = 0; i < texto.length; i++) {
		var chr = texto.charCodeAt(i);
		if (chr >= A && chr <= Z) {
			textoFinal += texto.charAt(i);
			for (var m = 0; m < melro; m++) {
				textoFinal += GetMelro();
			}
		}
		else {
			if (texto.charAt(i) == '\n') {
				textoFinal += '<br />';
			} else {
				textoFinal += texto.charAt(i);
			}
		}
	}
	$obj.CodigoOut.html(textoFinal);
}

//cifras_selection.push({ titulo: 'Passa Um Melro', nome: 'PM', password: false, passwordType: '', valor: 1, cifra: function (c, t, i, p) { PassaMelro(c, t, i); } });
//cifras_selection.push({ titulo: 'Passa Dois Melros', nome: 'P2M', password: false, passwordType: '', valor: 2, cifra: function (c, t, i, p) { PassaMelro(c, t, i); } });
//cifras_selection.push({ titulo: 'Passa Tr�s Melros', nome: 'P3M', password: false, passwordType: '', valor: 3, cifra: function (c, t, i, p) { PassaMelro(c, t, i); } });
cifras_selection.push({ titulo: 'Passa N Melros', nome: 'PNM', password: true, passwordType: 'numeric', valor: 2, cifra: function ($obj,c, t, i, p) { PassaMelro($obj,c, t, p); } });
