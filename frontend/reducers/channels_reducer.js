import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard } from './util';

const initialState = {
  byId: {},
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.channels);
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.channels);
    default:
      return state;
  }
}


export default channelsReducer;
