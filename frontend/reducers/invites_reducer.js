import {
  ADD_INVITE,
  ADD_INVITES,
  REMOVE_INVITE,
  REMOVE_MEMBER,
  RECEIVE_INVITE_ERRORS
} from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, deleteObjectById } from './util';

const initialState = {
  byId: {}
}

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD: return updateObject(state, action.board.invites);
    case ADD_INVITES: return updateObject(state, { byId: action.invites });
    case ADD_INVITE: return updateObject(state, byIdObject(action.invite.id, action.invite));
    case REMOVE_INVITE: return deleteObjectById(state, action.invite.id);
    case REMOVE_MEMBER: return deleteObjectById(state, action.membership.invite_id);
    default:
      return state;
  }
}

export default invitesReducer;
