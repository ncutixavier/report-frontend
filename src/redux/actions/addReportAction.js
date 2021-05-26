import { ADD_REPORT_REQUEST, ADD_REPORT_SUCCESS, ADD_REPORT_FAIL } from '../types';
import config from '../config/prod'
import axios from 'axios';

export const addReportAction = (data) => async (dispatch) => {
    try {
        dispatch({ type: ADD_REPORT_REQUEST });
        const token = localStorage.getItem('token')

        const res = await axios.post(
            config.GET_ALL_REPORTS, data, {
            headers: {
                'Authorization': token,
            }
        })
        if (res) {
            window.location.reload()
        }
        return dispatch(addReportSuccess(res))
    } catch (error) {
        if (error.response) {
            const errorMessage = await error.response.data.message;
            return dispatch(addReportFails(errorMessage));
        }
        else {
            return dispatch(addReportFails('Network Error'));
        }
    }
};

export const addReportSuccess = (data) => {
    return {
        type: ADD_REPORT_SUCCESS,
        payload: data,
    };
};

export const addReportFails = (error) => {
    return {
        type: ADD_REPORT_FAIL,
        payload: error,
    };
};