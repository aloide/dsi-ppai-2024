export class Pais{

    private nombre : string = ""
    private id : number = 0

    constructor(unNombre: string, idPais: number){
        this.nombre = unNombre
        this.id = idPais
    }

    getNombre(){
        return this.nombre
    }

    getId(){
        return this.id
    }


}