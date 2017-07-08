import * as BoardAPI from '../util/board_api';

export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const UPDATE_LIST_ORDER = 'UPDATE_LIST_ORDER';

export function updateListOrder(boardId, lists) {
  return (dispatch) => BoardAPI.updateLists(boardId, JSON.stringify(lists), 'order');
}

export function updateCardPosition(card) {
  card['type'] = 'position';
  return (dispatch) => BoardAPI.updateCard(card)
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


export function moveCard(id, prevListId, prevPos, nextListId, nextPos) {
  return {
      type: MOVE_CARD,
      id,
      prevListId,
      prevPos,
      nextListId,
      nextPos
  }
}
// export function moveCard(id, lastListId, lastCardPos, nextListId, nextCardPos) {
//   return (dispatch) => {
//     const cardMoveDetails = {
//       type: MOVE_CARD,
//       id,
//       lastListId,
//       nextListId,
//       lastCardPos,
//       nextCardPos
//     };
//     dispatch(cardMoveDetails);
//     return BoardAPI.updateCard(cardMoveDetails);
//   }
// }
