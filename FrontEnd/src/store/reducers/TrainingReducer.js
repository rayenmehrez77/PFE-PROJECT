const initialState = {
    trainings: [],
};

export default function TrainingsReducer(state = initialState, actions) {
    if (actions.type === 'GET_TRAININGS') {
        
        return {
            ...state,
            trainings:actions.payload,
        };
    }

    return state;
}