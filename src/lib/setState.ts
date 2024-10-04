const setState = <T>(state: T, newState: T): T => {
    if (newState !== state) {
        return newState;
    }

    return state;
};

export default setState;
