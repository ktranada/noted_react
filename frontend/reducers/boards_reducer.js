import merge from 'lodash/merge';
import { byIdObject, updateObject, updateAssociationList } from './util';
import { RECEIVE_BOARDS, UPDATE_TIME_ZONE } from '../actions/session_actions';
import {
  ADD_BOARD,
  RECEIVE_BOARD,
} from '../actions/nav_actions';

import {
  RECEIVE_LISTS,
  ADD_LIST,
  ADD_INVITES,
  ADD_MEMBER,
  REMOVE_INVITE,
  REMOVE_MEMBER,
  UPDATE_BOARD,
  REMOVE_BOARD,
} from '../actions/board_actions';
import { RECEIVE_MESSAGES } from '../actions/chat_actions';
import { MOVE_LIST, UPDATE_LIST_ORDER } from '../actions/list_actions';

const initialState = {
  byId: {},
  order: [],
  errors: []
};

// byId: {
//   '1': {
//     id: 1,
//     isLoaded: fa]lse,
//     has_loaded_lists: false,
//     owner: false,
//     channels: [],
//     members: [],
//     subscriptions: [],
//     lists: [],
//     cards: [],
//     invites: [],
//     ord: 0,
//     title: 'React'
//   }
// }

const receiveBoard = (state, action) => {
  const newState = updateObject({}, state, { errors: [] });
  newState.byId[action.board.id] = action.board.info;
  if (action.isJoining) {
    newState.order = [...newState.order, action.board.id];
  }
  return newState;
}

const receiveLists = (state, action) => {
  const { list_ids, board_id } = action.lists;
  if (state.byId[board_id]) {
    const newState = merge({}, state, byIdObject(board_id, {
      lists: list_ids,
      has_loaded_lists: true
    }));
    return newState;
  }
  return state;
}

const addBoard = (state, action) => {
  let newState = {
    byId: {
      [action.board.id]: action.board
    },
    order: [...state.order, action.board.id],
    errors: []
  };
  return updateObject(state, newState);
}

const addInvites = (state, action) => {
  return updateAssociationList(
    state,
    action.invites.board_id,
    'invites',
    action.invites.ids
  )
}

const addList = (state, action) => {
  return updateAssociationList(
    state,
    action.list.board_id,
    'lists',
    action.list.id
  );
}

const addMember = (state, action) => {
  return updateAssociationList(
    state,
    action.membership.board_id,
    'members',
    action.membership.user_id
  )
}

const moveList = (state, action) => {
  let board = state.byId[action.boardId];
  if (board) {
    const { lastPos, nextPos } = action;
    const updatedListOrder = [...board.lists];
    const listId = updatedListOrder.splice(lastPos, 1)[0];

    updatedListOrder.splice(nextPos, 0, listId);
    board.lists = updatedListOrder;
    return updateObject(state, byIdObject(action.boardId, { lists: updatedListOrder }));
  } else {
    return state;
  }
}

const updateListOrder = (state, action) => {
  const { lists, board_id } = action.lists;
  let board = state.byId[board_id];
  if (board && lists) {
    const newState = merge({}, board);
    newState.lists = lists;
    return byIdObject(board_id, newState);
  }
  return state;
}

const updateBoard = (state, { board }) => {
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
  if (membership.isSelf && state.byId[membership.board_id] && !state.byId[membership.board_id].owner) {
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

const updateTimeZone = (state, action) => {
  const newState = merge({}, state);
  Object.keys(newState.byId).forEach(id => {
    const board = newState.byId[id];
    board.isLoaded = false;
  })

  return newState;
}

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD: return receiveBoard(state, action);
    case RECEIVE_BOARDS:
      return merge({}, initialState, {
        byId: action.boards.byId,
        order: action.boards.order,
        errors: []
      });

    case RECEIVE_LISTS: return receiveLists(state, action);
    case ADD_BOARD: return addBoard(state, action);
    case ADD_MEMBER: return addMember(state, action);
    case ADD_LIST: return addList(state, action);
    case ADD_INVITES: return addInvites(state, action);
    case MOVE_LIST: return moveList(state, action);
    case UPDATE_BOARD: return updateBoard(state, action);
    case REMOVE_INVITE: return removeInvite(state, action);
    case UPDATE_TIME_ZONE: return updateTimeZone(state, action);
    case REMOVE_MEMBER: return removeMember(state, action);
    case REMOVE_BOARD: return removeBoard(state, action);

    default:
      return state;
  }
}

export default boardsReducer;
