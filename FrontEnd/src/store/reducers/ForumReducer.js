const initialState = {
    forums: [],
};

export default function ForumReducer(state = initialState, actions) {
    if (actions.type === 'GET_FORUMS') {
        
        return {
            ...state,
            forums:actions.payload,
        };
    }

    return state;
}