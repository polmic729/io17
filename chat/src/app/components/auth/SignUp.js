import { StyleRoot } from "radium";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Views, setView } from "../../actions/views";
import FormComponents from "./Form";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.authSuccess = this.authSuccess.bind(this);
        this.authFail = this.authFail.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goToLogin() {
        this.props.actions.setView(Views.LOGIN);
    }

    authSuccess() {
        alert("SignUp successful");
        this.props.actions.setView(Views.LOGIN);
    }

    authFail() {
        alert("SignUp failed");
    }

    handleSubmit(username, password) {
        let onSuccess = this.authSuccess;
        let onFail = this.authFail;

        fetch("/auth/register", {
            method: "POST",
            body: "name=" + username + "&password=" + password,
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
                                             buttonLabel="Sign up"/>
                        <a href="#" onClick={this.goToLogin}>Login</a>
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
