import React from "react";
import { connect } from "react-redux";

class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.socket.emit("chat-message", this.state.message);
        this.refs.textBox.value = "";
        this.setState({ message: "" });
    }

    render() {
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input ref="textBox" type="text" name="message" placeholder="message" onChange={this.handleChange}/>
                    <input type="submit" value="Send"/>
                </form>
            </section>
        );
    }
}

let mapStateToProps = (state) => ({
    socket: state.connections.socket
});

export default connect(mapStateToProps, null)(Send);
