let React = require("react");
import io from "socket.io-client";
let socket = io("http://localhost:3001");


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
        socket.emit("message", this.state.message);
        event.preventDefault();
    }

    render() {
        return (
            <section>

                <input type="text" name="message" placeholder="message" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Send</button>
            </section>
        );
    }
}

export default Send;