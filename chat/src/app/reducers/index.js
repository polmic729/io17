import { combineReducers } from "redux";
import { views } from "./views";
import { websocket } from "./websocket";

export default combineReducers({
    views,
    websocket
});
