// importing the modules and assigning them in constants
const path = require('path')
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./middleware/passport-jwt'); /*(passport)*/
require('dotenv').config();

// ************************ Settings ************************
// assigning the express function to use cors module and others
const app = express();
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ************************ Middlewares ************************
// to allow cross-domain communication, between frontend and backend
app.use(cors(
    {origin: 'http://localhost:5173'}
));
// Middleaware to use body parser functionality to read and parse JSON in req.body
app.use(express.json());
// Middleware to works with HTML forms data
app.use(express.urlencoded({extended: false}));
// To initialize passport
app.use(passport.initialize());
// cookie-parser middleware
app.use(cookieParser());

// ************************ Global variables ************************


// ************************ Routes ************************
const v1AuthRouter = require('./v1/routes/authRoutes.js');
const v1AccountRouter = require('./v1/routes/accountRoutes.js');
const v1UserRouter = require('./v1/routes/usersRoutes.js'); // import the users router version 1
const v1RoleRouter = require('./v1/routes/rolesRoutes.js'); // import the roles router version 1
const v1CityRouter = require('./v1/routes/citiesRoutes.js');
const v1CreditRequestRouter = require('./v1/routes/creditRequestRoutes.js');

// Using the routers created
app.use('/api/v1', v1AuthRouter);
app.use('/api/v1/home', v1AccountRouter);
app.use('/api/v1/home/users', v1UserRouter);
app.use('/api/v1/roles', v1RoleRouter);
app.use('/api/v1/cities', v1CityRouter);
app.use('/api/v1/home/credit-requests', v1CreditRequestRouter);

//export default app;
module.exports = app;