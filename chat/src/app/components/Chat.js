let React = require("react");
import io from "socket.io-client";
let socket = io("http://localhost:3001");


class Chat extends React.Component {

    sendMessage() {
        socket.emit("message", "Hello world!");
    }

    render() {
        return (
            <button onClick={this.sendMessage}>
                Send!
            </button>
        );
    }
}

export default Chat;