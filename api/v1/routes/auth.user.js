const {Router} = require('express');
const router = Router();

const authController = require('../../controllers/authController.js');

// user authentication
router.get('/sign-up', authController.signUp);     



module.exports = router;
