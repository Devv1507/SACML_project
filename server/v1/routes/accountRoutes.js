const {Router} = require('express');
const router = Router();
// ************************ Controllers & Middlewares ************************
const {
    getAll,
    getById,
    deleteAccount,
    updateAccount,
} = require('../../controllers/accountController');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');

// ************************ Validators (Schemas) ************************

// ************************ Private Routes ************************
// Needed previous authentication to get all user account information
// Get all accounts  - admin
router.get('/all', redirectToLoginIfUnauthorized, checkRole([3]), getAll);
// Get my account - any
router.get('/', redirectToLoginIfUnauthorized, checkRole([1,2,3]), getById);
// Delete account - admin
router.delete('/:id', redirectToLoginIfUnauthorized, checkRole([3]), deleteAccount);
// Update account information - any
router.put('/update/:id', redirectToLoginIfUnauthorized, checkRole([1,2,3]), updateAccount);

module.exports = router;
