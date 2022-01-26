const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

// create User
exports.create = catchAsync(async (req, res, next) => {
  const doc = await User.create(req.body);

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// Get user All
exports.getUser = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// Get User By Id
exports.getUserById = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// Delete User
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
