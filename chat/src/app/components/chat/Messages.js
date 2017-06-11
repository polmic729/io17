import React from "react";
import {connect} from "react-redux";
import ReactDOM from "react-dom";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            lastRoom: 0
        };
        this.onNewMessage = this.onNewMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onNewMessage(message) {
        if (message.roomId === this.props.room) {
            let messages = [];
            if (message.roomId === this.state.lastRoom) {
                messages = this.state.messages;
            }

            messages.push(message);
            this.setState({
                messages: messages,
                lastRoom: message.roomId
            });
        }
    }

    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({behavior: "smooth"});
    }

    componentDidMount() {
        this.scrollToBottom();
        this.props.socket.on("chat-message", this.onNewMessage);
    }

    componentDidUpdate() {
        // alert(this.state.lastRoom);
        // alert(this.props.room);
        if (this.state.lastRoom !== this.props.room) {
            this.setState({
                messages: [],
                lastRoom: this.props.room
            });
        }
        this.scrollToBottom();
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
                <div style={{float: "left", clear: "both"}}
                     ref={(el) => {
                         this.messagesEnd = el;
                     }}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket,
    room: state.rooms.name
});

export default connect(mapStateToProps, null)(Messages);
