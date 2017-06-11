import React from "react";
import {connect} from "react-redux";

class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.message !== "") {
            this.props.socket.emit("chat-message", this.state.message);
            this.refs.textBox.value = "";
            this.setState({message: ""});
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
                        <textarea ref="textBox" type="text" name="message" placeholder="Napisz coś!"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                    </div>
                </form>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Send);
