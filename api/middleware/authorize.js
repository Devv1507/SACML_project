const jwt = require('jsonwebtoken');
const models = require('../models');

/**
 * @DESC Verify JWT from authorization header Middleware
 * Checks if the provided JWT token is valid
 * (token is different for every session login by users and expires after 1800 minutes)
 */
const validate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decodedToken;
    const id = req.userData.accountId;
    const user = await models.User.findByPk(id);
    if (!user) {
      return res.status(404).json('User not found')
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
  const id = req.params.id;
  const user = await models.User.findByPk(id);
  if (!user){
    return res.status(404).json('URL_id parameter does not match with any user in the database')
  }
  else if (!roles.includes(user.roleId)){
    return res.status(401).json('Sorry you do not have access to this route')
  }
  next();
};

module.exports = { validate, checkRole };
