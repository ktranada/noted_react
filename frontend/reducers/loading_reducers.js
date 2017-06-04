import { RECEIVE_CONVERSATIONS } from '../actions/board_navigation_actions';

const initialState = {
  loadingConversations: false,
  loadingContent: false
}

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return Object.assign({}, state, {
        loadingConversations: false
      });
    default:
      return state;
  }
}
