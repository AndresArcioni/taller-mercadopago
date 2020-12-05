const mercadopago = require("mercadopago/lib/mercadopago");

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    callback: (req, res) => {
        console.log(req.query);
        if(req.query.status.includes('success')){
            return res.render('success', {
                payment_type: req.query.payment_type,
                external_reference: req.query.external_reference,
                collection_id: req.query.collection_id,
            })
        }
        if(req.query.status.includes('pending')){
            return res.render('pending')
        }
        if(req.query.status.includes('failure')){
            return res.render('failure')
        }
        
    },
    comprar: (req, res) => {

        let host = 'https://mercado-pago-cert-andres.herokuapp.com/'
        let urlCb = 'callback?status='

        let preference = {
            back_urls : {
                success: host + urlCb + 'success',
                pending: host + urlCb + 'pending',
                failure: host + urlCb + 'failure'
            },
            notification_url: host + 'notifications',
            payer: {//clientes/payer
                name: 'Ryan',
                surname: 'Dahl',
                email: 'test_user_63274575@testuser.com',
                phone: {
                    area_code: '11',
                    number: 55556666,
                },
                address: {
                    zip_code: '1234',
                    street_name: 'Monroe',
                    street_number: 860
                }
            },
            payment_methods: {
                excluded_payment_methods: [
                    {id: 'visa'}
                ],
                excluded_payment_types: [
                    {id:'atm'}//No permito pagos en cajeros automaticos
                ],
                installments: 12//cantidad maxima de cuotas.
            },
            items: [{
                id: 1234,
                picture_url: '',
                title: 'Product_name',
                description: 'Dispositivo móvil de Tienda e-commerce',
                unit_price: 998,//FLOAT
                quantity: 1//INTEGER
                //aca iria la consulta a la db es decir este es un producto harcodeado
            }],
            external_reference: 'andresarcioni@gmail.com'
        }

        mercadopago.preferences.create(preference).then(response => {
            //global.id = response.body.id => ID de compra
            global.init_point = response.body.init_point
            res.render('confirm')
        }).catch(error => {
            console.log(error)
            res.send('error')
        })
    },
    notifications: (req, res) => {
        console.log(req.body);

        res.status(200).end('ok')
    }
}