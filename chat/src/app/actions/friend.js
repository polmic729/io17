export const SET_FRIEND_SELECTED = "SET_FRIEND_SELECTED";

export function setSelectedFriend(friendSelected) {
    return {
        type: SET_FRIEND_SELECTED,
        friendSelected
    };
}
