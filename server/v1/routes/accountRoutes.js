const {Router} = require('express');
const router = Router();

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// *** Controller & Middleware
const {
    getAll,
    getById,
    deleteAccount,
    updateAccount,
} = require('../../controllers/accountController');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');


// ** Private Routes
// Authentication to get all user account information
/* router.get('/', authorize.validate, authController.getAll); */
//router.get('/', /* authorize.validate, passport.authenticate('jwt', { session: false }), */ authController.getAll);


router.get('/all', redirectToLoginIfUnauthorized, checkRole([3]), getAll);

router.get('/', redirectToLoginIfUnauthorized, checkRole([1,2,3]), getById);
// Private route
/* router.get('/', passportJwt.authenticate('jwt', { session: false }), (req, res) => {
    // Log the token extracted from the request
    console.log('Extracted token:', req.user);
    res.send('Authenticated successfully!');
}); */

router.delete('/:id', redirectToLoginIfUnauthorized, checkRole([3]), deleteAccount);
router.put('/update/:id', redirectToLoginIfUnauthorized, checkRole([1,2,3]), updateAccount);

/* router.get('/test', authorize.validate, passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('You have accessed a protected route!');
}); */

module.exports = router;
