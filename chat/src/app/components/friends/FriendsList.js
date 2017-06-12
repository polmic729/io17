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
        this.selectFriend = this.selectFriend.bind(this);
        this.onFriendRequest = this.onFriendRequest.bind(this);
        this.handleResponseToRequest = this.handleResponseToRequest.bind(this);
        this.onFriendsListUpdate = this.onFriendsListUpdate.bind(this);
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

    onFriendRequest() {

    }

    handleResponseToRequest() {

    }

    onFriendsListUpdate(event) {
        if (event && event.room !== undefined) {
            this.setState({
                friends: event.friends
            });
        }
    }

    componentWillMount() {
        this.props.socket.emit("getUserRooms", this.props.username);
    }

    componentDidMount() {
        this.props.socket.on("friendsListUpdate", this.onFriendsListUpdate);
        this.props.socket.on("friendsRequest", this.onFriendRequest);
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
