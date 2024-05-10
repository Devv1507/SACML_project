const {Router} = require('express');
const router = Router();

// *** Controller & Middleware
const {signUp, logIn, logOut} = require('../../controllers/accountController');
const authorize = require('../../middleware/authorize');
//const passportJwt = require('../../middleware/passport-jwt');
//const passportLocal = require('../../middleware/passport-local');
const {validate} = require('../../middleware/validator');

/*** Validators (Schemas) */
const {registerSchema, loginSchema} = require('../../validators.schemas/auth.schema')

// *** Public Routes
// Sign Up 
router.post('/sign-up', validate(registerSchema), signUp);               // to send the input data to db


// Log In
//router.get('/login', authController.renderLogInForm);

router.post('/login', validate(loginSchema), logIn);

// Log Out
router.get('/logout', authorize.redirectToLoginIfUnauthorized, logOut);

  module.exports = router;