import { RECEIVE_BOARD } from '../actions/nav_actions';
import { ADD_LIST, ADD_CARD, REMOVE_CARD,REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, byIdObject, updateAssociationList, removeObjectsByBoard } from './util';

const initialState = {
  byId: {}
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.lists);
    case ADD_LIST:
      return updateObject(state, byIdObject(action.list.id, action.list));
    case ADD_CARD:
      return updateAssociationList(state, action.card.list_id, 'cards', action.card.id);
    case REMOVE_CARD:
      return updateAssociationList( state, action.card.list_id, 'cards', action.card.id, { remove: true });
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.lists);
    default:
      return state;
  }
}

export default listsReducer;
