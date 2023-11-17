const mongoose = require('mongoose');
const { isEmail } = require('validator');


const friendSchema = new mongoose.Schema({
  myEmail:{
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  email:{
      
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  }
})

const Friends = mongoose.model('friends',friendSchema);
module.exports = Friends;