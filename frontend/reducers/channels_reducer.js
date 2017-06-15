import merge from 'lodash/merge';
import { RECEIVE_CHANNELS } from '../actions/board_nav_actions';

const initialState = {
  byId: {},
  order: []
}

const channelsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return merge({}, initialState, action.channels);
    default:
      return state;
  }
}


export default channelsReducer;
