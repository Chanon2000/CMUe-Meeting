const User = require('./../models/userModel');

// create User
exports.create = async (req, res, next) => {

  console.log(req.body)
  const doc = await User.create(req.body);


  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
}

// Get user All
exports.getUser = async (req, res, next) => {

}