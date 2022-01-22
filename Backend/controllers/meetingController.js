const Meeting = require("../models/meetingModel")

// Get meeting All
exports.getMeeting = async (req, res, next) => {
  const doc = await Meeting.find()

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
}

// Get meeting by id


// Create meeting


// Update meeting


// delete meeting