export const FETCH_BOARDS = "FETCH_BOARDS";
export const SET_CURRENT_BOARD_ID = "SET_CURRENT_BOARD_ID";
export const ADD_BOARD = "ADD_BOARD";
export const RECEIVE_BOARDS = "RECEIVE_BOARDS";

export const fetchBoards = () => dispatch => (
  BoardsAPI.fetchBoards()
    .then(boards)
)

export const setCurrentBoardId = currentBoardId => ({
  type: SET_CURRENT_BOARD_ID,
  currentBoardId
})

export const addBoard = (board) => ({
  type: ADD_BOARD,
  board
});

export const receiveBoards = boards => ({
  type: RECEIVE_BOARDS,
  boards
});
