const {Router} = require('express');
const router = Router();

const authController = require('../../controllers/authController.js');

// user authentication
router.post('/sign-up', authController.signUp);
router.post('/login', authController.logIn);
router.get('/', authController.getAll);
// router.post('/authenticate', authenticate);     // public route     

module.exports = router;
