const {Router} = require('express');
const router = Router(); // assignning the instance of Router class
// ************************ Controllers & Middlewares ************************
const {
    addOneUser,
    getAllUsers,
    getOneUserById,
    updateOneUserById,
    deleteOneUserById
} = require('../../controllers/userController.js');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');
const {validate} = require('../../middleware/validator');

// ************************ Validators (Schemas) ************************
const {userSchema} = require('../../validators.schemas/user.schema')

// ************************ Private Routes ************************
// our routes for users (this is adding to root route /api/v1/users)
// Add user information (personal information) to complete registration
router.post('/add', validate(userSchema), redirectToLoginIfUnauthorized, checkRole([1,3]), addOneUser);   
// Get all users - admin
router.get('/all', redirectToLoginIfUnauthorized, checkRole([3]), getAllUsers);
// Get user by id 
router.get('/:id', validate, checkRole([2,3]),  getOneUserById);
// update user information by id
router.put('/:id', validate, checkRole([2,3]), updateOneUserById);
// delete user by id
router.delete('/:id', validate, checkRole([3]), deleteOneUserById);    

// exporting the router instance with the user routes
module.exports = router;