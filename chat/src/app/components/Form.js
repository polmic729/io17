import { StyleRoot } from "radium";
import React from "react";

class InputBox extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    render() {
        return (
            <input name={this.props.name}
                   placeholder={this.props.name}
                   type={this.props.type}
                   style={styles.input}
                   onChange={this.handleOnChange}
                   required/>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleSubmit(event) {
        this.props.onSubmit(this.state.username,
            this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <StyleRoot>
                <form onSubmit={this.handleSubmit}>
                    <InputBox name="username" onChange={this.handleInputChange}/>
                    <InputBox name="password" type="password" onChange={this.handleInputChange}/>
                    <button style={styles.button} type="submit">
                        {this.props.buttonLabel}
                    </button>
                </form>
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
        height: "100%"
    },

    box: {
        padding: "30px",
        margin: "15px",
        width: "100%",
        background: "#EDF2F4",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        maxWidth: "600px",

        "@media screen and (min-width: 600px)": {
            width: "50%"
        }
    },

    header: {
        textAlign: "center",
        fontSize: "50px",
        marginBottom: "20px",
        color: "#43587B"
    },

    input: {
        fontFamily: "inherit",
        width: "100%",
        marginBottom: "30px",
        border: 0,
        padding: "10px",
        fontSize: "20px"
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
            width: "100%"
        },

        ":hover": {
            boxShadow: "0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)",
            background: "#EF233C"
        }
    }
};

export default { Form, styles };
