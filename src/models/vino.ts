import { getResenas } from "../../data/tableResenas"
import { Resena } from "./resena"

export class Vino {

    nombre: string = ""
    precio: number = 0
    resenas: Resena[] = []

    constructor(unNombre: string, unPrecio: number) {
        this.nombre = unNombre
        this.precio = unPrecio
        this.resenas = getResenas()
    }

    // No se usa para este diagrama de clase
    /*
    sosDeSomelier(unSommelier: Sommelier) {
        this.sommelier == unSommelier
    }
    */

    calcularPromedio(puntaje: number, cantidad: number) {
        if (cantidad == 0) return 0

        return puntaje / cantidad
    }

    obtenerPromedioPuntajeEnPeriodoYTipoSommelier(fechaDesde: Date, fechaHasta: Date) {
        let puntaje = 0;
        let cantidad = 0

        this.resenas.forEach(resena => {
            if (resena.esPremium() && resena.sosDePeriodo(fechaDesde, fechaHasta)) {
                puntaje += resena.getPuntaje()
                cantidad += 1

            }
        });


        return {
            nombre: this.nombre,
            precio: this.precio,
            promedio: this.calcularPromedio(puntaje, cantidad)

        }

        
    }


}