import { TOGGLE_MODAL } from '../actions/modal_actions';

const initialState = null

const modalsReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_MODAL:
      return action.modal;
    default:
      return state;
  }
}

export default modalsReducer;
