import React from "react";
import Chat from "./chat/Chat";

class MainApp extends React.Component {
    render() {
        return (
            <section>
                <h1> Skål </h1>
                <Chat />
            </section>
        );
    }
}

export default MainApp;
