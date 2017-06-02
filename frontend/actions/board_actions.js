import * as BoardsAPI from '../util/boards_api';

export const FETCH_BOARDS = "FETCH_BOARDS";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const ADD_BOARDS = "ADD_BOARDS";

export const fetchBoards = () => dispatch => (
  BoardsAPI.fetchBoards()
    .then(boards)
)

export const setCurrentBoard = currentBoard => ({
  type: SET_CURRENT_BOARD,
  currentBoard
})

export const addBoard = (board) => ({
  type: ADD_BOARD,
  board
});

export const addBoards = boards => ({
  type: ADD_BOARDS,
  boards
});
