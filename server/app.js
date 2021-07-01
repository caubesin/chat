const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const ConnectIO = require('./config/socketIO');
const exSession = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport');
require('./config/mongoDB');



const authenticate = require('./routes/authenticate_Router');
const chat = require('./routes/chat_Router');
const user = require('./routes/user_Router');

app.use(express.static("public"));
app.use(exSession({ 
    secret: "cats",
    resave: true,
    saveUninitialized: true,
    cookie : {
        secure : false,
        //maxAge : 1000*60*100
    }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    header: "Origin, X-Request-With, Content-Type, Accept",
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT"
}

app.use(cors(corsOptions));

//todo Tao Server
const server = http.createServer(app).listen(process.env.PORT, () => {
    console.log("Server running !");
})

//todo Tao socket lang nghe
ConnectIO.createIOConnect(server);


app.get('/', (req, res) =>{
    res.redirect('/chat');
})

app.use('/chat', chat);
app.use('/authenticate', authenticate);
app.use('/user', user);

