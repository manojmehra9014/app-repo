export function todaysEventReducer(state = null, action) {
  switch (action.type) {
    case 'TODAYS_EVENT':
      return action.payload;
    case 'CLEAN_TODAYS_EVENT':
      return action.payload;
    default:
      return state;
  }
}
export function eventloadingReducer(state = null, action) {
  switch (action.type) {
    case 'SET_LOADING_EVENT_TRUE':
      return action.payload;
    case 'SET_LOADING_EVENT_FALSE':
      return action.payload;
    default:
      return state;
  }
}

export function currentActiveEventReducer(state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_ACTIVE_EVENT':
      return action.payload;
    case 'CLEAN_CURRENT_ACTIVE_EVENT':
      return action.payload;
    default:
      return state;
  }
}

export function downloadedEventReducer(state = null, action) {
  switch (action.type) {
    case 'SET_DOWNLOADED_EVENTS':
      return action.payload;
    case 'CLEAN_DOWNLOADED_EVENTS':
      return action.payload;
    default:
      return state;
  }
}
