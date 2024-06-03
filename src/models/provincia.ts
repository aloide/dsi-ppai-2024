import { Pais } from "./pais"

export class Provincia {
    private id : number = 0
    private nombre: string = ""
    private pais : Pais = new Pais()

    constructor( unId: number, unNombre: string) {
        this.nombre = unNombre
        this.id = unId
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