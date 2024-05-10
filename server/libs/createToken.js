const jwt = require('jsonwebtoken');

/**
 * @param {*} account - The user object.  We need this to set the JWT `sub` payload property to the DB user ID
 */
issueJWT = async (account) => {

    const payload = {
      sub: account.id,
      email: account.email, 
      iat: Date.now(),
    };
  
    const signedToken = await jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {expiresIn: process.env.JWT_EXPIRATION}
    );
  
    return {
      token: "Bearer " + signedToken,
      /* expires: signedToken.expiresIn, */
    };
  }

module.exports = {issueJWT}