import express from "express";
import morgan from "morgan";
import PaymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";
import { config } from "dotenv";
config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
app.use(PaymentRoutes)

app.get('/', function ( req, res){
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log('Server iniciado en el PORT: ' + PORT)
})