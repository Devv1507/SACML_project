const {Router} = require('express');
const router = Router();

const authController = require('../../controllers/authController');
const authorize = require('../../middleware/authorize');

// User account sign up and login
router.post('/sign-up', authController.signUp); // public route     
router.post('/login', authController.logIn);    // public route

// Authentication to get all user account information
router.get('/:id', authorize.validate, authorize.checkRole([1]), authController.getAll); // private route     

module.exports = router;
