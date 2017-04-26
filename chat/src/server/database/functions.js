// Don't name files with such a generic names.
// TODO: rename this file
let bcrypt = require("bcryptjs");
let Q = require("q");
let client = require("mongodb").MongoClient;
let config = require("../../../config");

exports.register = function (username, password) {
    const deferred = Q.defer();

    client.connect(config.mongodb.url, function (err, db) {
        const collection = db.collection("users");
        collection.findOne({"username": username})
            .then(function (result) {
                if (result !== null) {
                    deferred.resolve(false);
                    return;
                }
                let user = {
                    "username": username,
                    "password": bcrypt.hashSync(password, 8)
                };
                collection.insert(user)
                    .then(function () {
                        db.close();
                        deferred.resolve(user);
                    });
                db.close();
            });
    });

    return deferred.promise;
};

exports.auth = function (username, password) {
    const deferred = Q.defer();

    client.connect(config.mongodb.url, function (err, db) {
        const collection = db.collection("users");
        collection.findOne({"username": username})
            .then(function (result) {
                if (result !== null && bcrypt.compareSync(password, result.password)) {
                    deferred.resolve(result);
                } else {
                    deferred.resolve(false);
                }
                db.close();
            });
    });

    return deferred.promise;
};
