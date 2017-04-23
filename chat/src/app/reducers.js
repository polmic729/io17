import { Screens, SET_SCREEN } from "./actions";

const initialState = {
    currentScreen: Screens.LOGIN,
};

function mainApp(state = initialState, action) {
    switch (action.type) {
    case SET_SCREEN:
        return Object.assign({}, state, {
            currentScreen: action.screen
        });
    }
    return state;
}

export default mainApp;
