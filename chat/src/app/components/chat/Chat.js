import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSocket } from "../../actions/connections";
import io from "socket.io-client";
import Messages from "./Messages";
import Send from "./Send";
import TopBar from "./TopBar";

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
            <section>
                <TopBar />
                <Messages />
                <Send />
            </section>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setSocket }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
