export const SET_ROOM_SELECTED = "SET_ROOM_SELECTED";
export const SET_ROOM_GENERAL = "SET_ROOM_GENERAL";

export function setSelectedRoom(id) {
    return {
        type: SET_ROOM_SELECTED,
        id
    };
}

export function setGeneralRoom(id) {
    return {
        type: SET_ROOM_GENERAL,
        id
    };
}
