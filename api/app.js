// importing the modules and assigning them in constants
//import express from 'express';
//import cors from 'cors';
const express = require('express');
const cors = require('cors');


const app = express();  // assigning the express function to use cors module and others
// Middlewares
app.use(cors());
app.use(express.json()); // using body parser functionality to read and parse JSON in req.body

// Import routes
const v1UserRouter = require('./v1/routes/usersRoutes.js'); // import the users router version 1
const v1RoleRouter = require('./v1/routes/rolesRoutes.js'); // improt the roles router version 1
const v1AuthRouter = require('./v1/routes/auth.user.js');
 // using the routers created
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/roles', v1RoleRouter);
app.use('/api/v1/user', v1AuthRouter);

//export default app;
module.exports = app;