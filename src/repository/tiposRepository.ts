import { getFormatosArchivos } from "../../data/tableFormatoArchivos";
import { getTiposResenas } from "../../data/tableTipoResenas";

export class TiposRepository{

    public getTiposResenas(){
        // acceso a base de datos
        // select * from t_tipoResenas
        return getTiposResenas()
    }

    public getFormatosArchivos(){
        // acceso a base de datos
        // select * from t_formatoArchivos
        return getFormatosArchivos()
    }

}