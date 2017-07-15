import merge from 'lodash/merge';
import { RECEIVE_BOARD, START_LOADING_BOARD } from '../actions/nav_actions';
import { RECEIVE_LISTS, START_LOADING_LISTS } from '../actions/board_actions';

const initialState = {
  byBoardId: {}
}
// byBoardId: {
//   1: {
//     loadingBoard: false
//   }
// }


function updateLoader(state, type, board_id, status) {
  return merge({}, state, {
    byBoardId: {
      [board_id]: {
        [type]: status
      }
    }
  })
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_BOARD: return updateLoader(state, 'loadingBoard', action.board.id, true);
    case START_LOADING_LISTS: return updateLoader(state, 'loadingLists', action.board_id, true);
    case RECEIVE_BOARD: return updateLoader(state, 'loadingBoard', action.board.id, false);
    case RECEIVE_LISTS: return updateLoader(state, 'loadingLists', action.lists.board_id, false);

    default:
      return state;
  }
}

export default loadingReducer;
