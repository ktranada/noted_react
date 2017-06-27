import merge from 'lodash/merge';
import { byIdObject, updateObject, updateAssociationList } from './util';
import { RECEIVE_BOARDS } from '../actions/session_actions';
import {
  ADD_BOARD,
  RECEIVE_BOARD,
} from '../actions/nav_actions';

import {
  ADD_LIST,
  ADD_INVITES,
  REMOVE_INVITE,
  REMOVE_MEMBER,
  UPDATE_BOARD,
  REMOVE_BOARD
} from '../actions/board_actions';

const initialState = {
  byId: {},
  order: [],
  errors: []
};

// byId: {
//   '1': {
//     id: 1,
//     isLoaded: false,
//     isLoading: false,
//     members: [],
//     channels: [],
//     lists: [],
//     cards: [],
//     invites: [],
//     ord: 0,
//     title: 'React'
//   }
// }

function startLoadingBoard(state, action) {
  const newState = byIdObject(action.board.id, {
    isLoading: true
  })
  return updateObject(state, newState);
}

function receiveBoard(state, action) {
  const { board } = action;
  const { members, channels, lists, invites } = board.info;
  const newState = byIdObject(board.id, {
    isLoaded: true,
    isLoading: false,
    members,
    channels,
    lists,
    invites
  })
  newState['errors'] = [];
  return updateObject(state, newState)
}

function addBoard(state, action) {
  let newState = {
    byId: {
      [action.board.id]: action.board
    },
    order: [...state.order, action.board.id],
    errors: []
  };
  return updateObject(state, newState);
}

function addInvites(state, action) {
  return updateAssociationList(
    state,
    action.invites.board_id,
    'invites',
    action.invites.ids
  );
}

function addList(state, action) {
  return updateAssociationList(
    state,
    action.list.board_id,
    'lists',
    action.list.id
  );
}

const updateBoard = (state, {board}) => {
  return updateObject(state, byIdObject(board.id, { title: board.title}));
}

const removeInvite = (state, action) => {
  return updateAssociationList(
    state,
    action.invite.board_id,
    'invites',
    action.invite.id,
    { remove: true});
}

const removeMember = (state, action) => {
  const { membership } = action;

  let newState;
  if (!state.byId[membership.board_id].owner) {
    newState = merge({}, state);
    delete newState.byId[membership.board_id];
    newState.order = newState.order.filter(id => id !== membership.board_id);
    return newState;
  }

  newState = updateAssociationList(
    state,
    membership.board_id,
    'members',
    membership.user_id,
    { remove: true });

  return updateAssociationList(
    newState,
    membership.board_id,
    'invites',
    membership.invite_id,
    { remove: true });
}

const removeBoard = (state, action) => {
  const newState = merge({}, state);
  const byId = newState.byId;
  const order = newState.order;

  if (byId[action.board.id]) {
    delete byId[action.board.id]
    newState.order = newState.order.filter(id => id != action.board.id);
  }

  return newState;
}


const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case START_LOADING_BOARD: return startLoadingBoard(state, action);
    case RECEIVE_BOARD: return receiveBoard(state, action);
    case RECEIVE_BOARDS:
      return merge({}, initialState, {
        byId: action.boards.byId,
        order: action.boards.order,
        errors: []
      });
    case ADD_BOARD: return addBoard(state, action);
    case ADD_LIST: return addList(state, action);
    case ADD_INVITES: return addInvites(state, action);
    case UPDATE_BOARD: return updateBoard(state, action);
    case REMOVE_INVITE: return removeInvite(state, action);
    case REMOVE_MEMBER: return removeMember(state, action);
    case REMOVE_BOARD: return removeBoard(state, action);
    default:
      return state;
  }
}

export default boardsReducer;
