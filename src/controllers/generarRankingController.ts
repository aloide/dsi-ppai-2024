import { getVinos } from "../../data/tableVinos";
import { PDFDocument, PDFPage, rgb } from "pdf-lib";

export class GestorDeRanking {

    private fechaDesdeSeleccionada: Date = new Date()
    private fechaHastaSeleccionada: Date = new Date()
    private tipoReporteSeleccionado: string = ""
    private tipoVisualizacionSeleccionado: string = ""
    private vinos = getVinos()
    private vinosDeSommelier: any[] = []

    constructor() {

    }

    tomarTipoReporte(unTipoReporte: string) {
        this.tipoReporteSeleccionado = unTipoReporte
    }

    tomarTipoVisualizacion(unTipoVisualizacion: string) {
        this.tipoVisualizacionSeleccionado = unTipoVisualizacion
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

    generarArchivo() {

        if (this.tipoVisualizacionSeleccionado == "excel") {

            let cabeceras = "-,NOMBRE,PROMEDIO,PRECIO ARS,BODEGA,VARIETAL,REGION,PAIS\n";
            let data = "";


            if (this.vinosDeSommelier.length == 0) return ""

            for (let i = 0; i < 10; i++) {
                const vinoConcalificacion: any = this.vinosDeSommelier[i];

                data += i + 1 + ","
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


        if (this.tipoVisualizacionSeleccionado == "pdf") {

            let cabeceras = "-,NOMBRE,PROMEDIO,PRECIO ARS,BODEGA,VARIETAL,REGION,PAIS\n";
            let data = "";


            if (this.vinosDeSommelier.length == 0) return ""

            for (let i = 0; i < 10; i++) {
                const vinoConcalificacion: any = this.vinosDeSommelier[i];

                data += i + 1 + ","
                data += vinoConcalificacion.vino.getNombre() + ","
                data += vinoConcalificacion.promedio + ","
                data += vinoConcalificacion.vino.getPrecio() + ","
                data += vinoConcalificacion.vino.getBodega().getNombre() + ","
                data += vinoConcalificacion.vino.getVarietal().getNombre() + ","
                data += vinoConcalificacion.vino.getBodega().getRegion().getNombre() + ","
                data += vinoConcalificacion.vino.getBodega().getRegion().encontrarProvincia().getPais().getNombre() + "\n"

            }
            const elString: string = cabeceras + data
            const buffer:Buffer = Buffer.from(elString)
            const elStringEnBase64: string = buffer.toString('base64')
            return elStringEnBase64
        }
// flujos alternativos para otros tipos de visualizacion

        
        
        
        
        
        

    }


    buscarVinosConResenaEnPeriodo() {

        if (this.tipoReporteSeleccionado == "sommelier") {
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