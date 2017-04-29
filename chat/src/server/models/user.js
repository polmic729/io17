let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");
let bcrypt = require("bcrypt");
let config = require("../../../config");

let userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHashed: { type: String, required: true }
});

class UserModel {
    static byId(id) {
        return this.findOne({ _id: id }).exec();
    }

    static byUsername(username) {
        return this.findOne({ username }).exec();
    }

    static makePassword(pass) {
        return bcrypt.hash(pass, config.crypto.saltRounds);
    }

    static authenticate(username, password, done) {
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
        let existingUser = this.byUsername(username);
        let newHash = this.makePassword(password);

        Promise.all([existingUser, newHash]).then(values => {
            let [user, hash] = values;
            if (user) // already exists
                return Promise.reject();
            user = new this({
                username: username,
                passwordHashed: hash
            });
            return user.save();
        }).then(user => {
            done(user, null);
        }).catch(error => {
            done(null, error);
        });
    }
}

userSchema.plugin(loadClass, UserModel);
module.exports = mongoose.model("User", userSchema);
