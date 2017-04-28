import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Root from "./components/Root";
import reducer from "./reducers";

let store = createStore(reducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

export default App;
