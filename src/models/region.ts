import { getProvincias } from "../../data/tableProvincias"
import { Provincia } from "./provincia"

export class Region {

    private nombre: string
    descripcion: string = ""
    private idProvincia : number = 0


    constructor(unNombre: string, unIdProvincia: number) {
        this.nombre = unNombre
        this.idProvincia = unIdProvincia
    }

    // esto es responsabilidad de repositorio de region
    encontrarProvincia(): Provincia {
        let tablaProvincias = getProvincias() // esto es BD
        let filter = tablaProvincias.filter(prov => prov.getId() == this.idProvincia)
        return filter[0]
    }

    getNombre(){
        return this.nombre
    }

}