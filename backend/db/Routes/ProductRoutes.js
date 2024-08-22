const express = require('express');
const productController = require('../Controllers/ProductController')

const router = express.Router();


router.route('/add-product')
  .post(productController.addProduct);

router.route('/delete/:id')
  .delete(productController.deleteProduct);

router.route('/update/:id')
  .patch(productController.updateProduct);

router.route('/')
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById);

router.route('/search/:key')
  .get(productController.searchProduct);


module.exports = router;

