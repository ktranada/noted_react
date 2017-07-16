import {
  ADD_INVITE,
  ADD_MEMBER,
  ADD_INVITES,
  REMOVE_INVITE,
  REMOVE_MEMBER,
  REMOVE_BOARD,
  RECEIVE_INVITE_ERRORS
} from '../actions/board_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { updateObject, byIdObject, deleteObjectById, removeObjectsByBoard } from './util';

const initialState = {
  byId: {}
}

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      if (!action.board.info.owner) return state;
      return updateObject(state, action.board.invites);
    case ADD_INVITES: return updateObject(state, { byId: action.invites.byId });
    case ADD_INVITE: return updateObject(state, byIdObject(action.invite.id, action.invite));
    case ADD_MEMBER: return updateObject(state, byIdObject(action.membership.invite_id, { status: 'accepted' }))
    case REMOVE_INVITE: return deleteObjectById(state, action.invite.id);
    case REMOVE_MEMBER: return deleteObjectById(state, action.membership.invite_id);
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.invites)
    default:
      return state;
  }
}

export default invitesReducer;
