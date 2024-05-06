const passportJwt = require('./passport-jwt');
const jwt = require('jsonwebtoken');
const models = require('../models');

/**
 * @DESC Verify JWT from authorization header Middleware
 * Checks if the provided JWT token is valid
 * (token is different for every session login by users and expires after 1800 minutes)
 */
const validate = async (req, res, next) => {
  try {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decodedToken;
    const {email} = req.userData;
    const user = await models.User.findOne({email});
    if (!user) {
      return res.status(404).json('User not found in the database')
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Invalid or expired token provided',
      error: error,
    });
  }
};

/**
 * @DESC Check Role Middleware
 * To restricting access to certain routes to only users with specific roles.
 */
const checkRole = (roles) => async (req, res, next) => {
  // retrive user id based on endpoint param
  /* const id = req.params.id; */
  const {id} = req.userData;
  const user = await models.User.findByPk(id);
  /* const userByParams = await models.User.findByPk(id); */
  /*const {email} = req.userData;
  const userByAccount = await models.User.findOne({ where: {email}}); */
  if (!user){
    return res.status(404).json(`Provided id doesn't match with any user in database`)
  }
  else if (!roles.includes(user.roleId)){
    return res.status(401).json(`Sorry you don't have access to this route`)
  }
  if (user.roleId === 3) {
    res.locals.adminRole = true;
  }
  next();
};


// Define custom middleware function to handle unauthorized requests
const redirectToLoginIfUnauthorized = (req, res, next) => {
  passportJwt.authenticate('jwt', { session: false }, (err, account, info) => {
    if (err || !account) {
      // Redirect to login route if unauthorized
      req.flash('error', 'No autorizado');
      return res.redirect('/');
    }
    // Continue to the next middleware or route handler if authorized
    res.locals.userData = account;
    req.userData = account;
    next();
  })(req, res, next);
};


module.exports = { validate, checkRole, redirectToLoginIfUnauthorized};
