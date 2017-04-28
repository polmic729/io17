let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let session = require("express-session");
let mongoStore = require("connect-mongo")(session);
let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')

let auth = require("./auth");
let config = require("../../config");
let websockets = require("./websockets");
let webpackConfig = require('../../webpack.config')

const PATH_STYLES = path.resolve(__dirname, "../client/styles");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url);

let app = express();

var compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// initialize web sockets
new websockets(app);

app.use("/styles", express.static(PATH_STYLES));

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
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "devel" ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
