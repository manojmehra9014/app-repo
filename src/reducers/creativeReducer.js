export function creativesReducer(state = null, action) {
  switch (action.type) {
    case 'SET_CREATIVES':
      return action.payload;
    case 'SET_CREATIVES_NULL':
      return action.payload;
    default:
      return state;
  }
}
