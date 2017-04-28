import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import { Screens } from "../actions/screens";
import { setWebsocket } from "../actions/websocket";
import Chat from "./chat/Chat";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

let config = require("../../../config");

class Root extends React.Component {
    constructor(props) {
        super(props);
        document.title = "skål";
        this.createWebsocket = this.createWebsocket.bind(this);
        this.createWebsocket();
    }

    createWebsocket() {
        // TODO: it should be created only if user has successfully logged in
        let socket = io("http://" + config.websocket.host + ":" + config.websocket.port);
        this.props.actions.setWebsocket(socket);
    }

    render() {
        switch (this.props.screen) {
        case Screens.CHAT:
            return (<Chat />);
        case Screens.REGISTER:
            return (<SignUp />);
        default:
            return (<Login />);
        }
    }
}

let mapStateToProps = (state) => ({
    screen: state.screen.screen
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setWebsocket }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
