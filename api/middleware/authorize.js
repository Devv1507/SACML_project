const jwt = require('jsonwebtoken');

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
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token provided',
      error: error,
    });
  }
};

const models = require('../models');
/**
 * @DESC Check Role Middleware
 * To restricting access to certain routes to only users with specific roles.
 */
const checkRole = (roles) => async (req, res, next) => {
  // retrive user id based on endpoint param
  const id = req.params.id;
  const user = await models.User.findByPk(id);
  !roles.includes(user.roleId)
    ? res.status(401).json('Sorry you do not have access to this route')
    : next();
};

module.exports = { validate, checkRole };
