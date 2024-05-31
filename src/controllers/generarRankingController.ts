import { getVinos } from "../../data/tableVinos"

export class GestorDeRanking {

    fechaDesdeSeleccionada: Date = new Date()
    fechaHastaSeleccionada: Date = new Date()
    tipoResenaSeleccionada: Object = {}
    tipoVisualizacionSeleccionado: Object = {}
    tipoReporte: TipoReporte = TipoReporte.default
    archivoGenerado: String = "" // Aclaracion: es la ruta al archivo
    vinos = getVinos()
    vinosEnPeriodo = []

    constructor() {

    }

    generarRanking() {

    }

    tomarFechaDesde(this: any, fecha: Object) {
        this.fechaDesde = fecha
    }

    esFechaValida() {

    }

    tomarConfirmacion() {

    }


    generarArchivo() {

    }


    /*
        buscarVinosPreiium(){
            - busca los vinos
            - ordena los vinos
            - genera el archivo
            - 
        }
    */

    buscarVinosConResenaEnPeriodo() {
        this.vinos.forEach(vino => {

            let promedio = vino.obtenerPromedioPuntajeEnPeriodoYTipoSommelier(this.fechaDesdeSeleccionada, this.fechaHastaSeleccionada)


        });
    }

}