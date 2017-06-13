import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {setSelectedFriend} from "../../actions/friend";

class Rooms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFriend: "",
            friends: ["hubert", "mateusz", "kuba"]
        };

        this.props.actions.setSelectedFriend("");
        this.selectFriend = this.selectFriend.bind(this);
        this.onUserFriends = this.onUserFriends.bind(this);
    }

    selectFriend(name) {
        if (name === this.state.selectedFriend) {
            return;
        }
        this.setState({
            selectedFriend: name
        });
        this.props.actions.setSelectedFriend(name);
    }

    onUserFriends(event) {
        if (event && event.room !== undefined) {
            this.setState({
                friends: event.friends
            });
        }
    }

    componentWillMount() {
        this.props.socket.emit("getUserFriends", this.props.username);
    }

    componentDidMount() {
        this.props.socket.on("userFriends", this.onUserFriends);
    }

    render() {
        const friendsList = this.state.friends.map((friend) =>
            <div className={ friend === this.state.selectedFriend ? "leftSelected" : "leftDefault"}
                 onClick={() => this.selectFriend(friend)} key={friend}> {friend}</div>
        );

        return (
            <div id="chatRooms">
                <div className="entityContainer">
                    <h3>znajomeczkowie</h3>
                    { friendsList }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setSelectedFriend }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
