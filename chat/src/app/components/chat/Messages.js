import React from "react";
import io from "socket.io-client";

let socket = io("http://localhost:3001");

class Messages extends React.Component {

    constructor(props) {
        super(props);

        socket.on("chat-message", function(message){
            // TODO: Implement updating this component when message is received.
        });
    }

    render() {
        return (
            <section>
                <ul>
                    <li>skål - the best chat ever.</li>
                </ul>
            </section>
        );
    }
}

export default Messages;