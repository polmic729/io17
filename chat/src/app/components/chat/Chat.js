import React from "react";
import Messages from "./Messages";
import Send from "./Send";


class Chat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Messages />
                <Send />
            </section>
        );
    }
}

export default Chat;