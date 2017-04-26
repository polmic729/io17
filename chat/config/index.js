let env = process.env.ENV || "devel";
let cfg = require("./config." + env);

module.exports = cfg;
