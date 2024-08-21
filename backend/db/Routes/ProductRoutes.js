const express = require('express');
const productController = require('../Controllers/ProductController')

const router = express.Router();


router.route('/add-product').post(productController.addProduct)


module.exports = router;

