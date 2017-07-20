import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { ADD_COMMENT, REMOVE_BOARD, RECEIVE_LISTS } from '../actions/board_actions';
import { updateObject, byIdObject, removeObjectsByBoard } from './util';

const initialState = {
  byId: {},
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LISTS: return updateObject(state, action.lists.comments);
    case ADD_COMMENT: return updateObject(state, byIdObject(action.comment.id, action.comment));
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.comments);
    default: return state;
  }
}

export default commentsReducer;
