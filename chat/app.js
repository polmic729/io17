const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();


// Authentication strategy configuration
passport.use(new Strategy({
    "usernameField": "login",
    "passwordField": "password"
},

    (username, password, cb) => cb(null, "User")
));

passport.serializeUser((user, done) => {

    done(null, user);

});

passport.deserializeUser((id, done) => {

    done(null, id);

});

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Uncomment after placing your favicon in /public
// App.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/login", login);

// Catch 404 and forward to error handler
app.use((req, res, next) => {

    const err = new Error("Not Found");

    err.status = 404;
    next(err);

});

// Error handler
app.use((err, req, res, next) => {

  // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
    res.status(err.status || 500);
    res.render("error");

});

module.exports = app;