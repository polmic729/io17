import React from "react";
import Root from "./components/Root";
import { createStore } from "redux";
import { Provider } from "react-redux";
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
