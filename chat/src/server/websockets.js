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
        io.on("connection", function(socket) {
            socket.on("chat-message", function(message) {
                io.emit("chat-message", message);
            });
        });
    }
}

module.exports = WebSockets;
