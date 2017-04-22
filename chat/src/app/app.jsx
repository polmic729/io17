let React = require("react");
let ReactDOM = require("react-dom");
import Hello from "./components/Hello";


class App {

    constructor() {
        // do something
    }

    render(element) {
        let HelloElement = React.createElement(Hello);

        if (element) {
            ReactDOM.render(HelloElement, element);
            return;
        }

        return HelloElement.render();
    }

    renderToDOM (element) {
        this.render(element);
    }

    renderToString () {
        return this.render();
    }
}

export default App;