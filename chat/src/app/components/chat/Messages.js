import React from "react";

class Messages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <ul>
                    <li>first message</li>
                    <li>second message</li>
                </ul>
            </section>
        );
    }
}

export default Messages;