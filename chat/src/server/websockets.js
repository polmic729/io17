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

    static getUserRooms(username, done) {
        let userPromise = UserModel.byUsername(username).then(user => {
            return user;
        }).catch((error) => {
            console.log(error);
        });

        let message = userPromise.then((user) => {
            let message = { name: username, rooms: [[0, "główny"]] };
            if (user !== undefined) {
                for (let roomId of user.rooms) {
                    // TODO: our architecture is so fucking awesome, that we must
                    //      do request to database for all rooms (we need name)
                    message.rooms.push([roomId, roomId]);
                }
            }
            return message;
        }).catch((error) => {
            return { name: username, error: error}
        });

        return message;
    }

    static getRoomInfo(roomId) {
        if (roomId === 0) {
            let usersPromise = UserModel.getAll();
            const users = usersPromise.then(users => Promise.resolve(users));
            return { id: 0, users: users };
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
        return { id: roomId, users: userList };
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
        UserModel.byUsername(username).then((user) => {
            RoomModel.create(roomname, user);
        }).catch((error) => {
            console.log(error);
        });
    }

    initialize(io) {
        io.on("connection", function(socket) {

            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });

            socket.on("getUserRooms", function(message) {
                WebSockets.getUserRooms(message.username).then((message) => {
                    socket.emit("userRooms", message);
                })
            });

            socket.on("getRoomInfo", function(message) {
                let roomId = message.roomId;
                socket.emit("roomInfo", WebSockets.getRoomInfo(roomId));
            });

            socket.on("addUserToRoom", function(message) {
                let username = message.username;
                let roomId = message.roomId;
                WebSockets.addUserToRoom(username, roomId);

                WebSockets.getUserRooms(username).then((message) => {
                    socket.emit("userRooms", message);
                })
            });

            socket.on("createRoom", function(message) {
                let roomname = message.roomname;
                let username = message.username;

                WebSockets.createRoom(roomname, username);

                WebSockets.getUserRooms(username).then((message) => {
                    socket.emit("userRooms", message);
                })
            });

            socket.on("getGeneralRoomId", function() {
                io.emit("userRooms", 0);
            });
        });
    }

}

module.exports = WebSockets;
