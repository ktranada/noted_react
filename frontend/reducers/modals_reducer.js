import { TOGGLE_MODAL } from '../actions/modal_actions';
import { RECEIVE_BOARDS } from '../actions/session_actions';
import { RECEIVE_BOARD, ADD_BOARD, START_LOADING_BOARD} from '../actions/nav_actions';
const initialState = null;

const modalsReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_MODAL:
      return action.modal;

    case START_LOADING_BOARD:
    case RECEIVE_BOARD:
    case RECEIVE_BOARDS:
    case ADD_BOARD:
      return initialState;
    default:
      return state;
  }
}

export default modalsReducer;
