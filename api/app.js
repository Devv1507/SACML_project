// importing the modules and assigning them in constants
const express = require('express');
const cors = require('cors');
const {engine} = require('express-handlebars');
const path = require('path')
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// ************Settings********************
// assigning the express function to use cors module and others
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
},{
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
}));
app.set('view engine', '.hbs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ************ Middlewares **************
app.use(cors());
// Middleaware to using body parser functionality to read and parse JSON in req.body
app.use(express.json());
// Middleware to works with HTML forms data
app.use(express.urlencoded({extended: false}));

// Import routes
const v1AuthRouter = require('./v1/routes/accountRoutes.js');
const v1UserRouter = require('./v1/routes/usersRoutes.js'); // import the users router version 1
const v1RoleRouter = require('./v1/routes/rolesRoutes.js'); // improt the roles router version 1
const v1CityRouter = require('./v1/routes/citiesRoutes.js');
const v1CreditRequestRouter = require('./v1/routes/creditRequestRoutes.js');

app.get('/', (req, res) => {
  res.render('index');
});

 // using the routers created
app.use('/api/v1/home', v1AuthRouter);
app.use('/api/v1/home/users', v1UserRouter);
app.use('/api/v1/roles', v1RoleRouter);
app.use('/api/v1/cities', v1CityRouter);
app.use('/api/v1/home/credit-requests', v1CreditRequestRouter);

//export default app;
module.exports = app;