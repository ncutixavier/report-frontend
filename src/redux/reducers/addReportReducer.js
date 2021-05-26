import { ADD_REPORT_REQUEST, ADD_REPORT_SUCCESS, ADD_REPORT_FAIL } from '../types';

const initialState = {
    loading: 'none',
    data: [],
    error: ''
}

const addReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REPORT_REQUEST:
            return {
                ...state,
                loading: 'block'
            };
        case ADD_REPORT_SUCCESS:
            return {
                loading: 'none',
                data: action.payload,
                error: ''
            };
        case ADD_REPORT_FAIL:
            return {
                loading: 'none',
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default addReportReducer;