import React from "react";
import Radium from "radium";

@Radium
class Login extends React.Component {
    constructor() {
        super();
    }

    render () {
        return (
            <div id="wrapper" style={styles.wrapper}>
                <div id="box" style={styles.box}>
                    <h1 style={styles.header}>skål</h1>
                    <form>
                        <input name="login"
                               placeholder="login"
                               style={styles.input} />

                        <input name="password"
                               placeholder="password"
                               type="password"
                               style={styles.input}/>

                        <button style={styles.button}
                                type="button">
                            login
                        </button>
                    </form>
                </div>
            </div>
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
        width: "40%",
        background: "#EDF2F4",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
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

        ":hover": {
            boxShadow: "0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)",
            background: "#EF233C",
        }
    },
};

export default Login;
