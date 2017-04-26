import { combineReducers } from "redux";
import { screen } from "./screen";
import { websocket } from "./websocket";


export default combineReducers({
    screen,
    websocket
});
