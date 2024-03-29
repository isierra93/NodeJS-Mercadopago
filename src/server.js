import express from "express";
import cors from "cors"
import morgan from "morgan";
import PaymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";
import { config } from "dotenv";
config()

const app = express()
let corsOptions = { 
    origin:'*',
    credentials:true
 }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");

app.use(morgan('dev'))
app.use(PaymentRoutes)

app.get('/', function ( req, res){
    res.render('form.ejs')
})

app.listen(PORT, () => {
    console.log('Server iniciado en el PORT: ' + PORT)
})