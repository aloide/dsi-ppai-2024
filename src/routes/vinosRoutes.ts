import { Router, Request, Response } from "express";
import { GestorDeRanking } from "../controllers/generarRankingController";

const router = Router()

/*
router.get('/top3', (req: Request, res: Response)=>{
    const top3Vinos = generarPrimeros3vinos()
    res.json(top3Vinos)
})
*/


router.get('/generar-ranking', (req: Request,res: Response)=>{
    var gestorDeRanking = new GestorDeRanking()

    var fechaD = new Date() // TODO:
    gestorDeRanking.tomarFechaDesde(fechaD)

    var fechaH = new Date() // TODO: 
    //gestorDeRanking.tomarFechaHasta(fechaH)

    var tipoResena = {} // TODO: 
    //gestorDeRanking.tomarTipoResena(tipoResena)

    gestorDeRanking.buscarVinosConResenaEnPeriodo()
    

    var archivo = gestorDeRanking.generarArchivo()

    //res.download(archivo)

})


export default router
