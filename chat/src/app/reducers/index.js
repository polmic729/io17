import {combineReducers} from "redux";
import {views} from "./views";
import {connections} from "./connections";
import {user} from "./user";
import {room} from "./rooms";
import {friend} from "./friend";

export default combineReducers({
    user,
    views,
    connections,
    room,
    friend
});
