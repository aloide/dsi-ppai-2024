import { getVinos } from "../../data/tableVinos"
import { Vino } from "../models/vino"

export class GestorDeRanking {

    private fechaDesdeSeleccionada: Date = new Date()
    private fechaHastaSeleccionada: Date = new Date()
    private tipoReporteSeleccionado: string = ""
    private tipoVisualizacionSeleccionado: string = ""
    //private tipoReporte: TipoReporte = TipoReporte.default
    private archivoGenerado: String = "" // Aclaracion: es la ruta al archivo
    private vinos = getVinos()
    private vinosEnPeriodo = []
    private vinosDeSommelier: any[] = []

    constructor() {

    }

    tomarTipoReporte(unTipoReporte: string) {
        this.tipoReporteSeleccionado = unTipoReporte
    }

    tomarTipoVisualizacion(unTipoVisualizacion: string) {
        this.tipoVisualizacionSeleccionado = unTipoVisualizacion
    }

    generarRanking() {

    }

    tomarFechaDesde(unaFecha: Date) {
        this.fechaDesdeSeleccionada = unaFecha
    }

    tomarFechaHasta(unaFecha: Date) {
        this.fechaHastaSeleccionada = unaFecha
    }

    esFechaValida(fechaD: Date, fechaH: Date) { 
        return (fechaH >= fechaD) ? true : false
    }

    tomarConfirmacion() {

    }


    generarArchivo() {
        let cabeceras = "ID,NOMBRE,PROMEDIO,PRECIO ARS,BODEGA,VARIETAL,REGION,PAIS\n"
        let data = ""
        for (let i = 0; i < 10; i++) {
            const vinoConcalificacion: any = this.vinosDeSommelier[i];
            data += i + ","
            data += vinoConcalificacion.vino.getNombre() + ","
            data += vinoConcalificacion.promedio + ","
            data += vinoConcalificacion.vino.getPrecio() + ","
            data += vinoConcalificacion.vino.getBodega().getNombre() + ","
            data += vinoConcalificacion.vino.getVarietal().getNombre() + ","
            data += vinoConcalificacion.vino.getBodega().getRegion().getNombre() + ","
            data += vinoConcalificacion.vino.getBodega().getRegion().encontrarProvincia().getPais().getNombre() + "\n"
        }


        return cabeceras + data


    }

    buscarVinosConResenaEnPeriodo() {

        if(this.tipoReporteSeleccionado == "sommelier"){
            this.vinos.forEach(unVino => {

                let elPromedio = (unVino.obtenerPromedioPuntajeEnPeriodoYTipoSommelier(this.fechaDesdeSeleccionada, this.fechaHastaSeleccionada))
    
                if (elPromedio > 0) {
                    this.vinosDeSommelier.push({ vino: unVino, promedio: elPromedio })
                }
            });
    
            this.vinosDeSommelier.sort((v1: any, v2: any) => v2.promedio - v1.promedio)
        }
        
        // Implementacion para otros tipos
    }

}