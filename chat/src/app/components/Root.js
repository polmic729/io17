import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin, userLogout } from "../actions/user";
import { setView, Views } from "../actions/views";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Chat from "./chat/Chat";
import Friends from "./chat/Friends";


class Root extends React.Component {
    constructor(props) {
        super(props);
        document.title = "skål";
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn() {
        // TODO: creating object for this shit management would be nice...
        let username = window.sessionStorage.getItem("name");
        let token = window.sessionStorage.getItem("token");
        if (token && username) {
            this.props.actions.userLogin(username);
            if (this.props.view === Views.LOGIN || this.props.view === Views.REGISTER) {
                this.props.actions.setView(Views.CHAT);
            }
        } else if (this.props.userAuthorized && !token) {
            window.sessionStorage.removeItem("token");
            this.props.actions.userLogout();
            this.props.actions.setView(Views.LOGIN);
        }
    }

    render() {
        switch (this.props.view) {
        case Views.Friends:
            return (<Friends />);
        case Views.CHAT:
            return (<Chat />);
        case Views.REGISTER:
            return (<SignUp />);
        default:
            return (<Login />);
        }
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket,
    view: state.views.current,
    userAuthorized: state.user.authorized
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setView, userLogin, userLogout }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
