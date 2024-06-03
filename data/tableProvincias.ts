import { Provincia } from "../src/models/provincia";

export function getProvincias(): Provincia[] {
        return[
            new Provincia(1, "Mendoza", 1),
            new Provincia(2, "San Juan", 1),
            new Provincia(3, "La Rioja", 1), 
            new Provincia(4, "Salta", 1),
            new Provincia(5, "Catamarca", 1),
            new Provincia(6, "Neuquen", 1),
            new Provincia(7, "Rio Negro", 1),
            new Provincia(8, "Tucuman", 1),
            new Provincia(9, "Entre Rios", 1),
            new Provincia(10, "Chubut", 1),
            new Provincia(11, "Cordoba", 1),
            new Provincia(12, "Buenos Aires", 1),
            new Provincia(13, "Santa Fe", 1),
            new Provincia(14, "San luis", 1),
            new Provincia(15, "Tierra del fuego", 1)
        ]

}