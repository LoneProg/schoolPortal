const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. User not found.' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};

module.exports = authMiddleware;
