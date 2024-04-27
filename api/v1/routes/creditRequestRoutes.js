const {Router} = require('express');
const router = Router();
const creditRequestController = require('../../controllers/creditRequestController.js');
const authorize = require('../../middleware/authorize');

// routes for credit request schema (endpoint: /api/v1/home/credit-requests)
router.get('/', authorize.validate, creditRequestController.addCreditRequest);
router.post('/', authorize.validate, creditRequestController.addCreditRequest);


router.get('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.getCreditRequestOfUser);
router.get('/', authorize.validate, creditRequestController.getAllCreditRequests);
router.put('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.updateCreditRequestById);   
router.delete('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.deleteCredetRequestById);

module.exports = router;
