const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller.js');

router.route('/register')
    .post(usersController.register);

router.route('/login')
    .post(usersController.login);

module.exports = router;


