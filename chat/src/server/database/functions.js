// Don't name files with such a generic names.
// TODO: rename this file
let bcrypt = require("bcryptjs");
let Q = require("q");
let client = require("mongodb").MongoClient;

const MONGO_URL = "mongodb://localhost:27017/users";

exports.register = function (username, password) {
    const deferred = Q.defer();

    client.connect(MONGO_URL, function (err, db) {
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

                // TODO: why don't we close database here? look at line 50.
            });
    });

    return deferred.promise;
};

exports.auth = function (username, password) {
    const deferred = Q.defer();

    client.connect(MONGO_URL, function (err, db) {
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
