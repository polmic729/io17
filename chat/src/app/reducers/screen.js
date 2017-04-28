import { Screens, SET_SCREEN } from "../actions/screens";

const initialScreens = {
    screen: Screens.LOGIN
};

export function screen(state = initialScreens, action) {
    switch (action.type) {
    case SET_SCREEN:
        return { ...state, screen: action.screen };
    }
    return state;
}
