import { ADD_INVITE, REMOVE_INVITE, ADD_INVITES, RECEIVE_INVITE_ERRORS } from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, deleteObjectById } from './util';

const initialState = {
  byId: {}
}

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.invites);
    case ADD_INVITES:
      let { byId } = action.invites;
      return updateObject(state, { byId });
    case ADD_INVITE:
      return updateObject(state, byIdObject(action.invite.id, action.invite));
    case REMOVE_INVITE:
      return deleteObjectById(state, action.invite.id);
    default:
      return state;
  }
}

export default invitesReducer;
