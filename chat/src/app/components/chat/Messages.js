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
        const messagesList = this.state.messages.map((msg, index) =>
            <div className="message" key={index}>
                <div className="messageContentWrapper">
                <span className="timestamp">
                    {msg.date.hours}:{msg.date.minutes}
                </span>
                    <span className="messageAuthor">
                    {msg.author}
                </span>
                    <span className="messageContent">
                    {msg.content}
                </span>
                </div>
            </div>
        );

        return (
            <div id="messagesContainer">
                { messagesList }
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Messages);
