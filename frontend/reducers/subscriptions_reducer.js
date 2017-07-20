import merge from 'lodash/merge';
import { RECEIVE_BOARD, RECEIVE_SUBSCRIPTIONS } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard } from './util';

const initialState = {
  channelsByBoardId: {}
}

function subscriptionsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOARD: return updateObject(state, action.board.subscriptions);
    case RECEIVE_SUBSCRIPTIONS: return merge({}, state, action.subscriptions);
    case REMOVE_BOARD:
      if (state.channelsByBoardId[action.board.id]) {
        const newState = merge({}, state);
        delete newState.channelsByBoardId[action.board.id]
        return newState;
      }
      return state;
    default:
      return state;
  }
}


export default subscriptionsReducer;
