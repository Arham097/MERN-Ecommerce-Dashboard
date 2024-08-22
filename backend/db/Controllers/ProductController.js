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

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'No product found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        products
      }
    })

  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const newProduct = await Product.findByIdAndDelete(req.params.id);
    if (!newProduct) {
      return res.status(404).json({
        status: 'failed',
        message: 'No product found'
      })
    }
    res.status(204).json({
      status: 'success',
      data: {
        newProduct: null
      }
    })
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({
        status: 'failed',
        message: 'Product is not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }

}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'failed',
        message: "Product Not Found"
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }

}

exports.searchProduct = async (req, res) => {
  try {
    let products = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ]
    });
    // res.send(products)
    if (!products) {
      return res.status(404).json({
        status: 'failed',
        message: "Result not Found"
      })
    };
    res.status(200).json({
      status: 'success',
      data: {
        products
      }
    })
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }
}
