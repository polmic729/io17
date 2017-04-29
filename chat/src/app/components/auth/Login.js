import { StyleRoot } from "radium";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setView, Views } from "../../actions/views";
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

    authSuccess(token) {
        window.sessionStorage.setItem("token", token);
        this.props.actions.setView(Views.CHAT);
    }

    authFail(message) {
        this.setState({
            message: message
        });
    }

    handleSubmit(username, password) {
        let onSuccess = this.authSuccess;
        let onFail = this.authFail;

        fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            switch (res.status) {
            case 200:
                return res.json();
            case 401:
                onFail("Invalid username or password.");
                return;
            case 400:
                onFail("Sorry, something went wrong.");
                return;
            case 500:
                onFail("Sorry, our amazing servers are down.");
                return;
            }
        }).then((data) => {
            if (data["token"] === undefined) {
                onFail("Sorry, something went wrong.");
                return;
            }
            onSuccess(data["token"]);
        });
    }

    render() {
        return (
            <StyleRoot>
                <div id="wrapper" style={FormComponents.styles.wrapper}>
                    <div id="box" style={FormComponents.styles.box}>
                        <h1 style={FormComponents.styles.header}>skål</h1>
                        <p id="error" style={FormComponents.styles.error}> {this.state.message} </p>
                        <FormComponents.Form onSubmit={this.handleSubmit} buttonLabel="Login"/>
                        <a href="#" onClick={this.goToRegister} style={FormComponents.styles.register}>Sign Up</a>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setView }, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
