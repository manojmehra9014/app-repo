import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { currentActiveEventReducer, todaysEventReducer } from './eventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todaysEvent: todaysEventReducer,
  activeEvent: currentActiveEventReducer,
});

export default rootReducer;
