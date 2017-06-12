import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {Views, setView} from "../../actions/views";

class ViewsBar extends React.Component {

    constructor(props) {
        super(props);

        this.setToChat = this.setToChat.bind(this);
        this.setToFriends = this.setToFriends.bind(this);
    }


    setToChat() {
        this.props.actions.setView(Views.CHAT);
    }

    setToFriends() {
        this.props.actions.setView(Views.FRIENDS);
    }

    componentDidMount() {
        this.props.socket.on("roomInfo", this.onMembersUpdate);
    }

    render() {

        return (
            <div id="leftestBar">
                <div id="friends" onClick={this.setToChat}/>
                <div id="chat" onClick={this.setToFriends}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({setView}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewsBar);
