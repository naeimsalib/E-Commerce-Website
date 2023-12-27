import { combineReducers } from 'redux';
import { userDetailsReducer, userUpdateProfileReducer } from './userReducers';
import { userLoginReducer } from './authReducers';

// Combine the reducers to create the root reducer
export default combineReducers({
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userLogin: userLoginReducer
});
