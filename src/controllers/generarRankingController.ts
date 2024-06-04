import { getVinos } from "../../data/tableVinos";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function txtAPDF (textoPlano: string) {
    const documentoPDF = await PDFDocument.create()
    const fuenteDeLetra = await documentoPDF.embedFont(StandardFonts.TimesRoman)
    const pagina = documentoPDF.addPage()
    const {width, height} = pagina.getSize()
    const tamanoFuente = 12
    pagina.drawText(textoPlano, {
        x: 50,
        y: height - 4 * tamanoFuente,
        size: tamanoFuente,
        font: fuenteDeLetra,
        color: rgb(0,0,0),

    })
const pdfBytes = await documentoPDF.save()

return pdfBytes
}

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

    async generarArchivo(){

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
            let elStringEnBase64: string = '';
            const elPDF = await txtAPDF(elString)
            //const buffer:Buffer = Buffer.from(elPDF)
            //elStringEnBase64 = buffer.toString('base64')
            
            
            //return elStringEnBase64
            return atob(elPDF.toString())
            
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