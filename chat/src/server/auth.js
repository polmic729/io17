let express = require("express");
let router = express.Router();
let passport = require("passport");
let LocalStrategy = require("passport-local");
let User = require("./models/user");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use("login",
    new LocalStrategy((user, pass, done) => User.authenticate(user, pass, done)));

passport.use("register",
    new LocalStrategy((user, pass, done) => User.create(user, pass, done)));

router.use(passport.initialize());
router.use(passport.session());

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.post("/register", function(req, res, next) {
    passport.authenticate("register", function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).send("Registration failed");
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.status(204).send("Registration successful");
        });
    })(req, res, next);
});

router.post("/login", function(req, res, next) {
    passport.authenticate("login", function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).send("Unauthorised");
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.status(204).send("Authorised");
        });
    })(req, res, next);
});

module.exports = router;
