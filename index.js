import express from "express";
import cors from "cors"
import morgan from "morgan";
import PaymentRoutes from "./src/routes/payment.routes.js";
import { config } from "dotenv";
config()

const PORT = process.env.PORT || 3000

const app = express()
let corsOptions = { 
    origin:'*',
    credentials:true
 }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
app.use(PaymentRoutes)

app.get('/', function ( req, res){
    res.send('Soy un server sin template engine')
})

app.listen(PORT, () => {
    console.log('Server iniciado en el PORT: ' + PORT)
})