const bcrypt = require("bcryptjs");
const Q = require("q");

const address = "localhost"; //config.mongodbHost
const mongodbUrl = "mongodb://" + address + ":27017/users";
const MongoClient = require("mongodb").MongoClient;

exports.localReg = function (username, password) {
    const deferred = Q.defer();

    MongoClient.connect(mongodbUrl, function (err, db) {
        const collection = db.collection("localUsers");

        //check if username is already assigned in our database
        collection.findOne({"username": username})
            .then(function (result) {
                if (result !== null) {
                    deferred.resolve(false); // username exists
                }
                else {
                    const hash = bcrypt.hashSync(password, 8);
                    const user = {
                        "username": username,
                        "password": hash
                    };

                    collection.insert(user)
                        .then(function () {
                            db.close();
                            deferred.resolve(user);
                        });
                }
            });
    });

    return deferred.promise;
};

exports.localAuth = function (username, password) {
    const deferred = Q.defer();

    MongoClient.connect(mongodbUrl, function (err, db) {
        const collection = db.collection("localUsers");

        collection.findOne({"username": username})
            .then(function (result) {
                if (result === null) {
                    deferred.resolve(false);
                }
                else {
                    const hash = result.password;

                    if (bcrypt.compareSync(password, hash)) {
                        deferred.resolve(result);
                    } else {
                        deferred.resolve(false);
                    }
                }

                db.close();
            });
    });

    return deferred.promise;
};
