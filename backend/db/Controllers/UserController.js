const User = require('../Model/User')
const jwt = require('jsonwebtoken');
const jwtKey = 'e-commerce';

exports.register = async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  result.password = undefined;
  const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: '1h' })
  res.status(201).json({
    status: 'success',
    data: {
      user: result,
      token
    }
  })
}
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password',
    })
  }
  const user = await User.findOne(req.body);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid email or password',
    })
  }
  if (user) {
    const token = jwt.sign({ id: user._id }, jwtKey, { expiresIn: '1h' })
    res.status(200).json({
      status: 'success',
      data: {
        user,
        token
      }
    })
  }
}