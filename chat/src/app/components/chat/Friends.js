import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import { setSocket } from "../../actions/connections";
import ViewsBar from "./ViewsBar";

let config = require("../../../../config");

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
                </div>
                <div id="content">
                    <h1>skål</h1>

                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setSocket }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
