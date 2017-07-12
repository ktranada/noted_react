import * as BoardsAPI from '../util/board_api';

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const ADD_BOARD = 'ADD_BOARD';
export const START_LOADING_BOARD = 'START_LOADING_BOARD';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';


export const createBoard = board => dispatch => (
  BoardsAPI.createBoard(board).then(
    board => {
      dispatch(addBoard(board));
      return board;
    },
    error => error.responseJSON)
)

export const requestBoard = boardId => dispatch => {
  dispatch(startLoadingBoard(boardId));
  return BoardsAPI.requestBoard(boardId)
    .then(board => {
      dispatch(receiveBoard(board));
      return board;
    })
}

export const requestSubscriptions = () => dispatch => (
  BoardsAPI.requestSubscriptions().then(
    subscriptions => dispatch(receiveSubscriptions(subscriptions))
  )
)

export const receiveBoard = board => ({
  type: RECEIVE_BOARD,
  board
})

export const receiveSubscriptions = subscriptions => ({
  type: RECEIVE_SUBSCRIPTIONS,
  subscriptions
})

export const startLoadingBoard = (boardId) => ({
  type: START_LOADING_BOARD,
  board: {
    id: boardId
  }
})

export const addBoard = (board) => ({
  type: ADD_BOARD,
  board
});
