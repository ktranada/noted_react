import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/board_toggler_actions';
import { ADD_LIST } from '../actions/board_content_actions';
import { byIdObject } from './util';

const initialState = {
  byId: {}
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.lists);
    case ADD_LIST:
      return merge({}, state, byIdObject(action.list.id, action.list))
    default:
      return state;
  }
}

export default listsReducer;
