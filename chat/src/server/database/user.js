let Schema = require("mongoose").Schema;

let User = new Schema({
    username: String,
    password: String,
    createdAt: Date,
});

User.path("username").set(function (v) {
    return String.toLower(v);
});

module.exports = global.db.model("User", User);