import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {setGeneralRoom, setSelectedRoom} from "../../actions/rooms";

class Rooms extends React.Component {

    constructor(props) {
        super(props);

        let selectedRoom = window.sessionStorage.getItem("selectedRoom");
        if (selectedRoom) {
            selectedRoom = Number(selectedRoom);
        } else {
            selectedRoom = 0;
        }

        let rooms = JSON.parse(localStorage.getItem("rooms"));
        if (!rooms) {
            rooms = [];
        }
        localStorage.setItem("rooms", JSON.stringify(rooms));

        this.state = {
            selectedRoom: selectedRoom,
            rooms: rooms
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.onRoomsUpdate = this.onRoomsUpdate.bind(this);
    }

    changeRoom(id) {
        if (id === this.state.selectedRoom) {
            return;
        }
        this.setState({
            selectedRoom: id
        });
        window.sessionStorage.setItem("selectedRoom", id);
        this.props.actions.setSelectedRoom(id);
        this.props.socket.emit("getRoomInfo", {
            roomId: id,
            username: this.props.username
        });
    }

    onRoomsUpdate(event) {
        this.setState({
            rooms: event.room
        });
        window.sessionStorage.setItem("room", event.room);
    }

    onGeneralRoom(id) {
        this.props.actions.setGeneralRoom(id);
        this.setState({
            generalRoomId: id
        });
    }

    componentWillMount() {
        this.props.actions.setGeneralRoom(0);
        this.props.actions.setSelectedRoom(this.state.selectedRoom);
        this.props.socket.emit("getGeneralRoomId", this.props.username);
        this.props.socket.emit("getUserRooms", this.props.username);
    }

    componentDidMount() {
        this.props.socket.on("generalRoomId", this.onGeneralRoom);
        this.props.socket.on("userRooms", this.onRoomsUpdate);
    }

    render() {
        const roomsList = this.state.rooms.map((room) =>
            <div className={ room[0] === this.state.selectedRoom ? "roomSelected" : "roomDefault"}
                 onClick={() => this.changeRoom(room[0])} key={room[0]}> {room[1]}</div>
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
    actions: bindActionCreators({ setSelectedRoom, setGeneralRoom }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
