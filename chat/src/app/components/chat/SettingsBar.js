import React from "react";
import {connect} from "react-redux";

class SettingsBar extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        alert("logout");
    }

    render() {
        return (
            <div id="settings">
                <div id="user">
                    <h3> { this.props.username } </h3>
                </div>
                <div id="logout" onClick={this.logout}>
                    {/*logout*/}
                    {/*<button onSubmit={this.logout} value="Logout"/>*/}
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name
});

export default connect(mapStateToProps, null)(SettingsBar);
