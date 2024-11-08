const User = require('../models/user');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');

const httpStatusText = require('../utils/httpStatusText.js');

const asynchWrapper = require('../middlewares/asynchWrapper.js');


const register = asynchWrapper(async (req, res, next) => {
    // when the user register, he should provide his name, email, password
    // what about the token? we make it required in the model
    console.log(req.body);
    const user = new User(req.body);
    // password hashing
    user.password = await bcrypt.hash(user.password, 8);
    console.log(user);

    // generate jwt token
    const token = await generateJWT({id: user._id, email: user.email});
    console.log(token);
    user.token = token;
    await user.save();
    res.json({status: httpStatusText.SUCCESS, data: user, token});


});

const login = asynchWrapper(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return next(new AppError('Invalid email or password', 400, httpStatusText.FAILURE));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError('Invalid email or password', 400, httpStatusText.FAILURE));
    }
    // generate jwt token --> we need to update the token in the database each time the user logs in
    const token = await generateJWT({id: user._id, email: user.email});
    user.token = token;
    await user.save();
    res.json({status: httpStatusText.SUCCESS, data: user, token});


});


module.exports = {
    register,
    login
};

