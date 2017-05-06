import { StyleRoot } from "radium";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Views, setView } from "../../actions/views";
import FormComponents from "./Form";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.authSuccess = this.authSuccess.bind(this);
        this.authFail = this.authFail.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goToLogin() {
        this.props.actions.setView(Views.LOGIN);
    }

    authSuccess() {
        this.props.actions.setView(Views.LOGIN);
    }

    authFail(message) {
        this.setState({ message });
    }

    handleSubmit(username, password) {
        let onSuccess = this.authSuccess;
        let onFail = this.authFail;

        fetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            switch (res.status) {
            case 204:
                onSuccess();
                return;
            case 403:
                onFail("User already exists");
                return;
            default:
                onFail("Unknown error occurred");
            }
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
                                             buttonLabel="Sign up"/>
                        <a onClick={this.goToLogin}
                           style={FormComponents.styles.switchLink}>Login</a>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ setView }, dispatch)
});

export default connect(null, mapDispatchToProps)(SignUp);
