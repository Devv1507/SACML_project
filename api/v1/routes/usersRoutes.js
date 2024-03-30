const {Router} = require('express');
const userController = require('../../controllers/userController.js');
const authorize = require('../../middleware/authorize');

// assignning the instance of Router class
const router = Router();
// our routes for user schema (this is adding to root route /api/v1/users)
router.get('/', authorize.validate, userController.getAllUsers);                // get all users stored from database
router.get('/:id', authorize.validate, authorize.checkRole([1]),  userController.getOneUserById);          // get user by id
router.post('/',  userController.addOneUser);                // add user to database
router.put('/:id', authorize.validate, authorize.checkRole([1]), userController.updateOneUserById);       // update user information by id
router.delete('/:id', authorize.validate, authorize.checkRole([1]), userController.deleteOneUserById);    // delete user by id

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