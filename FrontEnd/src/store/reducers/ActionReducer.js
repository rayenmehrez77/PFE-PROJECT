const initialState = {
    actions: [],
};

export default function ActionsReducer(state = initialState, actions) {
    if (actions.type === 'GET_ACTIONS') {
        
        return {
            ...state,
            actions:actions.payload,
        };
    }

    return state;
}