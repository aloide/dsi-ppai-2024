import { Provincia } from "../src/models/provincia";

export function getProvincias(): Provincia[] {


        return[

            new Provincia("Mendoza"),
            new Provincia("Cordoba"),
            new Provincia("San luis"),
            new Provincia("San Juan"),
            new Provincia("Tierra del fuego"),
            new Provincia("Catamarca")

        ]

}