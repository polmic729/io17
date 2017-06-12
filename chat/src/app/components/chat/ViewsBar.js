import React from "react";
import {connect} from "react-redux";

class ViewsBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
        this.onMembersUpdate = this.onMembersUpdate.bind(this);
    }

    onMembersUpdate(event) {
        if (event.id === this.props.selected) {
            this.setState({
                members: event.users
            });
        }
    }

    componentDidMount() {
        this.props.socket.on("roomInfo", this.onMembersUpdate);
    }

    render() {

        return (
            <div id="leftestBar">
                <div id="friends" />
                <div id="chat" />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name,
    socket: state.connections.socket,
    selected: state.room.selected
});

export default connect(mapStateToProps, null)(ViewsBar);
