/*
 * Action types
 */
export const SET_SCREEN = "SET_SCREEN";


/*
 * Action constants
 */
export const Screens = {
    REGISTER: "REGISTER",
    LOGIN:    "LOGIN",
    MAIN:     "MAIN",
};


/*
 * Action creators
 */

export function setScreen(screen) {
    return { type: SET_SCREEN, screen };
}

