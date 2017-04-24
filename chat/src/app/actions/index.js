
export const SET_SCREEN = "SET_SCREEN";

export const Screens = {
    REGISTER: "REGISTER",
    LOGIN:    "LOGIN",
    MAIN:     "MAIN",
};

export function setScreen(screen) {
    return {
        type: SET_SCREEN,
        screen
    };
}

export const COUNTER = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"
};

export const increment = () => ({
    type: COUNTER.INCREMENT,
});

export const decrement = () => ({
    type: COUNTER.DECREMENT,
});