// Useful if we end up with more than one reducer
import { combineReducers } from 'redux';
import sites from './sites';
import history from './history';
import token from './token';

const reducers = combineReducers({
    sites,
    history,
    token
});

export default reducers;
