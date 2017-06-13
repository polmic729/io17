import React from "react";
import {connect} from "react-redux";
import AddMember from "./AddMember";

class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
        this.onMembersUpdate = this.onMembersUpdate.bind(this);
        this.props.socket.on("roomInfo", this.onMembersUpdate);
    }

    onMembersUpdate(event) {
        if (event.id === this.props.selected) {
            this.setState({
                members: event.users
            });
        }
    }

    render() {
        const membersList = this.state.members.map((member) =>
            <div className="chatMember" key={member}> {member}</div>
        );

        return (
            <div id="chatMembers">
                { this.props.selected !== 0 && this.props.selected !== "0" &&
                    <AddMember />
                }
                <div className="entityContainer">
                    <h3>w grupie</h3>
                    { membersList }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name,
    socket: state.connections.socket,
    selected: state.room.selected
});

export default connect(mapStateToProps, null)(Members);
