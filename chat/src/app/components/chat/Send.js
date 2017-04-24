import React from "react";
import { connect } from "react-redux";

class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit() {
        this.props.websocket.emit("chat-message", this.state.message);

        this.refs.textBox.value = "";
        this.setState({
            message: ""
        });
    }

    render() {
        return (
            <section>
                <input ref="textBox" type="text" name="message" placeholder="message" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Send</button>
            </section>
        );
    }
}

let mapStateToProps = (state) => ({
    //FIXME wtf
    websocket: state.websocket.websocket
});

export default connect(mapStateToProps, null)(Send);
