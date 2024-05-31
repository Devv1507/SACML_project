const {Router} = require('express');
const router = Router();
// ************************ Controllers & Middlewares ************************
const {
    getAllCreditRequests,
    getCreditRequestOfUser,
    addCreditRequest,
    updateCreditRequestById,
    deleteCredetRequestById,

    flaskAnalytics,
    requestDecision
  } = require('../../controllers/creditRequestController.js');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');

// ************************ Validators (Schemas) ************************

// ************************ Private Routes ************************
// (endpoint: /api/v1/home/credit-requests)
// Private routes for admin
router.get('/all/', redirectToLoginIfUnauthorized, checkRole([3]),getAllCreditRequests);
router.delete('/:id', redirectToLoginIfUnauthorized, checkRole([3]), deleteCredetRequestById);

router.get('/analytics/:id', redirectToLoginIfUnauthorized, checkRole([3]), flaskAnalytics);
router.get('/decision/:id', redirectToLoginIfUnauthorized, checkRole([3]), requestDecision)

// User avaliable routes
router.post('/add', redirectToLoginIfUnauthorized, checkRole([2]), addCreditRequest);
router.get('/:id', redirectToLoginIfUnauthorized, checkRole([2,3]), getCreditRequestOfUser);
router.put('/update/:id', redirectToLoginIfUnauthorized, checkRole([2,3]), updateCreditRequestById);

module.exports = router;
