let socketio = require("socket.io");
let http = require("http");
let config = require("../../config");

class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(config.websocket.port,
            config.websocket.host);

        this.initializeMessages(io);
    }

    initializeMessages(io) {
        // TODO: sending messages only to specified rooms
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });
        });
    }
    // TODO: create room, add user to room, get users of room
}

module.exports = WebSockets;
