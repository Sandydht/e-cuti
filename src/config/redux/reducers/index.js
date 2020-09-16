import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import userReducer from './userReducer';

export default combineReducers({
  session: sessionReducer,
  user: userReducer
});