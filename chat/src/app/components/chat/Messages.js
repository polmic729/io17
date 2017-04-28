import React from "react";
import { connect } from "react-redux";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.onNewMessage = this.onNewMessage.bind(this);
    }

    onNewMessage(message) {
        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages: messages
        });
    }

    componentDidMount() {
        this.props.socket.on("chat-message", this.onNewMessage);
    }

    render() {
        // TODO: fix li key with message ID (React requires it)
        const messageList = this.state.messages.map((msg) =>
            <li key={msg}>
                {msg}
            </li>
        );

        return (
            <section>
                <ul>
                    { messageList }
                </ul>
            </section>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Messages);
