import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';
import {AsyncStorage} from "react-native";

const config = {
    key: 'JOBS',
    storage: AsyncStorage,
    debug: true,
    whitelist: ['likedJobs']
};

/*
const rootReducer = combineReducers({
    auth, jobs, likedJobs
});
*/

const reducers = persistCombineReducers(config, {
    auth, jobs, likedJobs
});

export default reducers;