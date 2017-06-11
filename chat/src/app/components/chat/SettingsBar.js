import React from "react";
import {connect} from "react-redux";
import { setView, Views } from "../../actions/views";
import { bindActionCreators } from "redux";
import { userLogout } from "../../actions/user";

class SettingsBar extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.sessionStorage.removeItem("token");
        this.props.actions.userLogout();
        this.props.actions.setView(Views.LOGIN);
    }

    render() {
        return (
            <div id="settings">
                <div id="user">
                    <h3> { this.props.username } </h3>
                </div>
                <div id="logout" onClick={this.logout}>
                </div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setView, userLogout }, dispatch)
});

let mapStateToProps = (state) => ({
    username: state.user.name
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBar);
