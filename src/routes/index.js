const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

const indexController = require("../controllers/indexController");


mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
})


/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

//Redirects
router.get('/callback', indexController.callback)

//Notifications - (Webhooks)
router.get('/notifications', indexController.notifications)

// POST /comprar
router.post('/comprar', indexController.comprar);


module.exports = router;
