import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { ADD_LIST, ADD_CARD, REMOVE_CARD,REMOVE_BOARD } from '../actions/board_actions';
import { MOVE_CARD } from '../actions/list_actions';
import { updateObject, byIdObject, updateAssociationList, removeObjectsByBoard, updateObjectWithUpdatedAssociations } from './util';

const initialState = {
  byId: {}
}

function moveCard(state, action) {
  const { prevListId, prevPos, nextListId, nextPos } = action;
  let newState = null;
  let id = null;
  if (prevListId === nextListId) {
    if (state.byId[prevListId]) {
      newState = merge({}, state);
      id = newState.byId[prevListId].cards.splice(prevPos, 1)[0];
      newState.byId[prevListId].cards.splice(nextPos, 0, id);
      return newState;
    }
  } else {
    if (state.byId[prevListId] && state.byId[nextListId]) {
      newState = merge({}, state);
      id = newState.byId[prevListId].cards.splice(prevPos, 1)[0];
      newState.byId[nextListId].cards.splice(nextPos, 0, id);
      return newState;
    }
  }

  return state;
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.lists);
    case ADD_LIST:
      return updateObject(state, byIdObject(action.list.id, action.list));
    case ADD_CARD:
      return updateAssociationList(state, action.card.list_id, 'cards', action.card.id);
    case MOVE_CARD:
      return moveCard(state, action);
    case REMOVE_CARD:
      return updateAssociationList( state, action.card.list_id, 'cards', action.card.id, { remove: true });
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.lists);
    default:
      return state;
  }
}

export default listsReducer;
