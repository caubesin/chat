const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport');

const authenticate_controller = require('../controller/authenticate_Controller');

router.post('/', passport.authenticate('local', {
                            successRedirect: '/chat',
                            failureRedirect: '/authenticate/fail',
                            failureFlash: false}));

router.get('/fail', authenticate_controller.fail_authenticate);

module.exports = router;