const User = require('../Model/User')

exports.register = async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  result.password = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      user: result
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
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })

}