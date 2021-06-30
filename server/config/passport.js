var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const UserCtl = require('../helper/user_Helper');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const res = await UserCtl.findUserByUserName(username);     
        if(!res) {
            return done(null,false);
        }
        const user = new UserCtl.User(res);
        if(!user.validPassword(password)) {
            return done(null,false);
        }
        return done(null,user)
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id,done) => {
    UserCtl.findUserToLogin(id, done);
})

