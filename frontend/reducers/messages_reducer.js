import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard } from './util';

const initialState = {
  byId: {},
}

function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.messages);
    default:
      return state;
  }
}


export default messagesReducer;
