import { MercadoPagoConfig, Preference, Payment } from "mercadopago"
import { createClient } from "@supabase/supabase-js"

export const createOrder = async (req, res) => {

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });


    const preference = await new Preference(client)
        .create({
            body: {
                items: [
                    {
                        title: 'Mi producto',
                        quantity: 1,
                        unit_price: 2000
                    }
                ],
            }
        })

    res.redirect(preference.sandbox_init_point)
}

export const processOrder = async (req, res) => {
    const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)
    const data = {amount:200, email:'ivaaaan', coin:'ARS'}
    const result = await supabase
        .from('payments')
        .insert(data)
    console.log('supabase:', result);

    const { body } = req

    const payment = await new Payment(mercadopago)
        .get({ id: body.data.id })
        .then((paymentResponse) => {
            const { id, transaction_amount, description, payment_method_id, currency_id, payer } = paymentResponse
            const order = {
                id: id,
                amount: transaction_amount,
                description: description,
                coin: currency_id,
                paymentMethod: payment_method_id,
                email: payer.email
            }

            console.log('order', order);

        })
        .catch((err) => {
            console.log('ERROR:', err)
            res.status(402)
        })

    res.json({ suscess: true })
}