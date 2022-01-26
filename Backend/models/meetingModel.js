const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    start: {  
      type: Date,
      required: [true, 'A meeting must have a start']
    },
    end: {
      type: Date,
    },
    allDay: {
      type: Boolean,
      required: [true, 'A meeting must have a allDay']
    },
    detail: {
      type: String,
    },
    type: {
      type: String,
      enum: {
        values: ['online', 'onsite'],
        message: 'Type is either: online, onsite'
      }
    },
    meeting_link: {
      type: String,
    },
    status: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    boss_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Meeting must belong to a user.']
    },
    participant_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  }
)

const Meeting = mongoose.model('Meeting', meetingSchema)
module.exports = Meeting;