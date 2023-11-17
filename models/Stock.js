const mongoose = require('mongoose');
const { isEmail } = require('validator');


const stockSchema = new mongoose.Schema({
    email: {
      type: Object,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    stock:{
      type: String,
      required: [true, 'PLease enter a valid stock name'],
    },
    shares:{
      type: Number,
      required: [true, 'Please enter a number of shares'],
      isNaN:[true, 'Please enter a number']
    }
})

  
const Stock = mongoose.model('stock',stockSchema);
module.exports = Stock;