const {Router} = require('express');
const router = Router();
const creditRequestController = require('../../controllers/creditRequestController.js');
const authorize = require('../../middleware/authorize');

router.post('/add', authorize.validate,  creditRequestController.addCreditRequest);
router.get('/', authorize.validate, creditRequestController.getAllCreditRequests);  


module.exports = router;
