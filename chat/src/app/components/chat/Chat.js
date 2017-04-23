let React = require("react");
let Messages = require("./Messages");
let Send = require("./Send");


class Chat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Messages />
                <Send />
            </section>
        );
    }
}

export default Chat;