import { ADD_INVITE } from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject } from './util';

const initialState = {
  byId: {}
}

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.invites);
    case ADD_INVITE:
      return updateObject(state, byIdObject(action.invite.id, action.invite));
    default:
      return state;
  }
}

export default invitesReducer;
