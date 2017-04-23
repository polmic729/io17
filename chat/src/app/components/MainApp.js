import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import mainApp from "../reducers";

class MainApp extends React.Component {
    constructor() {
        super();


        this.state = createStore(mainApp);
    }

    render() {
        return (
            <Provider store={this.state}>
                <h1>Main App</h1>
            </Provider>
        );
    }
}

export default MainApp;
