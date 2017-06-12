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
            room.users.push([user._id, user.name ]);
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

        User.addRoom(user, room, (user, error) => {
            if (error !== null) {
                console.log(error);
            } else {
                room.save();
            }
        });
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
