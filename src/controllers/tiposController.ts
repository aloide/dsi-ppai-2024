import { TiposRepository } from "../repository/tiposRepository";


export class GestorTipos{

    private tiposResenas : any
    private formatosArchivos: any

    constructor(){
        const repo = new TiposRepository()
        this.tiposResenas = repo.getTiposResenas()
        this.formatosArchivos = repo.getFormatosArchivos()
    }
    
    getTiposResenas(){
        return this.tiposResenas
    }

    getFormatosArchivos(){
        return this.formatosArchivos
    }


}