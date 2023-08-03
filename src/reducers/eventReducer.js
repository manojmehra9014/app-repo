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
