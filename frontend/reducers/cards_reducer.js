import merge from 'lodash/merge';
import { ADD_CARD, ADD_COMMENT, EDIT_CARD_INFO, REMOVE_CARD } from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, updateAssociationList, deleteObjectById } from './util';

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
        action.comment.id, {prepend: true})

    case REMOVE_CARD:
        return deleteObjectById(state, action.card.id);
    default:
      return state;
  }
}

export default cardsReducer;
