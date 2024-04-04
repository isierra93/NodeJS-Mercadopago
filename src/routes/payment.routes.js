import { Router } from "express";
import { createOrder, processOrder, listenOrders } from "../controllers/payment.controller.js"

const router = Router()

router.post('/create-order', createOrder)
router.post('/payment', processOrder)
router.get('/donations', listenOrders)

router.get('/success', (req, res) => res.send('success'))

export default router