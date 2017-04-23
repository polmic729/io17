let mongodb = require("mongodb");

// TODO: How the fuck can I make an object which will maintain connection to database?

function database(callback) {
    mongodb.MongoClient.connect("mongodb://localhost:27017/skal", function (err, database) {
        if (err) throw err;
        callback(database);
    });
}

module.exports = database;