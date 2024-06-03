import { Provincia } from "../src/models/provincia";

export function getProvincias(): Provincia[] {
        return[
            new Provincia(1, "Mendoza"),
            new Provincia(2, "San Juan"),
            new Provincia(3, "La Rioja"), 
            new Provincia(4, "Salta"),
            new Provincia(5, "Catamarca"),
            new Provincia(6, "Neuquen"),
            new Provincia(7, "Rio Negro"),
            new Provincia(8, "Tucuman"),
            new Provincia(9, "Entre Rios"),
            new Provincia(10, "Chubut"),
            new Provincia(11, "Cordoba"),
            new Provincia(12, "Buenos Aires"),
            new Provincia(13, "Santa Fe"),
            new Provincia(14, "San luis"),
            new Provincia(15, "Tierra del fuego")
        ]

}