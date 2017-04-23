let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema({
    username: String,
    password: String,
    createdAt: Date,
    token: String,
});

User.path("username").set(function (v) {
    return String.toLower(v);
});



module.exports = global.db.model("User", User);