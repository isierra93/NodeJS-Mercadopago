import { Router } from "express";
import { createOrder, processOrder } from "../controllers/payment.controller.js"

const router = Router()

router.post('/create-order', createOrder)
router.post('/payment', processOrder)


router.get('/success', (req, res) => res.send('success'))

router.get('/webhook', (req, res) => res.send('webhook'))


export default router