
export class Resena {

    premium: Boolean = false
    fechaResena: Date = new Date()
    puntaje: number = 0

    constructor(unPremium: boolean, unFechaResena: Date, unPuntaje: number) {
        this.premium = unPremium
        this.fechaResena = unFechaResena
        this.puntaje = unPuntaje
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

    getVino() {

    }

    sosDePeriodo(fechaD: Date, fechaH: Date): Boolean {
        return fechaD < this.fechaResena && this.fechaResena < fechaH
    }

}