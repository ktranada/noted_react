import merge from 'lodash/merge';
import { SET_CURRENT_BOARD_ID, ADD_BOARD, RECEIVE_BOARDS } from '../actions/board_toggler_actions';

const initialState = {
  byId: null,
  order: [],
  errors: []
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return merge({}, state, {
        byId: {
          [action.board.id]: action.board
        },
        order: [...state.order, action.board.id],
        errors: []
      });

    case RECEIVE_BOARDS:
      return merge({}, state, {
        byId: action.boards.byId,
        order: action.boards.order,
        errors: []
      });
    // case RECEIVE_ERRORS:
    //   return merge({}, state, {
    //     errors: action.errors
    //   })
    default:
      return state;
  }
}

export default boardsReducer;
