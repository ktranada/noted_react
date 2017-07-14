import * as BoardAPI from '../util/board_api';

export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const UPDATE_LIST_ORDER = 'UPDATE_LIST_ORDER';

export const updateListPosition = (list) => dispatch => (
  BoardAPI.updateList(list)
)

export const updateCardPosition = (card) =>  dispatch => {
  card['type'] = 'position';
  return BoardAPI.updateCard(card)
}

export const moveList = (boardId, listId, lastPos, nextPos) => {
  return ({
    type: MOVE_LIST,
    boardId,
    listId,
    lastPos,
    nextPos
  })
}


export const moveCard = (id, prevListId, prevPos, nextListId, nextPos) => {
  return {
      type: MOVE_CARD,
      id,
      prevListId,
      prevPos,
      nextListId,
      nextPos
  }
}
