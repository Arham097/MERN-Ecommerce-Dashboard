const Product = require('../Model/Product')

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(201).json({
      status: 'success',
      data: {
        product: result
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }
}