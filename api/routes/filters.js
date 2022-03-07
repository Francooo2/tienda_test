const express = require('express')
const prodController = require('../controllers/products')
const router = express.Router()

router.get('/', prodController.getProducts)

router.get('/:name', prodController.getProduct)

module.exports = router;
