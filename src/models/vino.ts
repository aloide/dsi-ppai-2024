import { getResenas } from "../../data/tableResenas"
import { Bodega } from "./bodega"
import { Resena } from "./resena"
import { Varietal } from "./varietal"

export class Vino {

    private nombre: string = ""
    private precio: number = 0
    private resenas: Resena[] = []
    private varietal : Varietal = new Varietal()
    private bodega : Bodega = new Bodega()

    constructor(unNombre: string, unPrecio: number) {
        this.nombre = unNombre
        this.precio = unPrecio
        this.resenas = getResenas()
    }

    getNombre(): string {
        return this.nombre
    }

    getPrecio(): number {
        return this.precio
    }

    getBodega() : Bodega{
        return this.bodega
    }

    getVarietal(): Varietal {
        return this.varietal
    }

    calcularPromedio(puntaje: number, cantidad: number) {
        if (cantidad == 0) return 0

        return puntaje / cantidad
    }

    // FIXME: rename me plz
    obtenerPromedioPuntajeEnPeriodoYTipoSommelier(fechaDesde: Date, fechaHasta: Date) {
        let puntaje = 0;
        let cantidad = 0

        this.resenas.forEach(resena => {
            if (resena.esPremium() && resena.sosDePeriodo(fechaDesde, fechaHasta)) {
                puntaje += resena.getPuntaje()
                cantidad += 1

            }
        });

        return this.calcularPromedio(puntaje, cantidad)
        
    }


}