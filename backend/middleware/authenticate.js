const jwt = require('jsonwebtoken');
const  User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    } else {
        try {
            const decode = jwt.verify(token, "key");
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
};

module.exports = auth;

