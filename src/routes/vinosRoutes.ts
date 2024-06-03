import { Router, Request, Response } from "express";
import { GestorDeRanking } from "../controllers/generarRankingController";
import { getVinos } from "../../data/tableVinos";
import path from "path";
import fs from "fs";

const router = Router()

/*
router.get('/top3', (req: Request, res: Response)=>{
    const top3Vinos = generarPrimeros3vinos()
    res.json(top3Vinos)
})
*/







router.post('/generar-ranking', (req: Request, res: Response) => {
    const gestorDeRanking = new GestorDeRanking();

    console.log(`/generar-ranking : ${JSON.stringify(req.body)}`);

    const fechaD = new Date(req.body.fechaDesde);
    const fechaH = new Date(req.body.fechaHasta);

    gestorDeRanking.tomarFechaDesde(fechaD);
    gestorDeRanking.tomarFechaHasta(fechaH);

    const validacionFecha = gestorDeRanking.esFechaValida(fechaD, fechaH);

    if (!validacionFecha) {
        return res.status(400).json({
            msg: `La fecha no es válida. La fecha ${fechaH} es menor que ${fechaD}`
        });
    }

    const tipoResena = req.body.tipoResena;
    gestorDeRanking.tomarTipoReporte(tipoResena);

    const tipoVisualizacion = req.body.formatoArchivo;
    gestorDeRanking.tomarTipoVisualizacion(tipoVisualizacion);

    gestorDeRanking.buscarVinosConResenaEnPeriodo();

    let csv = (gestorDeRanking.generarArchivo())
    
    res.send(csv)

})


router.get("/vinos", (req: Request, res: Response)=>{
    try {
        const vinos = getVinos()
        res.json(vinos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los vinos" });
    }
})

/*
private getVinos = async (req: Request, res: Response): Promise<void> => {
        try {
            const vinos = await Vino.findAll();
            res.json(vinos);
        } catch (error) {
            res.status(500).send({ message: "Error al obtener los vinos" });
        }
    }
*/


export default router


