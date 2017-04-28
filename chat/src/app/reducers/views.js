import { Views, SET_VIEW } from "../actions/views";

const initial = {
    current: Views.LOGIN
};

export function views(state = initial, action) {
    switch (action.type) {
    case SET_VIEW:
        return { ...state, current: action.current };
    }
    return state;
}
