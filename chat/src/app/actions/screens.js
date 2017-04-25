export const SET_SCREEN = "SET_SCREEN";

export const Screens = {
    REGISTER: "REGISTER",
    LOGIN:    "LOGIN",
    MAIN:     "MAIN",
    CHAT:     "CHAT",
};

export function setScreen(screen) {
    return {
        type: SET_SCREEN,
        screen
    };
}