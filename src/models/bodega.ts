import { Region } from "./region";

export class Bodega {

    private region: Region = new Region("")

    private nombre: string;

    constructor(unNombre: string, nombreRegion: string) {
        this.nombre = unNombre
        this.region = new Region(nombreRegion)
    }

    getNombre() {
        return this.nombre
    }

    getRegion() {
        return this.region
    }



}