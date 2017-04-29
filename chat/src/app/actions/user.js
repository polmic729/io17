export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function userLogin(name) {
    return {
        type: USER_LOGIN,
        name
    };
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    };
}
