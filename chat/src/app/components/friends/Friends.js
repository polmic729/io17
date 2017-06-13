import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import io from "socket.io-client";
import {setSocket} from "../../actions/connections";
import ViewsBar from "../shared/ViewsBar";
import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import SettingsBar from "../shared/SettingsBar";
import PrivateMessages from "./PrivateMessages";
import SendPrivate from "./SendPrivate";

let config = require("../../../../config/index");

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.setSocket(io("http://" + config.websocket.host + ":" + config.websocket.port));
    }

    render() {
        return (
            <div id="container">
                <ViewsBar />
                <div id="leftBar" className="sideBar">
                    <h2>Znajomi</h2>
                    <AddFriend />
                    <FriendsList />
                    <SettingsBar />
                </div>
                <div id="friendsContent">
                    <h1>skål</h1>
                    <div id="chatContainer">
                        <PrivateMessages />
                        <SendPrivate />
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
