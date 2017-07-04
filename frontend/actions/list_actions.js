import * as BoardAPI from '../util/board_api';

export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const UPDATE_LIST_ORDER = 'UPDATE_LIST_ORDER';

export function updateListOrder(boardId, lists) {
  return (dispatch) => {
    BoardAPI.updateLists(boardId, JSON.stringify(lists), 'order').
      then(lists => {
        dispatch({
          type: UPDATE_LIST_ORDER,
          lists
        })
      })
  }
}


export function moveList(boardId, listId, lastPos, nextPos) {
  return ({
    type: MOVE_LIST,
    boardId,
    listId,
    lastPos,
    nextPos
  })
}

export function moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos) {
  return ({
    type: MOVE_CARD,
    cardId,
    lastListId,
    nextListId,
    lastCardPos,
    nextCardPos
  })
}
