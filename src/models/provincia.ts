import { Pais } from "./pais"

export class Provincia {

    private nombre: string = ""
    private pais : Pais = new Pais()

    constructor(unNombre: string) {
        this.nombre
    }

    getNombre(): string {
        return this.nombre
    }

    getPais() : Pais {
        return this.pais
    }

}