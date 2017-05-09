/*******************************************************************************************************/
/*                                       Primeira/Última Letra Falsa                                   */
/*******************************************************************************************************/
function GetLetra(){
	return String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random() * 26));
}

function CodigoLetraFalsa($obj,codigo,texto,password,ultima){
	var appendTxt = '';
	var rTexto = new RegExp(/(\w)+|\s/g);
	var text = texto;
		
	while ((match = rTexto.exec(text)) != null)
	{
		if (match[0] != ' ' && match[0] != '\r' && match[0] != '\n')
		{
			if (ultima){
				appendTxt += match[0]+ GetLetra();
			} else {
				appendTxt += GetLetra() + match[0];
			}
		}
		
		if (match[0] == '\n') {
				appendTxt += '<br />';
		} else {
			if ( match[0] == ' '){
				appendTxt += ' ';
			}
		}
		
		texto.replace(match[0],'');
	}
	$obj.CodigoOut.html(appendTxt);
}
cifras_selection.push({ titulo: 'Primeira Letra Falsa', nome: 'PLF', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoLetraFalsa($obj,c, t, p,false); } });
cifras_selection.push({ titulo: 'Última Letra Falsa', nome: 'ULF', password: false, passwordType: '', valor: 0, cifra: function ($obj,c, t, i, p) { CodigoLetraFalsa($obj,c, t, p,true); } });
 
