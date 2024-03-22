const jwt = require('jsonwebtoken');

// validation middleware, simply checks if the provided token is valid 
//(token is different for every session login by the user and expires after 1800 minutes)
const validate = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = decodedToken;
        next();
    }catch(error){
        return res.status(401).json({
            'message': "Invalid or expired token provided",
            'error': error
        });
    }
}

module.exports = {validate};