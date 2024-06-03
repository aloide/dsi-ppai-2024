import { Router, Request, Response } from "express";
import { GestorDeRanking } from "../controllers/generarRankingController";
import { getVinos } from "../../data/tableVinos";
import path from "path";

const router = Router()

/*
router.get('/top3', (req: Request, res: Response)=>{
    const top3Vinos = generarPrimeros3vinos()
    res.json(top3Vinos)
})
*/


router.post('/generar-ranking', (req: Request,res: Response)=>{
    var gestorDeRanking = new GestorDeRanking()    

    console.log(`/generar-ranking : ${ JSON.stringify(req.body)}`);
    
    

    var fechaD = new Date(req.body["fechaDesde"])

    
    

    gestorDeRanking.tomarFechaDesde(fechaD)

    var fechaH = new Date(req.body["fechaHasta"]) 
    gestorDeRanking.tomarFechaHasta(fechaH)

    var validacionFecha = gestorDeRanking.esFechaValida(fechaD, fechaH)

    if(!validacionFecha){
        res.json({
            msg: `La fecha no es valida. La fecha ${fechaH} es menor que ${fechaD}`
        }).status(400)
        return
    }

    var tipoResena = req.body["tipoResena"]
    gestorDeRanking.tomarTipoReporte(tipoResena)

    var tipoVisualizacion = req.body["formatoArchivo"]
    gestorDeRanking.tomarTipoVisualizacion(tipoVisualizacion)

    gestorDeRanking.buscarVinosConResenaEnPeriodo()
    

    let csv = (gestorDeRanking.generarArchivo())

    //res.send( path.join(__dirname,"../../reportes", rutaReporte) )
    
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


