import merge from 'lodash/merge';
import { SET_CURRENT_BOARD_ID, ADD_BOARD, ADD_BOARDS } from '../actions/board_index_actions';

const initialState = {
  currentBoardId: null,
  index: []
};

const boardIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD_ID:
      return merge({}, state, {
        currentBoardId: action.currentBoardId
      });
    case ADD_BOARD:
      return merge({}, state, {
        currentBoardId: action.board,
        index: [...state.index, action.board]
      });

    case ADD_BOARDS:
      return merge({}, state, {
        currentBoardId: action.boards[0],
        index: [...state.index, ...action.boards]
      });
    default:
      return state;
  }
}

export default boardIndexReducer;
