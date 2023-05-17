import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes/index'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use(express.static('public'));
app.use('/api', routes)

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
