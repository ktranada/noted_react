import merge from 'lodash/merge';
import { RECEIVE_LISTS, ADD_CARD, ADD_COMMENT, UPDATE_CARD, REMOVE_LIST, REMOVE_CARD, REMOVE_BOARD } from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, updateAssociationList, deleteObjectById, removeObjectsByBoard } from './util';

const initialState = {
  byId: {}
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LISTS:
      return merge({}, state, action.lists.cards);
    case UPDATE_CARD:
    case ADD_CARD:
      return updateObject(state, byIdObject(action.card.id, action.card));
    case ADD_COMMENT:
      return updateAssociationList(
        state,
        action.comment.card_id,
        'comments',
        action.comment.id, {prepend: true});
    case REMOVE_CARD:
        return deleteObjectById(state, action.card.id);
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.cards);
    case REMOVE_LIST:
      return removeObjectsByBoard(state, action.list.cards);
    default:
      return state;
  }
}

export default cardsReducer;
