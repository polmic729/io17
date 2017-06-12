import {combineReducers} from "redux";
import {views} from "./views";
import {connections} from "./connections";
import {user} from "./user";
import {room} from "./rooms";

export default combineReducers({
    user,
    views,
    connections,
    room
});
