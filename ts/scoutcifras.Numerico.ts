/*******************************************************************************************************/
/*                                           Númerico                                                  */
/*******************************************************************************************************/
function CodigoNumerico($obj,codigo,texto) {
	var dic = [];

	for ( var i = 0; i < 26;i++)
	{
		dic.push((i + 1).toString() + ' ');
	}

	CodificaComDicionario($obj,texto, dic);
}

cifras_selection.push({ titulo: 'Númerico', nome: 'CN', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoNumerico($obj,c, t); } });
