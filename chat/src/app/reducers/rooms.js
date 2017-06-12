import {SET_ROOM_GENERAL, SET_ROOM_SELECTED} from "../actions/rooms";

const initial = {
    selected: 0,
    general: 0
};

export function room(state = initial, action) {
    switch (action.type) {
    case SET_ROOM_SELECTED:
        return {...state, selected: action.selected};
    case SET_ROOM_GENERAL:
        return {...state, general: action.general};
    }
    return state;
}
