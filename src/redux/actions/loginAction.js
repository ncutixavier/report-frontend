import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

import axios from 'axios';

export const loginAction = (data, history) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        const res = await axios.post('https://reports-backend.herokuapp.com/api/v1/users/login', data)
        const user = await res.data;
        localStorage.setItem('token', user.token)
        localStorage.setItem('role', user.user.role);

        if (user) {
            history.push('/reports')
        }
        return dispatch(loginSuccess(user));
    } catch (error) {
        const errorMessage = "Email or Password is wrong";
        return dispatch(loginFails(errorMessage))
    }

}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }

}

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const loginFails = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }

}