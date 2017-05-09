/*******************************************************************************************************/
/*                                        Batalha Naval                                                */
/*******************************************************************************************************/  
function IndexOf(bNaval,chr)
{
	for ( var i = 0; i < bNaval.length; i++)
	{
		if ( bNaval[i] == chr )
		{
			return i;
		}
	}
	return -1;
}

function CodigoBatalhaNaval($obj,codigo,texto,password){
	var bNaval = [];
	var appendTxt = '';
	
	var A = "A".charCodeAt(0);
	var num = password.charCodeAt(0) - A;
	
	for(var i = 0; i < 26; i++)
	{
		bNaval.push(String.fromCharCode(i + A));
	}
	
	for (; num > 0; num--) {
		bNaval.push(bNaval.shift());
	}	
	bNaval.shift();

	for(var i = 0; i < texto.length; i ++ ){
		var chr = texto.charAt(i);
		if (chr != password.charAt(0))
		{
			if ( (chr >= 'A' && chr <= 'Z') && chr != num+A){
				var idx = IndexOf(bNaval,chr);
				var row = Math.floor(idx/5)+1;
				var column = Math.floor(idx%5);

				appendTxt += String.fromCharCode(column+A) + row;
			} else {
				if (chr == '\n') {
					appendTxt += '<br />';
				} else {
					if ( chr == ' '){
						appendTxt += ' ';
					}
				}
			}
		}		
	}	
	$obj.CodigoOut.html(appendTxt);
}
cifras_selection.push({ titulo: 'Batalha Naval', nome: 'BN', password: true, passwordType: 'text', valor: 'J', cifra: function ($obj,c, t, i, p) { CodigoBatalhaNaval($obj,c, t, i, p); } });
