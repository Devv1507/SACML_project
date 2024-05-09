const {Router} = require('express');
const router = Router();

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// *** Controller & Middleware
const accountController = require('../../controllers/accountController');
const authorize = require('../../middleware/authorize');
//const passportJwt = require('../../middleware/passport-jwt');
const passportLocal = require('../../middleware/passport-local');

// *** Public Routes
// Sign Up 
router.get('/sign-up', accountController.renderNewRegisterForm); // to get the HTML form
router.post('/sign-up', accountController.signUp);               // to send the input data to db


// Log In
//router.get('/login', authController.renderLogInForm);

router.post(
    '/login',
    passportLocal.authenticate('local', { 
        session: false,
        failureRedirect: '/',
        failureFlash: true
    }),
    accountController.logIn
  );

// Log Out
router.get('/logout', authorize.redirectToLoginIfUnauthorized, accountController.logOut);

  module.exports = router;