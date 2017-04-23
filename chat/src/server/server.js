let path = require("path");
let express = require("express");
let websockets = require("./websockets");
let mongoose = require("mongoose");

let auth = require("./auth");

global.db = mongoose.createConnection("mongodb://localhost/skal", { promiseLibrary: require("bluebird") });

const PATH_STYLES = path.resolve(__dirname, "../client/styles");
const PATH_DIST = path.resolve(__dirname, "../../dist");

let app = express();

// initialize web sockets
new websockets(app);

app.use("/styles", express.static(PATH_STYLES));
app.use(express.static(PATH_DIST));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

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