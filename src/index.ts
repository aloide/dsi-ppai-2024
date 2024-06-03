import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import routerManager from './routes/routerManager'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()


const app: Express = express()

// config del cors
app.use(cors({
    origin: "*"
}))

// Middleware para analizar solicitudes JSON
app.use(express.json());

// Middleware para analizar solicitudes con cuerpos codificados en url
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

app.use('/', routerManager)




app.listen(port, () => {
    console.log(`Running in http://localhost:${port}`);
})
