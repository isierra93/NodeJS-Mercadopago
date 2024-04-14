import { Router } from "express";
import { createOrder, processOrder, listenPayments } from "../controllers/payment.controller.js"

const router = Router()

router.post('/api/create-order', createOrder)
router.post('/api/payment', processOrder)
router.get('/api/listPayments', listenPayments)

router.get('/api/failure', (req, res) => res.json({error: 'Failure payment'}))
router.get('/api/pending', (req, res) => res.json({error: 'Pending payment'}))

export default router