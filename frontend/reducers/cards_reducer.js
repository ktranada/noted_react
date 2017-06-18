import merge from 'lodash/merge';
import { ADD_CARD, ADD_COMMENT, EDIT_CARD_INFO } from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, updateAssociationList } from './util';

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

    case ADD_COMMENT:
      return updateAssociationList(
        state,
        action.comment.card_id,
        'comments',
        action.comment.id)
    default:
      return state;
  }
}

export default cardsReducer;
