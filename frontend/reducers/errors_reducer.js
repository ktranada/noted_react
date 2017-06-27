import {
  RECEIVE_USERNAME_ERRORS
} from '../actions/board_actions';
import { updateObject, byIdObject, deleteObjectById, removeObjectsByBoard } from './util';

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD: return updateObject(state, action.board.invites);
    case ADD_INVITES: return updateObject(state, { byId: action.invites.byId });
    case ADD_INVITE: return updateObject(state, byIdObject(action.invite.id, action.invite));
    case REMOVE_INVITE: return deleteObjectById(state, action.invite.id);
    case REMOVE_MEMBER: return deleteObjectById(state, action.membership.invite_id);
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.invites)
    default:
      return state;
  }
}

export default invitesReducer;
