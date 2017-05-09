/*******************************************************************************************************/
/*                                        Romano-Arabe                                                 */
/*******************************************************************************************************/
var romano_arabe = ["I ", "1 ", "2 ", "3 ", "II ", "4 ", "5 ", "6 ", "III ", "7 ", "8 ", "9 ", "10 ", "11 ", "IV ", "12 ", "13 ", "14 ", "15 ", "16 ", "V ", "17 ", "18 ", "19 ", "20 " , "21 "];
function CodigoRomanoArabe($obj,codigo, texto) {
	CodificaComDicionario($obj,texto, romano_arabe);
}

cifras_selection.push({ titulo: 'Romano-Arabe', nome: 'RA', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoRomanoArabe($obj,c, t); } });
	