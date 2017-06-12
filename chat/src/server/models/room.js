let mongoose = require("mongoose");
let loadClass = require("mongoose-class-wrapper");
// let UserModel = require("user");
// import UserModel from "user";

let roomSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
});

class RoomModel {
    static byId(id) {
        return this.findOne({ _id: id }).exec();
    }

    static create(name, user) {
        let room = new this({
            name: name,
            users: [user]
        });
        room.save();

        // UserModel.addRoom(user, room);
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
