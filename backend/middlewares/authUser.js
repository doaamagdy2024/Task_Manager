const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText.js');

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AppError('Unauthorized (you must be logged in)', 401, httpStatusText.FAILURE));
    }
    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        console.log(payload);
        next();
    } catch (error) {
        return next(new AppError('Unauthorized (you must be logged in)', 401, httpStatusText.FAILURE));
    }
}

module.exports = authUser;