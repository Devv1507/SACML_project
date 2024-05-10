const {Router} = require('express');
const {
    addOneUser,
    getAllUsers,
    getOneUserById,
    updateOneUserById,
    deleteOneUserById
} = require('../../controllers/userController.js');
const {redirectToLoginIfUnauthorized, checkRole} = require('../../middleware/authorize');
const {validate} = require('../../middleware/validator');

/*** Validators (Schemas) */
const {userSchema} = require('../../validators.schemas/user.schema')

// assignning the instance of Router class
const router = Router();

// our routes for users (this is adding to root route /api/v1/users)
router.post('/add', validate(userSchema), redirectToLoginIfUnauthorized, checkRole([1]), addOneUser);   

router.get('/all', redirectToLoginIfUnauthorized, checkRole([3]), getAllUsers);                // get all users stored from database
router.get('/:id', validate, checkRole([1]),  getOneUserById);          // get user by id
/* router.post('/',  userController.addOneUser);     */            // add user to database
router.put('/:id', validate, checkRole([2]), updateOneUserById);       // update user information by id
router.delete('/:id', validate, checkRole([2]), deleteOneUserById);    // delete user by id

// exporting the router instance with the user routes
module.exports = router;

/*

router.get('/', async (req, res) => {
    const users = await getUsersDatafromDB();
    res.send(users);
});

// API post route, to sent request to the server
router.post('/register', (req, res) => {
    console.log(req.body);
    const userData = req.body;
    saveUserDatainDB(
        userData.userName,
        userData.userLastName,
        userData.userId,
        userData.userAdress, 
        userData.email);
    res.send('Hello World!');
});

// API get route, to get table of users
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/table.html'));
});


*/