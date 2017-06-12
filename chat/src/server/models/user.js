let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");
let bcrypt = require("bcrypt");
let config = require("../../../config");

let userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHashed: { type: String, required: true },
    rooms: [{ type: mongoose.Schema.ObjectId, ref: "Room" }]
});

class UserModel {
    static byId(id) {
        return this.findOne({ _id: id }).exec();
    }

    static byUsername(username) {
        return this.findOne({ username }).exec();
    }

    static getAll() {
        return this.find({}).sort("username").exec();
    }

    static makePassword(pass) {
        return bcrypt.hash(pass, config.crypto.saltRounds);
    }

    static credentialsValid(username, password) {
        let usernameRegex = /^[a-z0-9]+$/;
        return !(!username.match(usernameRegex) || password.length < 8);
    }

    static authenticate(username, password, done) {
        if (!this.credentialsValid(username, password)) {
            done(null, true);
            return;
        }
        let userPromise = this.byUsername(username);
        let authPromise = userPromise.then(user => {
            if (!user)
                return Promise.reject();
            return bcrypt.compare(password, user.passwordHashed);
        });

        Promise.all([userPromise, authPromise]).then(values => {
            let [user, authenticated] = values;
            done(authenticated ? user : null, null);
        }).catch(error => {
            done(null, error);
        });
    }

    static create(username, password, done) {
        if (!this.credentialsValid(username, password)) {
            done(null, true);
            return;
        }
        let noUser = this.byUsername(username).then(user => {
            if (user) {
                return Promise.reject("user_exists");
            }
            return Promise.resolve(true);
        });
        let newHash = this.makePassword(password);

        Promise.all([noUser, newHash]).then(values => {
            // noUser wasn't rejected => user doesn't exist
            let hash = values[1];
            let user = new this({
                username: username,
                passwordHashed: hash
            });
            return user.save();
        }).then(user => {
            done(user, null);
        }).catch(error => { // when user exists or other error occurred
            done(null, error);
        });
    }
}

userSchema.plugin(loadClass, UserModel);
module.exports = mongoose.model("User", userSchema);
