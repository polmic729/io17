import React from "react";
import MainApp from "./components/MainApp";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";


let store = createStore(reducer);

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
