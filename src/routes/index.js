const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

//Redirects
router.get('/callback', indexController.callback)

//Notifications - (Webhooks)
router.post('/notifications', indexController.notifications)

// POST /comprar
router.post('/comprar', indexController.comprar);


module.exports = router;
