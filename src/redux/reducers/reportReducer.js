import { GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL } from '../types';

const initialState = {
    loading: 'block',
    items: [],
    error: ''
}

const getReportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORTS_REQUEST:
            return {
                ...state,
                loading: 'block'
            };
        case GET_REPORTS_SUCCESS:
            return {
                loading: 'none',
                items: action.payload,
                error: ''
            };
        case GET_REPORTS_FAIL:
            return {
                loading: 'none',
                items: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default getReportsReducer;
