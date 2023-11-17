const { checkUser } = require("../Middleware/authMiddleware");
const Stock = require("../models/Stock");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', stock:'',shares: ''};
  
    // invalid email
    if (err.message === 'invalid email') {
      errors.email = 'Please enter logged in email';
    }
    
    // invalid email
    if (err.message === 'PLease enter a valid stock name') {
      errors.stock = 'Please enter a correct stock name';
    }
    
    // invalid email
    if (err.message === 'Cast to Number failed') {
      errors.shares = 'Please enter a correct number of shares';
    }
      
    // duplicate stock error
    if (err.code === 11000) {
      errors.stock = 'that stock is already registered';
      return errors;
    }
    // validation errors
    if (err.message.includes('stock validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
}
//GET controllers

module.exports.stocks_get = (req, res) => {
  res.render('stocks');
}

module.exports.stocks_post = async(req,res) =>{
  const {email,stock,shares} = req.body;
  
        console.log(req.body);
  try {
        const portfolio = await Stock.create({email,stock,shares})
        console.log(portfolio);
        res.status(201).json({ portfolio: portfolio._id });
    }
    catch (err) {
      console.log(err)
      const errors = handleErrors;
      res.status(400).json({ errors });
  }
}


module.exports.portfolio_get = (req, res) => {
  Stock.find({},function(err,stock){
    if (err) throw err;
   // object of all the users
   res.render('portfolio',{stock:stock});
  });
}