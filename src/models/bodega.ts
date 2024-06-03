import { Region } from "./region";

export class Bodega {

    private region: Region = new Region("",0)

    private nombre: string;

    constructor(unNombre: string, idRegion: number) {
        this.nombre = unNombre
        this.region = new Region(unNombre,idRegion )
    }

    getNombre() {
        return this.nombre
    }

    getRegion() {
        return this.region
    }



}