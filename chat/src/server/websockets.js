let socketio = require("socket.io");
let http = require("http");

const PORT = 3001;
const HOST = "localhost";


class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        let io = socketio(httpServer);
        httpServer.listen(PORT, HOST);

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