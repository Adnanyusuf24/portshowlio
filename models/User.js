const mongoose = require('mongoose');

const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


// const friendSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Please enter an email'],
//     lowercase: true,
//     validate: [isEmail, 'Please enter a valid email']
//   },
// })



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  firstName:{
    type: String,
    required: [true, 'Please enter your first name'],
    uppercase:true,
  },
  lastName:{
    type: String,
    required: [true, 'Please enter your last name'],
    uppercase:true,
  },
  bio:{
    type: String,
  },
  // stocks:[stockSchema],
  // friends:[friendSchema],
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

// static method to edit password
userSchema.statics.verifyPassword = async function(email,password, newPassword) {
  const user = await this.findOne({email});
  if(user){ 
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const salt = await bcrypt.genSalt();
      this.newPassword = bcrypt.hash(this.newPassword, salt);
      next();
      return newPassword;
    }
    throw Error('invalid password')
  }
  throw Error('invalid email');
};

userSchema.statics.findUser = async function (email){
  const user = await this.findOne({ email });
  if(user){
    return user;
  }
  return Error('User not found');
}

// friendSchema.statics.addFriend = async function(email){
//   const 
// }
const User = mongoose.model('user', userSchema);

module.exports = User;