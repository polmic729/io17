import React from "react";
import Messages from "./Messages";
import Send from "./Send";
import TopBar from "./TopBar";

class Chat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <TopBar />
                <Messages />
                <Send />
            </section>
        );
    }
}

export default Chat;
