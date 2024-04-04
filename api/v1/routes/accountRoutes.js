const {Router} = require('express');
const router = Router();

// *** Controller & Middleware
const authController = require('../../controllers/accountController');
const authorize = require('../../middleware/authorize');

// *** Public Routes
// Sign Up 
router.get('/sign-up', authController.renderNewRegisterForm); // to get the HTML form
router.post('/sign-up', authController.signUp);               // to send the input data to db

// Log In
router.get('/login', authController.renderLogInForm);
router.post('/login', authController.logIn); 


// ** Private Routes
// Authentication to get all user account information
/* router.get('/', authorize.validate, authController.getAll); */
router.get('/', authController.getAll);

module.exports = router;
