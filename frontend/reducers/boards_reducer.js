import merge from 'lodash/merge';
import { SET_CURRENT_BOARD_ID, ADD_BOARD, ADD_BOARDS } from '../actions/board_toggler_actions';

const initialState = {
  byId: null,
  order: []
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return merge({}, state, {
        byId: {
          [action.board.id]: action.board
        },
        order: [...state.order, action.board.id]
      });

    case ADD_BOARDS:
      return merge({}, state, {
        byId: action.boards.byId,
        order: action.boards.order
      });
    default:
      return state;
  }
}

export default boardsReducer;
