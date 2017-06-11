import React from "react";
import {connect} from "react-redux";

class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: ["michal", "hubert", "mateusz", "kuba"]
        };
        this.onMembersUpdate = this.onMembersUpdate.bind(this);
    }

    onMembersUpdate(members) {
        this.setState({
            members: members
        });
    }

    componentDidMount() {
        this.props.socket.on("membersUpdate", this.onMembersUpdate);
    }

    render() {
        const membersList = this.state.members.map((member) =>
            <div className="chatMember" key={member}> {member}</div>
        );

        return (
            <div id="chatMembers">
                <div className="entityContainer">
                    <h3>w grupie {this.props.group}</h3>
                    { membersList }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name,
    socket: state.connections.socket,
    group: state.rooms.name
});

export default connect(mapStateToProps, null)(Members);
