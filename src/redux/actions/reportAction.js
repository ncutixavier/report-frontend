import { GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL } from '../types';
import config from '../config/prod'
import axios from 'axios'

export const reportAction = () => async (dispatch) => {
    try {
        dispatch(getReportRequest())

        const token = await localStorage.getItem('token')
        const res = await axios.get(config.GET_ALL_REPORTS, {
            headers: {
                'Authorization': token
            }
        });
        return dispatch(getReportsSuccess(res))
    } catch (err) {
        if (err.response) {
            // console.log(err.response.data);
            const errorMessage = await err.response.data;
            return dispatch(getReportsFail(errorMessage))

        } else {
            return dispatch(getReportsFail('Network Fails'))
        }

    }
}

export const getReportRequest = () => {
    return {
        type: GET_REPORTS_REQUEST
    }
}

export const getReportsSuccess = (data) => {
    return {
        type: GET_REPORTS_SUCCESS,
        payload: data
    }
}

export const getReportsFail = (error) => {
    return {
        type: GET_REPORTS_FAIL,
        payload: error
    }
}