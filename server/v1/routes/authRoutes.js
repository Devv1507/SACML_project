const {Router} = require('express');
const router = Router();
// ************************ Controller & Middleware ************************
const {signUp, logIn, logOut, handleRefreshToken} = require('../../controllers/authController');
const authorize = require('../../middleware/authorize');
const {validate} = require('../../middleware/validator');

// ************************ Validators (Schemas) ************************
const {registerSchema, loginSchema} = require('../../validators.schemas/auth.schema')

// ************************ Public Routes ************************
// Sign Up 
router.post('/sign-up', validate(registerSchema), signUp);
// Log In
router.post('/login', validate(loginSchema), logIn);
// Refresh Token
router.get('/refresh', handleRefreshToken);
// Log Out
router.get('/logout', authorize.redirectToLoginIfUnauthorized, logOut);

module.exports = router;