import * as BoardsAPI from '../util/board_api';

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const RECEIVE_BOARDS = "RECEIVE_BOARDS";
export const ADD_BOARD = "ADD_BOARD";
export const START_LOADING_BOARD = "START_LOADING_BOARD";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";


export const createBoard = board => dispatch => (
  BoardsAPI.createBoard(board)
    .then(board => {
      dispatch(addBoard(board));
      return board;
    })
)

export const requestBoard = boardId => dispatch => {
  dispatch(startLoadingBoard(boardId));
  return BoardsAPI.requestBoard(boardId)
    .then(board => {
      dispatch(receiveBoard(board));
      return board;
    })
}

export const receiveBoard = board => ({
  type: RECEIVE_BOARD,
  board
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
