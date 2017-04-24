import { SET_WEBSOCKET } from "../actions/websocket";

export function websocket(state = {}, action) {
    switch (action.type) {
    case SET_WEBSOCKET:
        return { ...state, websocket: action.ws };
    }

    return state;
}
