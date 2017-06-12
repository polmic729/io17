import { SET_ROOM_SELECTED } from "../actions/rooms";

const initial = {
    roomId: 0
};

export function rooms(state = initial, action) {
    switch (action.type) {
    case SET_ROOM_SELECTED:
        return {...state, name: action.roomId};
    }
    return state;
}
