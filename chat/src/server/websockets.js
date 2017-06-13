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
                for (let room of user.rooms) {
                    message.rooms.push([room[0], room[1]]);
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
            return UserModel.getAll().then(users => {
                let userList = [];
                for (let user of users) {
                    userList.push(user.username);
                }
                return { id: 0, users: userList };
            }).catch((error) => {
                return { id: 0, users: [], error: "Could not get users." }
            });
        }

        return RoomModel.byId(roomId).then(room => {
            if (!room) {
                return Promise.reject("Room not found.");
            }
            let userList = [];
            for (let user of room.users) {
                userList.push(user[1]);
            }
            return { id: roomId, users: userList };
        });
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
        UserModel.addRoom(user, room, (user, error) => {
            if (error !== null) {
                console.log(error);
            }
        });
    }

    static createRoom(roomname, username) {
        return UserModel.byUsername(username).then(user =>
            RoomModel.create(roomname, user)
        );
    }

    initialize(io) {
        io.on("connection", function(socket) {

            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });

            socket.on("getUserRooms", function(message) {
                WebSockets.getUserRooms(message.username).then((message) => {
                    socket.emit("userRooms", message);
                });
            });

            socket.on("getRoomInfo", function(message) {
                let roomId = message.roomId;
                WebSockets.getRoomInfo(roomId).then(message => {
                    socket.emit("roomInfo", message);
                })
            });

            socket.on("addUserToRoom", function(message) {
                let username = message.name;
                let roomId = message.id;
                WebSockets.addUserToRoom(username, roomId);
            });

            socket.on("createRoom", function(message) {
                let roomname = message.roomname;
                let username = message.username;

                WebSockets.createRoom(roomname, username).then(() =>
                    WebSockets.getUserRooms(username)
                ).then(message => {
                    socket.emit("userRooms", message);
                });
            });

            socket.on("getGeneralRoomId", function() {
                io.emit("userRooms", 0);
            });
        });
    }

}

module.exports = WebSockets;
