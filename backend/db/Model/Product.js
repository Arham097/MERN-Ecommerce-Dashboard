const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product's Name"]
  },
  price: {
    type: String,
    required: [true, "Please Enter Product's Price"]
  },
  category: {
    type: String,
    required: [true, "Please Enter Product's Category "]
  },
  userId: {
    type: String,
    // required: true
  },
  company: {
    type: String,
    required: [true, "Please Enter Company's Name"]
  }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
