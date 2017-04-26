import io from "socket.io-client";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./Login";
import Signup from "./Signup";
import Chat from "./chat/Chat";
import {Screens} from "../actions/screens";
import { setWebsocket } from "../actions/websocket";

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        document.title = "skål";
        this.createWebsocket = this.createWebsocket.bind(this);
        this.createWebsocket();
    }

    createWebsocket() {
        // TODO: it should be created only if user has successfully logged in
        let socket = io("http://localhost:3001");
        this.props.actions.setWebsocket(socket);
    }

    render() {
        switch (this.props.screen) {
        case Screens.CHAT:
            return (<Chat />);
        case Screens.REGISTER:
            return (<Signup />);
        default:
            return (<Login />);
        }
    }
}

let mapStateToProps = (state) => ({
    screen: state.screen.screen
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({setWebsocket}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
