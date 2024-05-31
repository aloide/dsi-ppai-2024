import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import routerManager from './routes/routerManager'

dotenv.config()

const app: Express = express()

const port = process.env.PORT || 3000

app.use('/', routerManager)

app.listen(port, () => {
    console.log(`Running in http://localhost:${port}`);
})
