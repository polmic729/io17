import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {setSelectedRoom} from "../../actions/rooms";

class Rooms extends React.Component {

    constructor(props) {
        super(props);
        let selectedRoom = window.sessionStorage.getItem("selectedRoom");
        if (selectedRoom) {
            selectedRoom = Number(selectedRoom);
        } else {
            selectedRoom = 2137;//todo selectedRoom = general_channel
        }
        let rooms = [2137, 1488, 21, 37];//todo rooms = getUserGroups(this.state.username)
        this.state = {
            selectedRoom: selectedRoom,
            rooms: rooms
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.onRoomUpdate = this.onRoomUpdate.bind(this);
    }

    changeRoom(key) {
        this.setState({
            selectedRoom: key
        });
        window.sessionStorage.setItem("selectedRoom", key);
        this.props.actions.setSelectedRoom(key);
    }

    onRoomUpdate(rooms) {
        this.setState({
            rooms: rooms
        });
        //todo send request for updateMembers
    }

    componentWillMount() {
        this.props.actions.setSelectedRoom(this.state.selectedRoom);
    }

    componentDidMount() {
        this.props.socket.on("roomsUpdate", this.onRoomUpdate);
    }

    render() {
        const roomsList = this.state.rooms.map((room) =>
            <div className={ room === this.state.selectedRoom ? "roomSelected" : "roomDefault"}
                 onClick={() => this.changeRoom(room)} key={room}> test_online{room}</div>
        );

        return (
            <div id="chatRooms">
                <div className="entityContainer">
                    <h3>twoje grupy</h3>
                    { roomsList }
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
    actions: bindActionCreators({ setSelectedRoom }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
