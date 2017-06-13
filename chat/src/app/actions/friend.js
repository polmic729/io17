export const SET_FRIEND_SELECTED = "SET_FRIEND_SELECTED";

export function setSelectedFriend(selectedFriend) {
    return {
        type: SET_FRIEND_SELECTED,
        selectedFriend
    };
}
