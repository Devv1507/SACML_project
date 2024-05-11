const jwt = require('jsonwebtoken');

/**
 * @param {*} account - The user object.  We need this to set the JWT `sub` payload property to the DB user ID
 */
issueJWT = async (account, secret, time) => {

    const payload = {
      sub: account.id,
      email: account.email, 
      iat: Date.now(),
    };
  
    const signedToken = await jwt.sign(
        payload, 
        secret, 
        {expiresIn: time}
    );

    const token = "Bearer " + signedToken;
    return signedToken;
  }

module.exports = {issueJWT}