const friend = require("../models/Friends");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { myEmail: '', email:''};
  
    // invalid email
    if (err.message === 'invalid email') {
      errors.myEmail = 'Please enter logged in email';
    }
    // duplicate stock error
    if (err.code === 11000) {
      errors.friendEmail = 'that stock is already registered';
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
//GET controllers

module.exports.addFriend_get = (req, res) => {
    res.render('addFriend');
}

module.exports.addFriend_post = async(req,res) =>{
    const {myEmail,email} = req.body;
    
    try {
          const friends = await friend.create({myEmail,email})
          console.log(friends);
          res.status(201).json({ friends: friends._id });
      }
      catch (err) {
        const errors = handleErrors;
        console.log(errors);
        res.status(400).json({ errors });
        console.log(errors);
    }
  }

  
module.exports.followers_get = (req, res) => {
  res.render('followers');
}
