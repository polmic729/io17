import io from "socket.io-client";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import Chat from "./chat/Chat";

class MainApp extends React.Component {
    constructor(props) {
        super(props);

        this.createWebsocket = this.createWebsocket.bind(this);

        this.createWebsocket();
    }

    createWebsocket() {
        let socket = io("http://localhost:3001");
        this.props.actions.setWebsocket(socket);
    }

    render() {
        return (
            <section>
                <h1> Skål </h1>
                <Chat />
            </section>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(MainApp);
