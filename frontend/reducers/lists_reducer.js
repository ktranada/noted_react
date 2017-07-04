import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { ADD_LIST, ADD_CARD, REMOVE_CARD,REMOVE_BOARD } from '../actions/board_actions';
import { MOVE_CARD } from '../actions/list_actions';
import { updateObject, byIdObject, updateAssociationList, removeObjectsByBoard, updateObjectWithUpdatedAssociations } from './util';

const initialState = {
  byId: {}
}

function moveCard(state, action) {
  const { lastListId, nextListId, lastCardPos, nextCardPos } = action;
  const lastList = state.byId[lastListId] && merge({}, state.byId[lastListId]);
  const nextList = state.byId[nextListId] && merge({}, state.byId[nextListId]);
  if ((lastListId === nextListId) && (lastCardPos != nextCardPos) && lastList) {
    const updatedListCards = [...lastList.cards];
    const cardId = updatedListCards.splice(lastCardPos, 1)[0];
    updatedListCards.splice(nextCardPos, 0, cardId);
    lastList.cards = updatedListCards;


    return updateObject(state, byIdObject(lastListId, lastList));
  } else if (lastListId !== nextListId && nextList && lastList) {
    const lastListCards = [...lastList.cards]
    const cardId = lastListCards.splice(lastCardPos, 1)[0];
    lastList.cards = lastListCards;

    const nextListCards = [...nextList.cards];
    nextListCards.splice(nextCardPos, 0, cardId);

    const newState = updateObjectWithUpdatedAssociations(state, byIdObject(lastListId, lastList));
    newState.byId[nextListId].cards = nextListCards;
    return newState;
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
