import { Provincia } from "../src/models/provincia";

export function getProvincias(): Provincia[] {
        return[
            new Provincia("Mendoza"),
            new Provincia("San Juan"),
            new Provincia("La Rioja"), 
            new Provincia("Salta"),
            new Provincia("Catamarca"),
            new Provincia("Neuquen"),
            new Provincia("Rio Negro"),
            new Provincia("Tucuman"),
            new Provincia("Entre Rios"),
            new Provincia("Chubut"),
            new Provincia("Cordoba"),
            new Provincia("Buenos Aires"),
            new Provincia("Santa Fe"),
            new Provincia("San luis"),
            new Provincia("Tierra del fuego")
        ]

}