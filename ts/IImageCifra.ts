export interface IImageCifraDicItem{
    letra:string,
    imagem:string
}

export interface IImageCifra {
    nome:string,
    dic:Array<IImageCifraDicItem>
}