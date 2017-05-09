/*******************************************************************************************************/
/*                                           Codigo com password                                       */
/*******************************************************************************************************/
function Existe(dicionario,letra){
	var flag = false;	
	for ( var i = 0; i < dicionario.length; i++)	{
		if ( dicionario[i] == letra ){
			return true;
		}
	}
	return false;
}
function CodigoFCHorizontal($obj,codigo, texto, numero, password) {
	var code = [];
	for ( var p = 0 ; p < password.length; p++)	{
		if (!Existe(code, password.charAt(p))) {
			code.push(password.charAt(p));
		}
	}
	
	var A = 'A'.charCodeAt(0);
	for (var j = 0; j < 26; j++) {
		if (!Existe(code, String.fromCharCode(j + A))) {
			code.push(String.fromCharCode(j + A));
		}
	}
	
	CodificaComDicionario($obj,texto, code);
}

function CodigoFCVertical($obj,codigo, texto, numero, password){
	var bDic = [];
	for ( var p = 0 ; p < password.length; p++)	{
		if (!Existe(bDic, password.charAt(p))) {
			bDic.push(password.charAt(p));
		}
	}
	
	var A = 'A'.charCodeAt(0);
	for (var j = 0; j < 26; j++) {
		if (!Existe(bDic, String.fromCharCode(j + A))) {
			bDic.push(String.fromCharCode(j + A));
		}
	}
	var dHorz = [[],[]];
	for (var i = 0; i < 13; i++){
		dHorz[0].push(bDic[i]);
		dHorz[1].push(bDic[i+13]);
	}	
		
	for (var i = 0; i< 13; i++ ){
		var chr1 = dHorz[0][i].charCodeAt(0)-A;
		var chr2 = dHorz[1][i].charCodeAt(0)-A;
		bDic[chr1] = String.fromCharCode(chr2+A);
		bDic[chr2] = String.fromCharCode(chr1+A);
	}
	
	CodificaComDicionario($obj,texto, bDic);
}


cifras_selection.push({ titulo: 'Frase Chave Vertical'
					  , nome: 'FCV'
					  , password: true
					  , passwordType: 'text'
					  , valor: 'palavra'
					  , cifra: function ($obj,c, t, i, p) { CodigoFCVertical($obj,c, t, i, p); } });
cifras_selection.push({ titulo: 'Frase Chave Horizontal'
					  , nome: 'FCH'
					  , password: true
					  , passwordType: 'text'
					  , valor: 'palavra'
					  , cifra: function ($obj,c, t, i, p) { CodigoFCHorizontal($obj,c, t, i, p); } });
