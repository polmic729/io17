import { ROOM_CHANGE } from "../actions/rooms";

const initial = {
    roomId: 2137
};

export function rooms(state = initial, action) {
    switch (action.type) {
    case ROOM_CHANGE:
        return {...state, name: action.roomId};
    }
    return state;
}
