import { combineReducers } from "redux";
import { views } from "./views";
import { connections } from "./connections";
import { user } from "./user";

export default combineReducers({
    user,
    views,
    connections
});
