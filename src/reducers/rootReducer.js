import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import {
  currentActiveEventReducer,
  downloadedEventReducer,
  todaysEventReducer,
  eventloadingReducer,
} from './eventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todaysEvent: todaysEventReducer,
  activeEvent: currentActiveEventReducer,
  downloadedEvents: downloadedEventReducer,
  eventLoading:eventloadingReducer,
});

export default rootReducer;
