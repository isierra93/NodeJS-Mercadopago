import { MercadoPagoConfig, Preference, Payment } from "mercadopago"
import { createClient } from "@supabase/supabase-js"

export const createOrder = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const { body } = req
    const { message, donation } = body
    /* if (message && donation) go */
    try {
        const preference = await new Preference(client)
            .create({
                body: {
                    items: [
                        {
                            title: message,
                            quantity: 1,
                            unit_price: donation
                        }
                    ],
                    back_urls:{
                        success:'http://localhost:3000/',
                        failure:'http://localhost:3000/failure',
                        pending:'http://localhost:3000/pending'
                    },
                    auto_return: 'approved'
                }
            })

        res.redirect(preference.sandbox_init_point)
    } catch (error) {
        console.log('ERROR', error)
        res.status(402)
    }
}

export const processOrder = async (req, res) => {
    const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)
    const { body } = req

    try {
        const paymentResponse = await new Payment(mercadopago).get({ id: body.data.id })
        const { id, transaction_amount, description, payment_method_id, currency_id, payer } = paymentResponse
        const order = {
            payment_id: id,
            amount: transaction_amount,
            description: description,
            coin: currency_id,
            paymentMethod: payment_method_id,
            email: payer.email
        }
        console.log('order', order)
        await supabase.from('payments').insert(order)
    } catch (error) {
        console.log('ERROR', error)
        res.status(402)
    }

    res.json({ suscess: true })
}