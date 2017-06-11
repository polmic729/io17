import React from "react";
import {connect} from "react-redux";

function formatDate(k) {
    if (k < 10) {
        k = "0" + k;
    }
    return k;
}

class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textArea: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
    }

    handleChange(event) {
        this.setState({textArea: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.textArea !== "") {
            const submitDate = new Date();
            const message = {
                date: {
                    hours: formatDate(submitDate.getHours()),
                    minutes: formatDate(submitDate.getMinutes()),
                    seconds: formatDate(submitDate.getSeconds())
                },
                author: this.props.username,
                content: this.state.textArea
            };
            this.props.socket.emit("chat-message", message);
            this.refs.textBox.value = "";
            this.setState({textArea: ""});
        }
    }

    handlePressKey(event) {
        if (event.key === "Enter") {
            this.handleSubmit(event);
        }
    }

    render() {
        return (
            <div id="messageInput">
                <form onSubmit={this.handleSubmit}>
                    <div className="messageInputWrapper">
                        <div className="send" onClick={this.handleSubmit}>
                        </div>
                        <textarea className="messageTextArea" ref="textBox"
                                  type="text" name="textArea" placeholder="Napisz coś!"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                    </div>
                </form>
            </div>
        )
            ;
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket,
    username: state.user.name
});

export default connect(mapStateToProps, null)(Send);
