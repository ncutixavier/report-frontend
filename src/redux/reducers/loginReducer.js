import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

const initialState = {
    loading: 'hidden',
    data: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: 'visible'
            };
        case LOGIN_SUCCESS:
            return {
                loading: 'hidden',
                data: action.payload,
                error: ''
            };
        case LOGIN_FAIL:
            return {
                loading: 'hidden',
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;
