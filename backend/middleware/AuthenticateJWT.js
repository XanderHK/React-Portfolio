const jwt = require('jsonwebtoken');
require('dotenv').config()

/**
 * Checks if the token is valid if it is 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1].replace(/^\[(.+)\]$/, '$1')

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.user = user
            next()
        });
    } else {
        res.sendStatus(401)
    }
};

module.exports = authenticateJWT