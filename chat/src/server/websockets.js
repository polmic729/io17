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

    static addUserToRoom(username, roomId) {
        let room = RoomModel.byId(roomId).then(room => {
            if (!room) {
                return Promise.reject("Room not found.");
            }
            return Promise.resolve(room);
        });
        let user = UserModel.byUsername(username).then(user => {
            if (!user) {
                return Promise.reject("User not found.");
            }
            return Promise.resolve(user);
        });
        RoomModel.addUser(user, room, (user, error) => {
            if (error !== null) {
                console.log(error);
            }
        });
        UserModel.addRoom(username, room, (user, error) => {
            if (error !== null) {
                console.log(error);
            }
        });
    }

    static createRoom(roomname, username) {
        RoomModel.create(roomname, username);
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
                WebSockets.addUserToRoom(username, roomId);

                socket.emit("userRooms", WebSockets.getUserRooms(username));
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
