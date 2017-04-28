import { SET_SOCKET } from "../actions/connections";

export function connections(state = {}, action) {
    switch (action.type) {
    case SET_SOCKET:
        return { ...state, socket: action.socket };
    }
    return state;
}
