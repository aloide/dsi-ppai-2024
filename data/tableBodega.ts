import { Bodega } from "../src/models/bodega";

export function getBodegas(): Bodega[]{
    return[
        new Bodega("Bodega 1", "Norte", 3),
        new Bodega("Bodega 2", "Sur", 4),
        new Bodega("Bodega 3", "Este", 5),
        new Bodega("Bodega 4", "Sur", 12)
    ]

}