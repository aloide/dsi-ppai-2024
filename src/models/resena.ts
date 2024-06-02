
export class Resena {

    premium: Boolean = false
    fechaResena: Date = new Date()
    puntaje: number = 0
    idVino : number = 0

    constructor( unIdVino: number, unPremium: boolean, unFechaResena: Date, unPuntaje: number) {
        this.premium = unPremium
        this.fechaResena = unFechaResena
        this.puntaje = unPuntaje
        this.idVino = unIdVino
    }

    getPuntaje(){
        return this.puntaje
    }

    esPremium(): Boolean {
        return this.premium == true
    }

    esTuFecha() {

    }

    buscarSegunPeriodo() {

    }

    getIdVino(){
        return this.idVino
    }

    sosDePeriodo(fechaD: Date, fechaH: Date): Boolean {
        return fechaD < this.fechaResena && this.fechaResena < fechaH
    }



}