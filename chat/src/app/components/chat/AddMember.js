import React from "react";
import {connect} from "react-redux";

class AddMember extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username !== "") {
            const message = {
                username: this.state.username
            };
            this.props.socket.emit("addMember", message);
            this.refs.textBox.value = "";
            this.setState({username: ""});
        }
    }

    handlePressKey(event) {
        if (event.key === "Enter") {
            this.handleSubmit(event);
        }
    }

    render() {
        return (
            <div id="newMemberInput" className="sideInputBar">
                <h3>dodaj użytkownika</h3>
                <form onSubmit={this.handleSubmit}>
                    <div id="newMemberWrapper" className="sideInputWrapper">
                        <textarea className="sideTextArea" ref="textBox"
                                  type="text" name="username" placeholder="nazwa użytkownika"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                        <div className="confirm" onClick={this.handleSubmit}>
                        </div>
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

export default connect(mapStateToProps, null)(AddMember);
