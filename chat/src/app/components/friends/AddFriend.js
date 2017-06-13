import React from "react";
import {connect} from "react-redux";

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
    }

    handleChange(event) {
        this.setState({friend: event.target.value});
    }

    handleAddFriend(event) {
        event.preventDefault();
        if (this.state.friend !== "") {
            const message = {
                name: this.props.username,
                friend: this.state.friend
            };
            this.props.socket.emit("addFriend", message);
            this.refs.textBoxFriend.value = "";
            this.setState({friend: ""});
        }
    }

    handlePressKey(event) {
        if (event.key === "Enter") {
            this.handleAddFriend(event);
        }
    }

    render() {
        return (
            <div id="newFriendInput" className="sideInputBar">
                <form onSubmit={this.handleAddFriend}>
                    <h3>dodaj ziomka</h3>
                    <div id="newFriendWrapper" className="sideInputWrapper">
                        <textarea className="sideTextArea" ref="textBoxFriend"
                                  type="text" name="friendName" placeholder="nazwa zawodnika"
                                  onChange={this.handleChange} onKeyPress={this.handlePressKey}/>
                        <div className="confirm" onClick={this.handleAddFriend} />
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

export default connect(mapStateToProps, null)(AddFriend);
