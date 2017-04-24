import { combineReducers } from "redux";
import { screen } from "./screen";
import { websocket } from "./websocket";
import { counters } from "./counters";


export default combineReducers({
    screen,
    websocket,
    counters
});
