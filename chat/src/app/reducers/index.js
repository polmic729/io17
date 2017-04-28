import { combineReducers } from "redux";
import { views } from "./views";
import { connections } from "./connections";

export default combineReducers({
    views,
    connections
});
