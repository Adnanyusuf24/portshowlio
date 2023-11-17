const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser,checkStock, checkFollowers} = require('./Middleware/authMiddleware');

const app = express();
app.use(express.json())
app.use(cookieParser());

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://lol:test1234@cluster0.5vtffe0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser,checkStock,checkFollowers,);
app.get('/', (req, res) => res.render('home'));
app.get('/', requireAuth,);
app.get('/addFriend', requireAuth,);
app.get('/stocks', requireAuth,);
app.get('/homepage', requireAuth,);
app.get('/profile', requireAuth,);
app.use(authRoutes);