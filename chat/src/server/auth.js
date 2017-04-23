let express = require("express");
let router = express.Router();
let passport = require("passport");
let localStrategy = require("passport-local");
let funct = require("./database/functions.js");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use("local-signin", new localStrategy(
    {passReqToCallback: true}, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        funct.localAuth(username, password)
            .then(function (user) {
                if (user) {
                    req.session.success = "You are successfully logged in " + user.username + "!";
                    done(null, user);
                }
                if (!user) {
                    req.session.error = "Could not log user in. Please try again."; //inform user could not log them in
                    done(null, user);
                }
            });
    }
));

passport.use("local-signup", new localStrategy(
    {passReqToCallback: true}, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        funct.localReg(username, password)
            .then(function (user) {
                if (user) {
                    req.session.success = "You are successfully registered and logged in " + user.username + "!";
                    done(null, user);
                }
                if (!user) {
                    req.session.error = "That username is already in use, please try a different one."; //inform user could not log them in
                    done(null, user);
                }
            });
    }
));

router.use(passport.initialize());
router.use(passport.session());

router.get("/logout", (req, res) => {
    let name = "dddd";
    req.logout();
    res.redirect("/");
    req.session.notice = "You have successfully been logged out " + name + "!";
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/success",
    failureRedirect: "/"
})
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post("/login", passport.authenticate("local-signin", {
    successRedirect: "/success",
    failureRedirect: "/"
})
);


module.exports = router;
