import { Region } from "./region";

export class Bodega {

    private region: Region = new Region()

    private _nombre: string;

    public get nombre(): string {
        return this._nombre;
    }

    constructor(unNombre: string) {
        this._nombre = unNombre
    }

    getNombre() {
        return this._nombre
    }

    getRegion() {
        return this.region
    }



}