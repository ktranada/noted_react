import merge from 'lodash/merge';
import { RECEIVE_BOARD, START_LOADING_BOARD } from '../actions/board_toggler_actions';

const initialState = {
  byBoardId: {}
}
// byBoardId: {
//   1: {
//     loadingBoard: false
//   }
// }


function updateLoader(state, action, status) {
  return merge({}, state, {
    byBoardId: {
      [action.board.id]: {
        loadingBoard: status
      }
    }
  })
}

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateLoader(state, action, false);
    case START_LOADING_BOARD:
      return updateLoader(state, action, true)
    default:
      return state;
  }
}

export default loadingReducer;
