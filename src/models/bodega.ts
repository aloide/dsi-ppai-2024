import { RegionRepository } from "../repository/regionRepository";
import { Region } from "./region";

export class Bodega {

    private region: Region = new Region("", 0)

    private nombre: string;

    constructor(unNombreBodega: string, unNombreRegion: string) {
        this.nombre = unNombreBodega
        this.region = new RegionRepository().getRegionByNombre(unNombreRegion)
    }

    getNombre() {
        return this.nombre
    }

    getRegion() {
        return this.region
    }



}