import * as BoardsAPI from '../util/board_api';

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const ADD_BOARD = 'ADD_BOARD';
export const START_LOADING_BOARD = 'START_LOADING_BOARD';
export const START_LOADING_SUBSCRIPTIONS = 'START_LOADING_SUBSCRIPTIONS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';


export const createBoard = board => dispatch => (
  BoardsAPI.createBoard(board).then(
    board => {
      dispatch(addBoard(board));
      return board;
    },
    error => error.responseJSON)
);

export const requestBoard = (boardId, isTimeZoneUpdate = false, isJoining = false) => dispatch => {
  dispatch(startLoadingBoard(boardId, isTimeZoneUpdate));
  return BoardsAPI.requestBoard(boardId)
    .then(board => {
      dispatch(receiveBoard(board, isTimeZoneUpdate, isJoining));
      return board;
    })
}

export const receiveBoard = (board, isTimeZoneUpdate, isJoining) => ({
  type: RECEIVE_BOARD,
  board,
  isTimeZoneUpdate,
  isJoining
});

export const startLoadingBoard = (boardId, isTimeZoneUpdate) => ({
  type: START_LOADING_BOARD,
  board: {
    id: boardId
  },
  isTimeZoneUpdate
});

export const startLoadingSubscriptions = (boardId) => ({
  type: START_LOADING_SUBSCRIPTIONS,
  boardId
});

export const addBoard = (board) => ({
  type: ADD_BOARD,
  board
});
