import { USER_LOGIN, USER_LOGOUT } from "../actions/user";

const initial = {
    name: "",
    authorized: false
};

export function user(state = initial, action) {
    switch (action.type) {
    case USER_LOGIN:
        return { ...state, name: action.name, authorized: true };
    case USER_LOGOUT:
        return { ...state, name: "", authorized: false };
    }
    return state;
}
