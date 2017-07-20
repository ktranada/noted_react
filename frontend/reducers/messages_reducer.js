import merge from 'lodash/merge';
import { ADD_MESSAGE, RECEIVE_MESSAGES } from '../actions/chat_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard, byIdObject } from './util';

const initialState = {
  byId: {},
}

function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOARD: return updateObject(state, action.board.messages);
    case RECEIVE_MESSAGES: return updateObject(state, action.messages.messages);
    case ADD_MESSAGE: return merge(state, byIdObject(action.message.id, action.message));
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.messages);
    default:
      return state;
  }
}


export default messagesReducer;
