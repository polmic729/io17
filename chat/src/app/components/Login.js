import React from "react";
import { StyleRoot } from "radium";


class InputBox extends React.Component {
    render() {
        return (
            <input name={this.props.name}
                   placeholder={this.props.name}
                   style={styles.input}
                   type={this.props.type ? this.props.type : "input"}
                   required />
        );
    }
}


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // server request for authorization
        let success = false;

        // do POST request to auth/login with login and password in BODY

        if (success) {
            this.props.onSuccess();
        } else {
            this.props.onFail();
        }

        event.preventDefault();
    }

    render() {
        return (
            <StyleRoot>
            <form onSubmit={this.handleSubmit}>
                    <InputBox name="login" />
                    <InputBox name="password" type="password" />
                    <button style={styles.button}
                            type="submit">
                        login
                    </button>
             </form>
             </StyleRoot>
        );
    }
}

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

    render () {
        return (
            <StyleRoot>
            <div id="wrapper" style={styles.wrapper}>
                <div id="box" style={styles.box}>
                    <h1 style={styles.header}>skål</h1>
                    <LoginForm onSuccess={this.authSuccess}
                               onFail={this.authFail} />
                </div>
            </div>
            </StyleRoot>
        );
    }
}

const styles = {
    wrapper: {
        background: "#8D99AE",
        fontFamily: "'Varela Round', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },

    box: {
        padding: "30px",
        margin: "15px",
        width: "100%",
        background: "#EDF2F4",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        maxWidth: "600px",

        "@media screen and (min-width: 600px)": {
            width: "50%",
        },
    },

    header: {
        textAlign: "center",
        fontSize: "50px",
        marginBottom: "20px",
        color: "#43587B",
    },

    input: {
        fontFamily: "inherit",
        width: "100%",
        marginBottom: "30px",
        border: 0,
        padding: "10px",
        fontSize: "20px",
    },

    button: {
        fontFamily: "inherit",
        border: 0,
        padding: "10px",
        width: "100px",
        fontWeight: "bold",
        fontSize: "20px",
        color: "white",
        background: "#D90429",
        float: "right",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",

        "@media screen and (max-width: 600px)": {
            width: "100%",
        },

        ":hover": {
            boxShadow: "0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)",
            background: "#EF233C",
        }
    },
};

export default Login;
