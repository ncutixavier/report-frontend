import { combineReducers } from 'redux'
import loginReducer from './loginReducer';
import reportReducer from './reportReducer';
import addReportReducer from './addReportReducer';

const allReducers = combineReducers({
    login: loginReducer,
    getReports: reportReducer,
    addReport: addReportReducer,
})

export default allReducers
