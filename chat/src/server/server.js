let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let session = require("express-session");

let config = require("../../config");
let auth = require("./auth");
let websockets = require("./websockets");

const PATH_STYLES = path.resolve(__dirname, "../client/styles");
const PATH_DIST = path.resolve(__dirname, "../../dist");

// Connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url);

let app = express();

// initialize web sockets
new websockets(app);

app.use("/styles", express.static(PATH_STYLES));
app.use(express.static(PATH_DIST));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true
}));
app.use("/auth", auth);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
