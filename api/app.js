// importing the modules and assigning them in constants
const express = require('express');
const cors = require('cors');

// assigning the express function to use cors module and others
const app = express();  
// Middlewares
app.use(cors());
// using body parser functionality to read and parse JSON in req.body
app.use(express.json()); 

// Import routes
const v1AuthRouter = require('./v1/routes/auth.js');
const v1UserRouter = require('./v1/routes/usersRoutes.js'); // import the users router version 1
const v1RoleRouter = require('./v1/routes/rolesRoutes.js'); // improt the roles router version 1
const v1CityRouter = require('./v1/routes/citiesRoutes.js');
const v1CreditRequestRouter = require('./v1/routes/creditRequestRoutes.js');

 // using the routers created
 app.use('/api/v1/home', v1AuthRouter);
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/roles', v1RoleRouter);
app.use('/api/v1/cities', v1CityRouter);
app.use('/api/v1/home/credit-requests', v1CreditRequestRouter);

//export default app;
module.exports = app;