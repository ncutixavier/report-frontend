import { combineReducers } from 'redux'
import loginReducer from './loginReducer';
import reportReducer from './reportReducer';

const allReducers = combineReducers({
    login: loginReducer,
    getReports: reportReducer,
})

export default allReducers
