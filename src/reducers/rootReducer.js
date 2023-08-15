import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import {
  currentActiveEventReducer,
  downloadedEventReducer,
  todaysEventReducer,
} from './eventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todaysEvent: todaysEventReducer,
  activeEvent: currentActiveEventReducer,
  downloadedEvents: downloadedEventReducer,
});

export default rootReducer;
