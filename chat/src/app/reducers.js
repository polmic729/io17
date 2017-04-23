import { Screens } from "./actions";

const initialState = {
    currentScreen: Screens.LOGIN,
};

function mainApp(state = initialState, action) {
    return state;
}

export default mainApp;
