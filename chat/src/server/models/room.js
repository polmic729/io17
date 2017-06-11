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

    static create(name, done) {
        let noRoom = this.byName(name).then(room => {
            if (room) {
                return Promise.reject("room_exists");
            }
            return Promise.resolve(true);
        });

        Promise.all([noRoom]).then(values => {
            let name = values[0];
            let room = new this({
                name: name
            });
            return room.save();
        }).then(room => {
            done(room, null);
        }).catch(error => { // when user exists or other error occurred
            done(null, error);
        });
    }
}

roomSchema.plugin(loadClass, RoomModel);
module.exports = mongoose.model("Chat", roomSchema);
