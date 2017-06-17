import merge from 'lodash/merge';
import { ADD_CARD, EDIT_CARD_INFO } from '../actions/board_content_actions';
import { RECEIVE_BOARD } from '../actions/board_toggler_actions';
import { updateObject, byIdObject } from './util';

const initialState = {
  byId: {}
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.cards);

    case EDIT_CARD_INFO:
    case ADD_CARD:
      return updateObject(state, byIdObject(action.card.id, action.card));
    default:
      return state;
  }
}

export default cardsReducer;
