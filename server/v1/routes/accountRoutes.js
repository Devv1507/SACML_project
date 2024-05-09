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

// ** Private Routes
// Authentication to get all user account information
/* router.get('/', authorize.validate, authController.getAll); */
//router.get('/', /* authorize.validate, passport.authenticate('jwt', { session: false }), */ authController.getAll);


router.get('/all', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([3]), accountController.getAll);

router.get('/', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([1,2,3]), accountController.getById);
// Private route
/* router.get('/', passportJwt.authenticate('jwt', { session: false }), (req, res) => {
    // Log the token extracted from the request
    console.log('Extracted token:', req.user);
    res.send('Authenticated successfully!');
}); */

router.delete('/:id', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([3]), accountController.deleteAccount);

router.get(
    '/update/:id', 
    authorize.redirectToLoginIfUnauthorized, 
    authorize.checkRole([1,2,3]), 
    accountController.renderUpdateForm);
router.put('/update/:id', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([1,2,3]), accountController.updateAccount);

/* router.get('/test', authorize.validate, passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('You have accessed a protected route!');
}); */

router.get('/logout', authorize.redirectToLoginIfUnauthorized, accountController.logOut);

module.exports = router;
