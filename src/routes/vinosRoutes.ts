import { Router, Request, Response } from "express";
import { GestorDeRanking } from "../controllers/generarRankingController";
import { getVinos } from "../../data/tableVinos";

const router = Router()

/*
router.get('/top3', (req: Request, res: Response)=>{
    const top3Vinos = generarPrimeros3vinos()
    res.json(top3Vinos)
})
*/


router.post('/generar-ranking', (req: Request,res: Response)=>{
    var gestorDeRanking = new GestorDeRanking()    

    console.log(req.body);
    

    var fechaD = new Date(req.body["fecha-desde"])
    gestorDeRanking.tomarFechaDesde(fechaD)

    var fechaH = new Date(req.body["fecha-hasta"]) 
    gestorDeRanking.tomarFechaHasta(fechaH)

    var validacionFecha = gestorDeRanking.esFechaValida(fechaD, fechaH)

    if(!validacionFecha){
        res.json({
            msg: `La fecha no es valida. La fecha ${fechaH} es menor que ${fechaD}`
        }).status(400)
        return
    }

    var tipoResena = req.body["opcion1"]
    gestorDeRanking.tomarTipoReporte(tipoResena)

    var tipoVisualizacion = req.body["opcion2"]
    gestorDeRanking.tomarTipoVisualizacion(tipoVisualizacion)

    gestorDeRanking.buscarVinosConResenaEnPeriodo()
    

    res.send(gestorDeRanking.generarArchivo())

    //res.download(archivo)

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
