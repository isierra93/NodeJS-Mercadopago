import { Router } from "express";
import { createOrder, processOrder, listenOrders } from "../controllers/payment.controller.js"

const router = Router()

router.post('/create-order', createOrder)
router.post('/payment', processOrder)
router.get('/donations', listenOrders)

router.get('/failure', (req, res) => res.send('Failure payment'))
router.get('/pending', (req, res) => res.send('Pending payment'))

export default router