import { MercadoPagoConfig, Preference, Payment } from "mercadopago"
import { createClient } from "@supabase/supabase-js"

export const createOrder = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const { titleProducts, totalPrice, url_redirect } = req.body
    if (titleProducts && totalPrice && url_redirect) {
        try {
            const preference = await new Preference(client)
                .create({
                    body: {
                        items: [
                            {
                                title: titleProducts,
                                quantity: 1,
                                unit_price: Number(totalPrice)
                            }
                        ],
                        back_urls: {
                            success: url_redirect,
                            failure: process.env.URL_DEPLOY + '/api/failure',
                            pending: process.env.URL_DEPLOY + '/api/pending'
                        },
                        auto_return: 'approved'
                    }
                })
            res.json({
                id: preference.id
            })
        } catch (error) {
            console.log('ERROR', error)
            res.status(402)
        }

        return

    }

    res.json({ error: 'Message & Donation are required' })
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

export const listenPayments = async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)

    try {
        const { data } = await supabase
            .from('payments')
            .select()
        res.json({ listPayments: data })
    } catch (error) {
        console.log('ERROR', error);
        res.status(402)
    }
}