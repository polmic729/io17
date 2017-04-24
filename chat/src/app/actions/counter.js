export const COUNTER = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"
};

export const increment = () => ({
    type: COUNTER.INCREMENT,
});

export const decrement = () => ({
    type: COUNTER.DECREMENT,
});
