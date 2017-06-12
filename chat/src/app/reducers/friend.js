import {SET_FRIEND_SELECTED} from "../actions/friend";

const initial = {
    selectedFriend: ""
};

export function friend(state = initial, action) {
    switch (action.type) {
    case SET_FRIEND_SELECTED:
        return {...state, selectedFriend: action.selectedFriend};
    }
    return state;
}
