export const SET_VIEW = "SET_VIEW";

export const Views = {
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    MAIN: "MAIN",
    CHAT: "CHAT"
};

export function setView(view) {
    return {
        type: SET_VIEW,
        current: view
    };
}
