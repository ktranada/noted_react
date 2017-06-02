import merge from 'lodash/merge';
import { SET_CURRENT_BOARD, ADD_BOARD, ADD_BOARDS } from '../actions/board_actions';

const initialState = {
  currentBoard: null,
  boards: []
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD:
      return merge({}, state, {
        currentBoard: action.currentBoard
      });
    case ADD_BOARD:
      return merge({}, state, {
        currentBoard: action.board,
        boards: [...state.boards, action.board]
      });

    case ADD_BOARDS:
      return merge({}, state, {
        currentBoard: action.boards[0],
        boards: [...state.boards, ...action.boards]
      });
    default:
      return state;
  }
}

export default boardsReducer;
