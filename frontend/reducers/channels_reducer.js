import merge from 'lodash/merge';
import { RECEIVE_CHANNELS } from '../actions/board_nav_actions';
import { RECEIVE_BOARD } from '../actions/board_toggler_actions';

const initialState = {
  byId: {},
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.channels);
    case RECEIVE_CHANNELS:
      return merge({}, initialState, action.channels);
    default:
      return state;
  }
}


export default channelsReducer;
