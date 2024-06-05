import { PDFDocument } from "pdf-lib";
import { getVinos } from "../../data/tableVinos";
import jsPDF from "jspdf";
import Table from "nd-table";


//import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// obsolete
/*
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

*/

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

    async generarArchivo() {

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

            const tableAscii = new Table("Nombre", "Promedio", "Precio", "Bodega", "Varietal", "Region", "Pais")


            for (let i = 0; i < 10; i++) {
                const vinoConcalificacion: any = this.vinosDeSommelier[i];

                let id = i + 1 + ","
                let nombreVino = vinoConcalificacion.vino.getNombre()
                let promedio = vinoConcalificacion.promedio
                let precioVino = vinoConcalificacion.vino.getPrecio()
                let nombreBodega = vinoConcalificacion.vino.getBodega().getNombre()
                let nombreVarietal = vinoConcalificacion.vino.getVarietal().getNombre()
                let nombreRegion = vinoConcalificacion.vino.getBodega().getRegion().getNombre()
                let nombrePais = vinoConcalificacion.vino.getBodega().getRegion().encontrarProvincia().getPais().getNombre()

                tableAscii.addRow(nombreVino, promedio, precioVino, nombreBodega, nombreVarietal, nombreRegion, nombrePais)

            }
            // const elStringCSV: string = cabeceras + data

            const doc = new jsPDF()
            doc.setFontSize(12)
            doc.text("BonVinos - 2024", 10, 10)
            doc.text(tableAscii.toCSV(), 10, 20)
            doc.text(new Date().toLocaleDateString(), 10, 270)
            doc.text("Grupo 5 - COWABUNGA - UTN FRC - Catedra de Diseño de Sistemas de Software", 10, 280)
            //doc.addImage("..\\..\\assets\\img\\copa.png","png",10,10,10,30)

            return doc.output("datauristring")

            // let elStringEnBase64: string = '';
            // const elPDF = await txtAPDF(elString)

            // return elStringEnBase64
            // return atob(elPDF.toString())

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