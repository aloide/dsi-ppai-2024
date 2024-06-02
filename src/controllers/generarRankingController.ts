import { getVinos } from "../../data/tableVinos"
import { Vino } from "../models/vino"

export class GestorDeRanking {

    private fechaDesdeSeleccionada: Date = new Date()
    private fechaHastaSeleccionada: Date = new Date()
    private tipoResenaSeleccionada: Object = {}
    private tipoVisualizacionSeleccionado: Object = {}
    private tipoReporte: TipoReporte = TipoReporte.default
    private archivoGenerado: String = "" // Aclaracion: es la ruta al archivo
    private vinos = getVinos()
    private vinosEnPeriodo = []
    private vinosDeSommelier: any[] = []

    constructor() {

    }



    generarRanking() {

    }

    tomarFechaDesde(this: any, fecha: Object) {
        this.fechaDesde = fecha
    }

    esFechaValida(fechaD: Date, fechaH: Date) {
        return (fechaH > fechaD) ? false : true
    }

    tomarConfirmacion() {

    }


    generarArchivo() {
        let cabeceras= "ID,NOMBRE,PROMEDIO,PRECIO ARS,BODEGA,VARIETAL,REGION,PAIS\n"
        let data = ""
        for (let i = 0; i < this.vinosDeSommelier.length; i++) {
            const vinoCompuesto: any = this.vinosDeSommelier[i];
            data += i + ","
            data += vinoCompuesto.vino.getNombre() + ","
            data += vinoCompuesto.promedio + ","
            data += vinoCompuesto.vino.getPrecio() + ","
            data += vinoCompuesto.vino.getBodega().getNombre() + ","
            data += vinoCompuesto.vino.getVarietal().getNombre() + ","
            data += vinoCompuesto.vino.getBodega().getRegion().getNombre() + ","
            data += vinoCompuesto.vino.getBodega().getRegion().encontrarProvincia().getPais().getNombre() + "\n"
        }


/*
class Agenda {
    contactos: Contacto[];
  
    constructor() {
      this.contactos = [];
    }
  
    agregarContacto(contacto: Contacto) {
      this.contactos.push(contacto);
    }
  
    tieneContacto(contacto: Contacto): boolean {
      return this.contactos.some(c => 
        c.nombre === contacto.nombre &&
        c.telefono === contacto.telefono &&
        c.email === contacto.email
      );
    }
  }
  

*/


    }

    buscarVinosConResenaEnPeriodo() {
        

        this.vinos.forEach(unVino => {

            let elPromedio = (unVino.obtenerPromedioPuntajeEnPeriodoYTipoSommelier(this.fechaDesdeSeleccionada, this.fechaHastaSeleccionada))

            if (elPromedio > 0) {
                this.vinosDeSommelier.push({ vino: unVino, promedio: elPromedio })
            }

        });

        this.vinosDeSommelier.sort((v1: any, v2: any) => v1.promedio - v2.promedio)
    

    }

}