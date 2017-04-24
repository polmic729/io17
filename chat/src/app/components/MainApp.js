import io from "socket.io-client";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWebsocket } from "../actions/websocket";
import Login from "./Login";

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
        return (<Login />);
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({setWebsocket}, dispatch)
});

export default connect(null, mapDispatchToProps)(MainApp);
