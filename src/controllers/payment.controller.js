import { MercadoPagoConfig, Preference } from "mercadopago"



export const createOrder = async (req, res) => {

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });


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

    console.log(preference.sandbox_init_point);

    res.redirect(preference.sandbox_init_point)
}