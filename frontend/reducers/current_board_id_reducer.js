import { SET_CURRENT_BOARD_ID } from '../actions/nav_actions';

const currentBoardIdReducer = (state = null, action) => {
  switch(action.type) {
    case SET_CURRENT_BOARD_ID:
      return action.id;
    default:
      return state;
  }
}

export default currentBoardIdReducer;
