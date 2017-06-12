export const SET_ROOM_SELECTED = "SET_ROOM_SELECTED";
export const SET_ROOM_GENERAL = "SET_ROOM_GENERAL";

export function setSelectedRoom(selected) {
    return {
        type: SET_ROOM_SELECTED,
        selected
    };
}

export function setGeneralRoom(general) {
    return {
        type: SET_ROOM_GENERAL,
        general
    };
}
