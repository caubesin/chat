"use strict";

var express = require('express');

var app = express();

var http = require('http');

var ConnectIO = require('./config/socketIO');

var MongoDB = require('./config/mongoDB');

var session = require('express-session');

var bodyParser = require('body-parser');

var passport = require('passport');

require('./config/passport');

app.use(express["static"]("public"));
app.use(session({
  secret: "cats"
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //todo Tao Server

var server = http.createServer(app).listen(process.env.PORT, function () {
  console.log("Server running !");
}); //todo Tao socket lang nghe

ConnectIO.createIOConnect(server); //todo Kết nối MongoDB

MongoDB.createConnect(); //todo Passport //

app.get("/", function (req, res) {
  res.send("Server is running !");
});
app.get('/login', function (req, res) {
  res.send("Sai !");
});
app.post('/loginCheck', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: false
}));