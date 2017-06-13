let User = require("./user");

let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");

let roomSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    users: [[{type: String }, { type: mongoose.Schema.ObjectId, ref: "User" }]]
});

class RoomModel {
    static byId(id) {
        return this.findOne({ _id: id }).exec();
    }

    static addUser(user, room, done) {
        Promise.all([user, room]).then(args => {
            let user = args[0];
            let room = args[1];
            if (room.users === undefined) {
                room.users = [];
            }
            for (let f of room.users) {
                if (f[1] === user.username) {
                    return;
                }
            }
            room.users.push([user._id, user.username ]);
            return room.save();
        }).then(room => {
            done(room, null);
        }).catch(error => {
            done(null, error);
        });
    }

    static create(name, user) {
        let room = new this({
            name: name,
            users: []
        });
        room.users.push([ user._id, user.username ]);

        return User.addRoom(user, room).then(() =>
            room.save()
        );
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
