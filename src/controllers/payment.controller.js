import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

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

export const processOrder = async (req, res) =>{

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

    const { body } = req

    const payment = await new Payment(client)
    .get({id: body.data.id})
    .then((paymentResponse) => {
        const {id, transaction_amount, description, payment_method_id, currency_id, payer} = paymentResponse
        const order = {
            id: id,
            amount: transaction_amount,
            description: description,
            coin: currency_id,
            paymentMethod: payment_method_id,
            email: payer.email
        }
        console.log('Orden:', order);
    })
    .catch(err => console.log('ERROR:', err))
    
    res.send('payment')
}