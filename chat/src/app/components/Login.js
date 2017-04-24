import React from "react";
import {StyleRoot} from "radium";
import FormComponents from "./Form";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.authSuccess = this.authSuccess.bind(this);
        this.authFail = this.authFail.bind(this);
    }

    authSuccess() {
        alert("Login successful");
    }

    authFail() {
        alert("Login failed");
    }

    render() {
        return (
            <StyleRoot>
                <div id="wrapper" style={FormComponents.styles.wrapper}>
                    <div id="box" style={FormComponents.styles.box}>
                        <h1 style={FormComponents.styles.header}>skål</h1>
                        <FormComponents.Form onSuccess={this.authSuccess}
                                             onFail={this.authFail}
                                             requestUrl="/auth/login"
                                             buttonLabel="Login"/>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default Login;
