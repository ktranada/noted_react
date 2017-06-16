import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/board_toggler_actions';

const initialState = {
  byId: {}
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.cards);
    default:
      return state;
  }
}

export default cardsReducer;
