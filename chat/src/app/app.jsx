let React = require("react");
let ReactDOM = require("react-dom");
import MainApp from "./components/MainApp";


class App {

    constructor() {
        // do something
    }

    render(element) {
        let mainElement = React.createElement(MainApp);

        if (element) {
            ReactDOM.render(mainElement, element);
            return;
        }

        return mainElement.render();
    }

    renderToDOM (element) {
        this.render(element);
    }

    renderToString () {
        return this.render();
    }
}

export default App;
