import ReactDOM from "react-dom";
import App from "./../../app";

let app = new App();

ReactDOM.render(
    app.render(),
    document.getElementById("main")
);
