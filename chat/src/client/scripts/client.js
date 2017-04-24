import App from "./../../app";
import ReactDOM from "react-dom";

let app = new App();

ReactDOM.render(
    app.render(),
    document.getElementById("main")
);
