import { StyleRoot } from "radium";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Screens, setScreen } from "../actions/screens";
import FormComponents from "./Form";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.authSuccess = this.authSuccess.bind(this);
        this.authFail = this.authFail.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goToRegister() {
        this.props.actions.setScreen(Screens.REGISTER);
    }

    authSuccess() {
        this.props.actions.setScreen(Screens.CHAT);
    }

    authFail() {
        alert("Login failed");
    }

    handleSubmit(username, password) {
        let onSuccess = this.authSuccess;
        let onFail = this.authFail;

        fetch("/auth/login", {
            method: "POST",
            body: "username=" + username + "&password=" + password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res) {
            switch (res.status) {
            case 204:
                onSuccess();
                break;
            case 401:
                onFail();
            }
        }).catch(function() {
            alert("Error while querying login server");
        });
    }

    render() {
        return (
            <StyleRoot>
                <div id="wrapper" style={FormComponents.styles.wrapper}>
                    <div id="box" style={FormComponents.styles.box}>
                        <h1 style={FormComponents.styles.header}>skål</h1>
                        <FormComponents.Form onSubmit={this.handleSubmit}
                                             buttonLabel="Login"/>
                        <a href="#" onClick={this.goToRegister}>Register</a>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setScreen }, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
