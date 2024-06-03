import { Pais } from "./pais"
import { getPaisById } from "../repository/paisRepository"

export class Provincia {
    private id : number = 0
    private nombre: string = ""
    private pais : Pais = new Pais('', 0)

    constructor( unId: number, unNombre: string, idPais:number) {
        this.nombre = unNombre
        this.id = unId
        this.pais = getPaisById(idPais)
    }

    getNombre(): string {
        return this.nombre
    }

    getPais() : Pais {
        return this.pais
    }

    getId() : number {
        return this.id
    }

}