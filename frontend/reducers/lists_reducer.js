import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { RECEIVE_LISTS, ADD_LIST, ADD_CARD, UPDATE_LIST, MOVE_CARD, REMOVE_BOARD, REMOVE_LIST, REMOVE_CARD } from '../actions/board_actions';
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
    case RECEIVE_LISTS:
      return updateObject(state, action.lists.lists);
    case ADD_LIST:
      return updateObject(state, byIdObject(action.list.id, action.list));
    case ADD_CARD:
      return updateAssociationList(state, action.card.list_id, 'cards', action.card.id);
    case MOVE_CARD:
      return moveCard(state, action);
    case UPDATE_LIST:
      if (state.byId[action.list.id]) {
        const newState = updateObject(state, byIdObject(action.list.id, {
          title: action.list.title
        }));
        return newState;
      }
    case REMOVE_LIST:
      if (state.byId[action.list.id]) {
        const newState = merge({}, state);
        delete newState.byId[action.list.id]
        return newState
      }
      return state;
    case REMOVE_CARD:
      return updateAssociationList( state, action.card.list_id, 'cards', action.card.id, { remove: true });
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.lists);
    default:
      return state;
  }
}

export default listsReducer;
