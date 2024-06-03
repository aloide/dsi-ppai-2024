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
        let cabeceras = "ID,NOMBRE,PROMEDIO,PRECIO ARS,BODEGA,VARIETAL,REGION,PAIS\n";
        let data = "";
        const fs = require("fs");
        const path = require("path");
    
        for (let i = 0; i < 10; i++) {
            const vinoConcalificacion: any = this.vinosDeSommelier[i];
    
            if (!vinoConcalificacion || !vinoConcalificacion.vino) {
                console.error(`El objeto vinoConcalificacion o su propiedad 'vino' está indefinido en la posición ${i}`);
                continue;
            }
    
            const { vino, promedio } = vinoConcalificacion;
            const nombre = vino.getNombre ? vino.getNombre() : 'Desconocido';
            const precio = vino.getPrecio ? vino.getPrecio() : 'Desconocido';
            const bodega = vino.getBodega ? vino.getBodega() : { getNombre: () => 'Desconocido', getRegion: () => ({ getNombre: () => 'Desconocido', encontrarProvincia: () => ({ getPais: () => ({ getNombre: () => 'Desconocido' }) }) }) };
            const varietal = vino.getVarietal ? vino.getVarietal() : { getNombre: () => 'Desconocido' };
    
            data += `${i + 1},`;
            data += `${nombre},`;
            data += `${promedio},`;
            data += `${precio},`;
            data += `${bodega.getNombre ? bodega.getNombre() : 'Desconocido'},`;
            data += `${varietal.getNombre ? varietal.getNombre() : 'Desconocido'},`;
            data += `${bodega.getRegion().getNombre ? bodega.getRegion().getNombre() : 'Desconocido'},`;
            data += `${bodega.getRegion().encontrarProvincia().getPais().getNombre ? bodega.getRegion().encontrarProvincia().getPais().getNombre() : 'Desconocido'}\n`;
        }
    
        let d = new Date();
        let datestring = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}`;
        let fileName = "ranking.csv"; // Cambio del nombre del archivo
        let directoryPath = path.join(__dirname, "../reportes");
        let filePath = path.join(directoryPath, fileName);
    
        // Crear el directorio si no existe
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    
        fs.writeFile(filePath, cabeceras + data, (err: any) => {
            if (err) {
                console.error('Ocurrió un error con la escritura del archivo:', err);
            } else {
                console.log('Archivo escrito con éxito');
            }
        });
    
        return fileName;
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