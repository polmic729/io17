let io = require("socket.io");
let http = require("http");

const PORT = 3001;
const HOST = "localhost";


class WebSockets {

    constructor(app) {
        let httpServer = http.Server(app);
        this.io = io(httpServer);
        httpServer.listen(PORT, HOST);
    }

    addAction(action, callback) {
        this.io.on("connection", function(socket) {
            socket.on(action, function(message) {
                callback(message);
            });
        });
    }
}

module.exports = WebSockets;