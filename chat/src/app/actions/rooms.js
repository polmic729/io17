export const ROOM_CHANGE = "ROOM_CHANGE";

export function setSelectedRoom(name) {
    return {
        type: ROOM_CHANGE,
        name
    };
}

