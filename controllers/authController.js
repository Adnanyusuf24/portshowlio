const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Friends = require("../models/Friends");
const Stocks = require("../models/Stock");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '',firstName: '',lastName: '',bio:'' };

  // invalid first name
  if (err.message === 'empty firstName') {
    errors.firstName = 'Please enter a first name';
  }
  
  // incorrect last name
  if (err.message === 'empty lastName') {
    errors.lastName = 'Please enter a last name';
  }
    
  // incorrect password
  if (err.message === 'invalid email') {
    errors.email = 'That email is not registered';
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }
  // incorrect password
  if (err.message === 'invalid password') {
    errors.password = 'please enter Correct password';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// GET controllers
module.exports.homepage_get = (req, res) => {
  res.render('homepage');
}
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.profile_get = (req, res) => {
  res.render('profile');
}

module.exports.portfolio_get = (req, res) => {
  res.render('portfolio');
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.editPassword_get = (req, res) => {
  res.render('editPassword');
}

module.exports.addFriend_get = (req, res) => {
  res.render('addFriend');
}

module.exports.pieChart_get = (req, res) => {
  res.render('pieChart');
}

module.exports.contact_get = (req, res) => {
  res.render('contact');
}
//POST controllers

module.exports.signup_post = async (req, res) => {
  const { email,password,firstName,lastName,bio } = req.body;
  
  
  try {
    const user = await User.create({ email,password ,firstName,lastName,bio});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    
  console.log(user);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}