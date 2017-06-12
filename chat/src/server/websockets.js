let socketio = require("socket.io");
let http = require("http");
let config = require("../../config");
let User = require("./models/user");
let Room = require("./models/room");

class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(config.websocket.port,
            config.websocket.host);

        this.initializeMessages(io);

        // TODO: uncomment this to register the functions
        // this.initialize(io);
    }

    // Old websocket function
    initializeMessages(io) {
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });
        });
    }

    getUserRooms(username) {
        let user = User.byUsername(username);
        let rooms = user.rooms;
        let roomList = [];
        for (let room in rooms) {
            roomList.push([room._id, room.name]);
        }
        return {name: username, rooms: roomList};
    }

    getRoomInfo(roomId) {
        let room = Room.byId(roomId);
        let members = room.users;
        let userList = [];
        for (let member in members) {
            userList.push(member.username);
        }
        return {id: roomId, users: userList};
    }

    initialize(io) {
        io.on("connection", function(socket) {

            // getUserRooms
            socket.on("getUserRooms", function(message) {
                let username = message.username;
                socket.emit("userRooms", this.getUserRooms(username));
            });

            // getRoomInfo
            socket.on("getRoomInfo", function(message) {
                let roomId = message.roomId;
                socket.emit("roomInfo", this.getRoomInfo(roomId));
            });

            // addUserToRoom
            socket.on("addUserToRoom", function(message) {
                let username = message.username;
                let roomId = message.roomId;
                let room = Room.byId(roomId);
                let user = User.byUsername(username);

                // TODO code below possibly bad
                room.users.push(user);
                room.save();
                user.rooms.push(room);
                user.save();

                // We send information about our user rooms
                io.to(roomId).emit("userRooms", this.getUserRooms(username));

                // We send information about new composition of our room
                io.to(roomId).emit("roomInfo", this.getRoomInfo(roomId));
            });

            // createRoom
            socket.on("createRoom", function(message) {
                let roomname = message.roomname;
                let username = message.username;
                let user = User.byUsername(username);
                Room.create(roomname, user, (room, error) => {
                    if (!error) {
                        let roomId = room._id;
                        // We send information about our user rooms
                        io.to(roomId).emit("userRooms", this.getUserRooms(username));

                        // We send information about new composition of our room
                        io.to(roomId).emit("roomInfo", this.getRoomInfo(roomId));
                    }
                });
            });

            // getGeneralRoomId
            socket.on("getGeneralRoomId", function(message) {
                // TODO I don't know how to do this
            });
        });
    }

}

module.exports = WebSockets;
