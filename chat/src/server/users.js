let database = require("./database");

database(function (client) {
    client.collection("users").insertOne({"a": "b"});
});