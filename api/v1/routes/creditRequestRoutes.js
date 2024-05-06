const {Router} = require('express');
const router = Router();
const {
    getAllCreditRequests,
    getCreditRequestOfUser,
    renderNewRequest,
    addCreditRequest,
    updateCreditRequestById,
    deleteCredetRequestById,
    renderUpdateForm,
  } = require('../../controllers/creditRequestController.js');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// routes for credit request schema (endpoint: /api/v1/home/credit-requests)
router.get('/add', redirectToLoginIfUnauthorized, checkRole([2]), renderNewRequest);
router.post('/add', redirectToLoginIfUnauthorized, checkRole([2]), addCreditRequest);

router.get('/', redirectToLoginIfUnauthorized, checkRole([2,3]), getCreditRequestOfUser);
router.get('/:id', redirectToLoginIfUnauthorized, checkRole([2,3]), getCreditRequestOfUser);

/* router.put('/:id', authorize.validate, authorize.checkRole([1]), creditRequestController.updateCreditRequestById); */
router.get('/update/:id', redirectToLoginIfUnauthorized, checkRole([2,3]), renderUpdateForm);
router.put('/update/:id', redirectToLoginIfUnauthorized, checkRole([2,3]), updateCreditRequestById); 

/** Private Routes for Admin */
router.get('/all', redirectToLoginIfUnauthorized, checkRole([3]),getAllCreditRequests);
router.delete('/:id', redirectToLoginIfUnauthorized, checkRole([3]), deleteCredetRequestById);

module.exports = router;
