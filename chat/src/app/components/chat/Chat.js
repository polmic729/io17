import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSocket} from "../../actions/connections";
import io from "socket.io-client";
import Messages from "./Messages";
import Send from "./Send";
import SettingsBar from "./SettingsBar";
import Rooms from "./Rooms";
import Members from "./Members";
import AddMember from "./AddMember";
import NewChat from "./NewChat";
import {setSelectedRoom} from "../../actions/rooms";

let config = require("../../../../config");

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.props.actions.setSelectedRoom();
    }

    componentWillMount() {
        this.props.actions.setSocket(io("http://" + config.websocket.host + ":" + config.websocket.port));
    }


    render() {
        return (
            <div id="container">
                <div id="leftBar" className="sideBar">
                    <h2>Czaty</h2>
                    <NewChat />
                    <Rooms/>
                    <SettingsBar />
                </div>
                <div id="content">
                    <h1>skål</h1>
                    <div id="chatContainer">
                        <Messages />
                        <Send />
                    </div>
                </div>
                <div id="rightBar" className="sideBar">
                    <h2>Uczestnicy</h2>
                    <AddMember />
                    <Members />
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({setSocket, setSelectedRoom}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
