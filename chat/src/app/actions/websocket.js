export const SET_WEBSOCKET = "SET_WEBSOCKET";

export function setWebsocket(ws) {
    return {
        type: SET_WEBSOCKET,
        ws: ws
    };
}
