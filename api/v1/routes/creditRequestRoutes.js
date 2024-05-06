const {Router} = require('express');
const router = Router();
const creditRequestController = require('../../controllers/creditRequestController.js');
const authorize = require('../../middleware/authorize');

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// routes for credit request schema (endpoint: /api/v1/home/credit-requests)
router.get('/add', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([2]), creditRequestController.renderNewRequest);
router.post('/add', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([2]), creditRequestController.addCreditRequest);

router.get('/', authorize.redirectToLoginIfUnauthorized, authorize.checkRole([2]), creditRequestController.getCreditRequestOfUser);

router.get('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.getCreditRequestOfUser);
router.get('/', authorize.validate, creditRequestController.getAllCreditRequests);
router.put('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.updateCreditRequestById);   
router.delete('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.deleteCredetRequestById);

module.exports = router;
