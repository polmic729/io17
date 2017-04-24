import { COUNTER } from "../actions/counter";

const initialCounters = {
    counter: 0
};

export function counters(state = initialCounters, action) {
    switch (action.type) {
    case COUNTER.INCREMENT:
        return { ...state, counter: state.counter + 1};
    case COUNTER.DECREMENT:
        return { ...state, counter: state.counter - 1};
    }
    return state;
}
