let express = require("express");
let router = express.Router();
let passport = require("passport");
let LocalStrategy = require("passport-local");
let User = require("./models/user");

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
    User.byId(userId).then(user => {
        done(null, user);
    }).catch(reason => {
        done(reason, false);
    });
});

passport.use("login",
    new LocalStrategy((user, pass, done) => User.authenticate(user, pass, done)));

passport.use("register",
    new LocalStrategy((user, pass, done) => User.create(user, pass, done)));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// FIXME somewhat works but probably autologins by mistake
// i believe we shouldn't do this here unless we want to autologin
router.post("/register", passport.authenticate("register"), (req, res) => {
    res.status(204).send();
});

router.post("/login", passport.authenticate("login"), (req, res) => {
    res.status(204).send();
});

module.exports = router;
