const {Router} = require('express');
const router = Router();

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// *** Controller & Middleware
const authController = require('../../controllers/accountController');
const authorize = require('../../middleware/authorize');
const passportJwt = require('../../middleware/passport-jwt');
const passportLocal = require('../../middleware/passport-local');

// *** Public Routes
// Sign Up 
router.get('/sign-up', authController.renderNewRegisterForm); // to get the HTML form
router.post('/sign-up', authController.signUp);               // to send the input data to db

// Log In
router.get('/login', authController.renderLogInForm);
//router.post('/login', authController.logIn); 


router.post(
    '/login',
    passportLocal.authenticate('local', { 
        session: false,
        failureRedirect: '/api/v1/home/login',
        failureFlash: true
    }),
    authController.logIn
  );

// ** Private Routes
// Authentication to get all user account information
/* router.get('/', authorize.validate, authController.getAll); */
//router.get('/', /* authorize.validate, passport.authenticate('jwt', { session: false }), */ authController.getAll);

// Define custom middleware function to handle unauthorized requests
const redirectToLoginIfUnauthorized = (req, res, next) => {
    passportJwt.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        // Redirect to login route if unauthorized
        req.flash('error', 'Unauthorized');
        return res.redirect('/api/v1/home/login');
      }
      // Continue to the next middleware or route handler if authorized
      next();
    })(req, res, next);
  };

router.get('/', redirectToLoginIfUnauthorized, authController.getAll
);
// Private route
/* router.get('/', passportJwt.authenticate('jwt', { session: false }), (req, res) => {
    // Log the token extracted from the request
    console.log('Extracted token:', req.user);
    res.send('Authenticated successfully!');
}); */

router.delete('/:id', authController.deleteAccount);

router.get('/update/:id', authController.renderUpdateForm);
router.put('/update/:id', authController.updateAccount);

/* router.get('/test', authorize.validate, passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('You have accessed a protected route!');
}); */

router.get('/logout', authController.logOut);

module.exports = router;
