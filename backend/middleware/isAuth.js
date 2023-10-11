const jwt = require("jsonwebtoken");
require('dotenv').config();

/**
 * Validates the JWT token. 
 * Either throws an error or sets the userId in the request and calls next/ 
 */
module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}