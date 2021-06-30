const express = require('express');
const router = express.Router();

const chat_controller = require('../controller/chat_Controller');

const isLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
};

router.get('/', isLogin, chat_controller.sendData);

router.post('/addUserToRoom', chat_controller.addUserToRoom);

router.post('/createChatRoom', chat_controller.createChatRoom)

module.exports = router;