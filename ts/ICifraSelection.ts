export interface ICifraSelection {
    titulo:string,
    nome: string,
    valor:string|number|null,
    password: Boolean,
    passwordType: 'text'|'year'|'numeric'|''|null,
    cifra: ($obj:JQuery, codigo:any,texto?:string,valor?:string|number,password?:string ) => void
}