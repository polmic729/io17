import React from "react";
import {connect} from "react-redux";

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
                    hours: submitDate.getHours(),
                    minutes: submitDate.getMinutes(),
                    seconds: submitDate.getSeconds()
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
                    <div id="textArea">
                        <div id="send" onClick={this.handleSubmit}>
                        </div>
                        <textarea ref="textBox" type="text" name="textArea" placeholder="Napisz coś!"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                    </div>
                </form>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket,
    username: state.user.name
});

export default connect(mapStateToProps, null)(Send);
