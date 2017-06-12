let socketio = require("socket.io");
let http = require("http");
let config = require("../../config");
let UserModel = require("./models/user");
let Room = require("./models/room");

class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(config.websocket.port,
            config.websocket.host);

        // this.initializeMessages(io);

        // TODO: uncomment this to register the functions
        this.initialize(io);
    }

    // Old websocket function
    initializeMessages(io) {
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });
        });
    }

    static getUserRooms(username) {
        let message = {name: username, rooms: []};
        let userPromise = UserModel.byUsername(username).then(user => {
            if (!user) {
                return Promise.reject("User not found in database.");
            }
            return Promise.resolve(user);
        });

        const rooms = userPromise.rooms;
        message.rooms.push([1, "dupa"]);
        for (let room in rooms) {
            message.rooms.push([room._id, room.name]);
        }

        return message;
    }

    static getRoomInfo(roomId) {
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

            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });

            // getUserRooms
            socket.on("getUserRooms", function(message) {
                let username = message.username;
                const msg = WebSockets.getUserRooms(username);
                socket.emit("userRooms", msg);
            });

            // getRoomInfo
            socket.on("getRoomInfo", function(message) {
                let roomId = message.roomId;
                const msg = WebSockets.getRoomInfo(roomId);
                socket.emit("roomInfo", msg);
            });

            // addUserToRoom
            socket.on("addUserToRoom", function(message) {
                let username = message.username;
                let roomId = message.roomId;
                let room = Room.byId(roomId);
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

            // createRoom
            socket.on("createRoom", function(message) {
                let roomname = message.roomname;
                let username = message.username;
                let user = UserModel.byUsername(username);
                Room.create(roomname, user, (room, error) => {
                    if (!error) {
                        let roomId = room._id;
                        // We send information about our user rooms
                        io.to(roomId).emit("userRooms", WebSockets.getUserRooms(username));

                        // We send information about new composition of our room
                        io.to(roomId).emit("roomInfo", WebSockets.getRoomInfo(roomId));
                    }
                });
            });

            // getGeneralRoomId
            socket.on("getGeneralRoomId", function(message) {

                // io.emit("userRooms", WebSockets.getUserRooms(""));
                // TODO I don't know how to do this
            });
        });
    }

}

module.exports = WebSockets;
