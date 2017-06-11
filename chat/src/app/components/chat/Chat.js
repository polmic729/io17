import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSocket} from "../../actions/connections";
import io from "socket.io-client";
import Messages from "./Messages";
import Send from "./Send";
import SettingsBar from "./SettingsBar";

let config = require("../../../../config");

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.setSocket(io("http://" + config.websocket.host + ":" + config.websocket.port));
    }

    render() {
        return (
            <div id="container">
                <div id="leftBar" className="sideBar">
                    <h2>Czaty</h2>
                    <div id="chats">
                        <div className="clientContainer">
                            <h3>grupowe</h3>
                            <div>test_online1</div>
                            <div>test_online2</div>
                            <h3>znajomi</h3>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                        </div>
                    </div>
                    <SettingsBar />
                </div>
                <div id="content">
                    <h1>skål</h1>
                    <div id="chatContainer">
                        <div id="messages">
                            <Messages />
                        </div>
                        <div id="textBox">
                            <Send />
                        </div>
                    </div>
                </div>
                <div id="rightBar" className="sideBar">
                    <h2>Uczestnicy</h2>
                    <div id="chatMembers">
                        <div className="clientContainer">
                            <h3>dostępni</h3>
                            <div>test_online1</div>
                            <div>test_online2</div>
                            <h3>niedostępni</h3>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                            <div>test_offline1</div>
                            <div>test_offline2</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({setSocket}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
