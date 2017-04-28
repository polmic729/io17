import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import { setSocket } from "../actions/connections";
import { Views } from "../actions/views";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Chat from "./chat/Chat";

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
        this.props.actions.setSocket(socket);
    }

    render() {
        switch (this.props.currentView) {
        case Views.CHAT:
            return (<Chat />);
        case Views.REGISTER:
            return (<SignUp />);
        default:
            return (<Login />);
        }
    }
}

let mapStateToProps = (state) => ({
    currentView: state.views.current
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setSocket }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
