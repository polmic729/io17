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

        let jsonRequest = fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });
        let jsonData = jsonRequest.then(res => res.json());

        Promise.all([jsonRequest, jsonData]).then(values => {
            let [response, data] = values;
            if (response.status === 200) {
                onSuccess(username, data.token);
                return;
            } else if("message" in data) {
                onFail(data.message);
                return;
            } else {
                return Promise.reject();
            }
        }).catch(() => {
            onFail("Unknown error occurred");
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
