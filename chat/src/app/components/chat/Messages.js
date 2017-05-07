import React from "react";
import { connect } from "react-redux";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.onNewMessage = this.onNewMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        const messageList = this.state.messages.map((msg, index) =>
            <li key={index}>
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
