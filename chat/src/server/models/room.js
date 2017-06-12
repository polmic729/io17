let User = require("./user");

let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");

let roomSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
});

class RoomModel {
    static byId(id) {
        return this.findOne({ _id: id }).exec();
    }

    static create(name, user) {
        User.byUsername(user)
            .then((user) => {
            let room = new this({
                name: name,
                users: []
            });
            room.users.push(user);
            room.save();

            User.addRoom(user, room, (user, error) => {
                if (error !== null) {
                    console.log(error);
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
