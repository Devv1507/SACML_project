const {Router} = require('express');
const router = Router();

const authController = require('../../controllers/authController');
const authorize = require('../../middleware/authorize');

// user authentication
router.post('/sign-up', authController.signUp);
router.post('/login', authController.logIn);
router.get('/', authorize.validate, authController.getAll);
// router.post('/authenticate', authenticate);     // public route     

module.exports = router;
