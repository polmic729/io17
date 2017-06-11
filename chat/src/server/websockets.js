let socketio = require("socket.io");
let http = require("http");
let config = require("../../config");
// let User = require("./models/user");
// let Room = require("./models/room");

class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(config.websocket.port,
            config.websocket.host);

        this.initializeMessages(io);
    }

    initializeMessages(io) {
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });
        });
    }

    initialize(io) {
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                socket.join(message.room);
                io.to(message.room).emit("chat-message", message.message);
            });

            socket.on("create-room", function(message) {
                // TODO
                // createRoom(message.name);
                // socket.emit("create-room", success/failure);
            });

            socket.on("add-user", function(message) {
                // TODO
                // addUser(message.username);
                // socket.emit("add-user", success/failure);
            });

            socket.on("get-users", function(message) {
                // TODO
                // let roomUsers = getUsers(message.room_id);
                // socket.emit("get-users", roomUsers);
            });

            socket.on("get-rooms", function(message) {
                // TODO
                // let userRooms = getRooms(message.username);
                // socket.emit("get-rooms", userRooms);
            });
        });
    }

}

module.exports = WebSockets;
