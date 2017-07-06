import merge from 'lodash/merge';
import { ADD_CARD, ADD_COMMENT, UPDATE_CARD, REMOVE_CARD, REMOVE_BOARD } from '../actions/board_actions';
import { MOVE_CARD } from '../actions/list_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, updateAssociationList, deleteObjectById, removeObjectsByBoard } from './util';

const initialState = {
  byId: {}
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.cards);

    case UPDATE_CARD:
    case ADD_CARD:
      return updateObject(state, byIdObject(action.card.id, action.card));

    case ADD_COMMENT:
      return updateAssociationList(
        state,
        action.comment.card_id,
        'comments',
        action.comment.id, {prepend: true});
    // case MOVE_CARD:
    //   return updateObject(state, byIdObject(action.cardId, { list_id: action.nextListId }))

    case REMOVE_CARD:
        return deleteObjectById(state, action.card.id);
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.cards);
    default:
      return state;
  }
}

export default cardsReducer;
