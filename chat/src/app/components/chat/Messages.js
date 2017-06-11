import React from "react";
import {connect} from "react-redux";

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
                {msg.date.hours}:{msg.date.minutes}:{msg.date.seconds} : {msg.author} : {msg.content}
            </li>
        );

        return (
            <div id="messages">
                <ul>
                    { messageList }
                </ul>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Messages);
