import React from "react";
import {connect} from "react-redux";

class Groups extends React.Component {

    constructor(props) {
        super(props);
        let selectedGroup = window.sessionStorage.getItem("selectedGroup");
        if (selectedGroup) {
            selectedGroup = Number(selectedGroup);
        } else {
            selectedGroup = 2137;//todo selected_channel = general_channel
        }
        let groups = [2137, 1488, 21, 37];//todo groups = getUserGroups(this.state.username)
        this.state = {
            selected_channel: selectedGroup,
            groups: groups
        };
        this.changeGroup = this.changeGroup.bind(this);
        this.onGroupUpdate = this.onGroupUpdate.bind(this);
    }

    changeGroup(key) {
        this.setState({
            selected_channel: key
        });
        window.sessionStorage.setItem("selectedGroup", key);
    }

    onGroupUpdate(groups) {
        this.setState({
            groups: groups
        });
    }

    componentDidMount() {
        this.props.socket.on("groupsUpdate", this.onGroupUpdate);
    }

    render() {
        const groupList = this.state.groups.map((group) =>
            <div className={ group === this.state.selected_channel ? "groupSelected" : "groupDefault"}
                 onClick={() => this.changeGroup(group)} key={group}> test_online{group}</div>
        );

        return (
            <div id="chatGroups">
                <div className="entityContainer">
                    <h3>grupowe</h3>
                    { groupList }
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name,
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Groups);
