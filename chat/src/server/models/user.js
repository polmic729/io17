let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");
let bcrypt = require("bcrypt");
let config = require("../../../config");

let userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHashed: { type: String, required: true }
});

class UserModel {
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
            done(null, authenticated ? user : null);
        }).catch(reason => {
            done(reason, null);
        });
    }

    static create(username, password, done) {
        // Check if this user already exists
        let existingUser = this.byUsername(username);
        let newHash = this.makePassword(password);

        Promise.all([existingUser, newHash]).then(values => {
            let [user, hash] = values;
            if (user) // if user already exists we stop next actions
                return Promise.reject();
            let newUser = new this({
                username: username,
                passwordHashed: hash
            });
            return newUser.save();
        }).then(result => {
            done(null, result);
        }).catch(reason => {
            done(reason, null);
        });
    }
}

userSchema.plugin(loadClass, UserModel);
module.exports = mongoose.model("User", userSchema);
