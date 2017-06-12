import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {setGeneralRoom, setSelectedRoom} from "../../actions/rooms";

class Rooms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFriend: "",
            friends: ["hubert", "mateusz", "kuba"]
        };
        this.selectFriend = this.selectFriend.bind(this);
        this.onFriendRequest = this.onFriendRequest.bind(this);
        this.handleResponseToRequest = this.handleResponseToRequest.bind(this);
        this.onFriendsListUpdate = this.onFriendsListUpdate.bind(this);
    }

    selectFriend() {

    }
    onFriendRequest() {

    }

    handleResponseToRequest() {

    }

    onFriendsListUpdate() {

    }

    componentWillMount() {
        this.props.socket.emit("getUserRooms", this.props.username);
    }

    componentDidMount() {
        this.props.socket.on("userRooms", this.onRoomsUpdate);
    }

    render() {
        const friendsList = this.state.friends.map((friend) =>
            <div className={ friend === this.state.selectedFriend ? "leftSelected" : "leftDefault"}
                 onClick={() => this.changeRoom(friend)} key={friend}> {friend}</div>
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
    username: state.user.name,
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setSelectedRoom, setGeneralRoom }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
