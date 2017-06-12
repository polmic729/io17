let socketio = require("socket.io");
let http = require("http");
let config = require("../../config");
let UserModel = require("./models/user");
let RoomModel = require("./models/room");

class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(config.websocket.port,
            config.websocket.host);

        this.initialize(io);
    }


    static getUserRooms(username) {
        let message = {name: username, rooms: [[0, "główny"]]};
        message.rooms.push([2, "dupa"]);
        let userPromise = UserModel.byUsername(username);

        const user = userPromise.then(user => {
            if (!user) {
                return Promise.reject("User not found.");
            }
            return Promise.resolve(user);
        });

        const rooms = user.rooms;
        for (let room in rooms) {
            message.rooms.push([room._id, room.name]);
        }

        return message;
    }

    static getRoomInfo(roomId) {
        if (roomId === 0) {
            let usersPromise = UserModel.getAll();
            const users = usersPromise.then(users => Promise.resolve(users));
            return {id: 0, users: users};
        }
        let roomPromise = RoomModel.byId(roomId);

        const room = roomPromise.then(room => {
            if (!room) {
                return Promise.reject("Room not found.");
            }
            return Promise.resolve(room);
        });

        const members = room.users;
        let userList = [];
        for (let member in members) {
            userList.push(member.username);
        }
        return {id: roomId, users: userList};
    }

    static createRoom(roomname, username) {

    }

    initialize(io) {
        io.on("connection", function(socket) {

            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });

            socket.on("getUserRooms", function(message) {
                let username = message.username;
                socket.emit("userRooms", WebSockets.getUserRooms(username));
            });

            socket.on("getRoomInfo", function(message) {
                let roomId = message.roomId;
                socket.emit("roomInfo", WebSockets.getRoomInfo(roomId));
            });

            socket.on("addUserToRoom", function(message) {
                let username = message.username;
                let roomId = message.roomId;
                let room = RoomModel.byId(roomId);
                let user = UserModel.byUsername(username);

                // TODO code below possibly bad
                room.users.push(user);
                room.save();
                user.rooms.push(room);
                user.save();

                // We send information about our user rooms
                io.to(roomId).emit("userRooms", WebSockets.getUserRooms(username));

                // We send information about new composition of our room
                io.to(roomId).emit("roomInfo", WebSockets.getRoomInfo(roomId));
            });

            socket.on("createRoom", function(message) {
                let roomname = message.roomname;
                let username = message.username;
                WebSockets.createRoom(roomname, username);

                socket.emit("userRooms", WebSockets.getUserRooms(username));
            });

            socket.on("getGeneralRoomId", function() {
                io.emit("userRooms", 0);
            });
        });
    }

}

module.exports = WebSockets;
