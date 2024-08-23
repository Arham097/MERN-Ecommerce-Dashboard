const express = require('express');
const productController = require('../Controllers/ProductController')

const router = express.Router();


router.route('/add-product')
  .post(productController.verifyToken, productController.addProduct);

router.route('/delete/:id')
  .delete(productController.verifyToken, productController.deleteProduct);

router.route('/update/:id')
  .patch(productController.verifyToken, productController.updateProduct);

router.route('/')
  .get(productController.verifyToken, productController.getAllProducts);

router.route('/:id')
  .get(productController.verifyToken, productController.getProductById);

router.route('/search/:key')
  .get(productController.verifyToken, productController.searchProduct);


module.exports = router;

