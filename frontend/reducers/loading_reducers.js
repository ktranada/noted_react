import { RECEIVE_CHANNELS } from '../actions/board_nav_actions';

const initialState = {
  loadingChannels: false,
  loadingContent: false
}

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, state, {
        loadingChannels: false
      });
    default:
      return state;
  }
}
