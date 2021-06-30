const express = require('express');
const router = express.Router();

const user_controller = require('../controller/user_Controller');

router.get('/login', user_controller.sendLoginPage);

router.post('/signup', user_controller.signUpReq);

router.post('/findUser', user_controller.findUser);

module.exports = router;