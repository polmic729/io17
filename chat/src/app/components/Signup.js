import React from "react";
import {StyleRoot} from "radium";
import FormComponents from "./Form";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.authSuccess = this.authSuccess.bind(this);
        this.authFail = this.authFail.bind(this);
    }

    authSuccess() {
        alert("Signup successful");
    }

    authFail() {
        alert("Signup failed");
    }

    render() {
        return (
            <StyleRoot>
                <div id="wrapper" style={FormComponents.styles.wrapper}>
                    <div id="box" style={FormComponents.styles.box}>
                        <h1 style={FormComponents.styles.header}>skål</h1>
                        <FormComponents.Form onSuccess={this.authSuccess}
                                             onFail={this.authFail}
                                             requestUrl="/auth/register"
                                             buttonLabel="Sign up"/>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default Signup;
