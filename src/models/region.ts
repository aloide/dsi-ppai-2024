import { getProvincias } from "../../data/tableProvincias"
import { Provincia } from "./provincia"

export class Region {

    private nombre: string
    descripcion: string = ""

    constructor(unNombre: string) {
        this.nombre = unNombre
    }

    encontrarProvincia(): Provincia {
        let tablaProvincias = getProvincias()
        let filter = tablaProvincias.filter(p => p.getNombre() == this.nombre)
        return filter[0]
    }

}