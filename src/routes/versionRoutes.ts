import { Router, Request, Response } from "express";

const router = Router()

router.post("/version", (req: Request, res: Response)=>{
    res.send(req.body + " - v1.0")
})


export default router