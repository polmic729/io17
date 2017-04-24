import React from "react";
import { connect } from "react-redux";

class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.newMessage = this.newMessage.bind(this);
    }

    newMessage(message) {
        let messages = this.state.messages;
        messages.push(message);

        this.setState({
            messages: messages
        });
    }

    componentDidMount() {
        this.props.websocket.on("chat-message", this.newMessage);
    }

    render() {
        const messageList = this.state.messages.map((msg) =>
                <li> {msg} </li>
        );

        return (
            <section>
                <h2>skål - the best chat ever.</h2>
                <ul>
                    { messageList }
                </ul>
            </section>
        );
    }
}

let mapStateToProps = (state) => ({
    //FIXME wtf
    websocket: state.websocket.websocket
});

export default connect(mapStateToProps, null)(Messages);
