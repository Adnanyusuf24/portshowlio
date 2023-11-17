const { Router } = require('express');
const authController = require('../controllers/authController');
const stockController = require('../controllers/stockController');
const friendController = require('../controllers/friendController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/profile',authController.profile_get);

router.get('/stocks',stockController.stocks_get);
router.post('/stocks',stockController.stocks_post);

router.get('/addFriend',friendController.addFriend_get);
router.post('/addFriend',friendController.addFriend_post);

router.get('/homepage',authController.homepage_get);

router.get('/contact',authController.contact_get);

router.get('/portfolio',stockController.portfolio_get);

router.get('/followers',friendController.followers_get);



module.exports = router;