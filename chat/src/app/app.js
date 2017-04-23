import React from "react";
import MainApp from "./components/MainApp";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as reducers from "./reducers";

const store = createStore(reducers);

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }
}

export default App;
