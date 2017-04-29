let bodyParser = require("body-parser");
let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
let jwt = require("express-jwt");

let auth = require("./auth");
let config = require("../../config");
let websockets = require("./websockets");
let webpackConfig = require("../../webpack.config");

const PATH_STYLES = path.resolve(__dirname, "../client/styles");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url);

let app = express();

let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

new websockets(app);

app.use("/auth", auth);

app.use("/v1", jwt({ secret: config.secret }));
app.get("/v1/secret", (req, res) => {
    res.json({ yay: "We are fucking awesome." });
});

app.use("/styles", express.static(PATH_STYLES));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Fatal server errors handler
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "devel" ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send();
        next();
    }
});

module.exports = app;
