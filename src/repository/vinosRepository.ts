import { getResenas } from "../../data/tableResenas";
import { Resena } from "../models/resena";

export class VinosRepository {

    getResenasByIdVino(idVino: number): Resena[] {
        let resenas = getResenas()

        return resenas.filter(r => r.getIdVino() == idVino)

    }


}