const jwt = require('jsonwebtoken');
const Stock = require('../models/Stock');
const User = require('../models/User');
const Friend = require('../models/Friends');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


// check user portfolio
const checkStock = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.stock = null;
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        let email = user.email;
        let stock = await Stock.aggregate([{
          $match: {
          email: email}
          }
        ])
        res.locals.stock = stock;
        
        
        next();
      }
    });
  } else {
    res.locals.stock = null;
    next();
  }
};


const checkFollowers= (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.follower = null;
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        let email = user.email;
        let follower = await Friend.aggregate([{
          $match: {
          myEmail: email}
          }
        ])
        res.locals.follower = follower;
        console.log(follower);
        next();
      }
    });
  } else {
    res.locals.follower = null;
    res.locals.user = null;
    next();
  }
};
module.exports = { requireAuth, checkUser,checkStock,checkFollowers};