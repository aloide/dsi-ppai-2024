import { Bodega } from "../src/models/bodega";

export function getBodegas(): Bodega[]{
    return[
        new Bodega("Bodega 1", "Norte"),
        new Bodega("Bodega 2", "Sur"),
        new Bodega("Bodega 3", "Este"),
        new Bodega("Bodega 4", "Sur")
    ]

}