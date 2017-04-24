import { combineReducers } from "redux";
import { Screens, SET_SCREEN } from "../actions";
import { COUNTER } from "../actions";

const initialScreens = {
    screen: Screens.LOGIN,
};

function screen(state = initialScreens, action) {
    switch (action.type) {
    case SET_SCREEN:
        return Object.assign({}, state, {screen: action.screen});
    }
    return state;
}

const initialCounters = {
    counter: 0
};

function counters(state = initialCounters, action) {
    switch (action.type) {
    case COUNTER.INCREMENT:
        // TODO: Figure out how to change state object nicely. This Object.assign() thing is bad.
        return Object.assign({}, state, {counter: state.counter + 1});
    case COUNTER.DECREMENT:
        return Object.assign({}, state, {counter: state.counter - 1});
    }
    return state;
}

export default combineReducers({
    screen,
    counters
});
