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

export const SET_WEBSOCKET = "SET_WEBSOCKET";

export function setWebsocket(ws) {
    return {
        type: SET_WEBSOCKET,
        ws: ws
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
