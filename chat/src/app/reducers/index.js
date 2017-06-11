import { combineReducers } from "redux";
import { views } from "./views";
import { connections } from "./connections";
import { user } from "./user";
import { rooms } from "./rooms";

export default combineReducers({
    user,
    views,
    connections,
    rooms
});
