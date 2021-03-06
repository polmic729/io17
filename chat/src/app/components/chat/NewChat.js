import React from "react";
import {connect} from "react-redux";

class NewChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomname: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
    }

    handleChange(event) {
        this.setState({roomname: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name !== "") {
            const message = {
                roomname: this.state.roomname,
                username: this.props.username
            };
            this.props.socket.emit("createRoom", message);
            this.refs.textBox.value = "";
            this.setState({roomname: ""});
        }
    }

    handlePressKey(event) {
        if (event.key === "Enter") {
            this.handleSubmit(event);
        }
    }

    render() {
        return (
            <div id="newChatInput" className="sideInputBar">
                <form onSubmit={this.handleSubmit}>
                    <h3>utwórz nową grupę</h3>
                    <div id="newChatWrapper" className="sideInputWrapper">
                        <textarea className="sideTextArea" ref="textBox"
                                  type="text" name="groupName" placeholder="nazwa kanału"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                        <div className="confirm" onClick={this.handleSubmit} />
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

export default connect(mapStateToProps, null)(NewChat);
