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

    // TODO check if this method is correct
    static create(name, user, done) {
        let room = new this({
            name: name,
            users: [user]
        });
        room.save(function(err) {
            if (err) {
                done(null, err);
            } else {
                done(room, null);
            }
        });
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
