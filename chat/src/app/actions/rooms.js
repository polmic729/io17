export const ROOM_CHANGE = "ROOM_CHANGE";
export const GENERAL_ID = "GENERAL_ID";

export function setSelectedRoom(roomId) {
    return {
        type: ROOM_CHANGE,
        roomId
    };
}

export function setGeneralRoomId(id) {
    return {
        type: GENERAL_ID,
        id
    };
}

