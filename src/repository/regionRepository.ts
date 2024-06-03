import { getRegiones } from "../../data/tableRegiones";
import { Region } from "../models/region";

export class RegionRepository{


    getRegionByNombre(nombreRegion : string):  Region{
        let regiones = getRegiones()
        return regiones.filter(region => region.getNombre() == nombreRegion)[0]
    }

}