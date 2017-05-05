import { StyleRoot } from "radium";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Views, setView } from "../../actions/views";
import { userLogin } from "../../actions/user";
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
        this.props.actions.setView(Views.REGISTER);
    }

    authSuccess(username, token) {
        window.sessionStorage.setItem("token", token);
        window.sessionStorage.setItem("name", username);
        this.props.actions.userLogin(username);
        this.props.actions.setView(Views.CHAT);
    }

    authFail(message) {
        this.setState({ message });
    }

    handleSubmit(username, password) {
        let onSuccess = this.authSuccess;
        let onFail = this.authFail;

        let formUsername = username;

        fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }

            return Promise.reject()
        }).then(data => {
            if ("token" in data) {
                onFail("Sorry, something went wrong.");
                return;
            }
            onSuccess(formUsername, data["token"]);
        }).catch(() => {
            onFail("Unknown error occurred.");
        });
    }

    render() {
        return (
            <StyleRoot>
                <div id="wrapper" style={FormComponents.styles.wrapper}>
                    <div id="box" style={FormComponents.styles.box}>
                        <h1 style={FormComponents.styles.header}>skål</h1>
                        <FormComponents.Form onSubmit={this.handleSubmit}
                                             errorMessage={this.state.message}
                                             buttonLabel="Login"/>
                        <a onClick={this.goToRegister}
                           style={FormComponents.styles.switchLink}>Sign Up</a>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setView, userLogin }, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
