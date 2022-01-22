const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');


const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'A user must have a firstname'],
    },
    lastname: {
      type: String,
      required: [true, 'A user must have a lastname'],
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user'
    }
  }
)


const User = mongoose.model('User', userSchema);
module.exports = User;