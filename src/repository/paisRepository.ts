import { getPais } from "../../data/tablePaises";
import { Pais } from "../models/pais";

export function getPaisById(idPais: number) {
    let paises = getPais()
    return paises.filter(pais => pais.getId() == idPais)[0]
}