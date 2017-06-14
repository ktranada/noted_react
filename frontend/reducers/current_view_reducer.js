import { SET_CURRENT_VIEW } from '../actions/board_nav_actions';

const initialState = "BOARD";

const currentViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      return action.view
    default:
      return state;
  }
}

export default currentViewReducer;
