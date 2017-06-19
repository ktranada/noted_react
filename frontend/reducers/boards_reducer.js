import merge from 'lodash/merge';
import { byIdObject, updateObject, updateAssociationList } from './util';
import {
  START_LOADING_BOARD,
  ADD_BOARD,
  RECEIVE_BOARDS,
  RECEIVE_BOARD,
} from '../actions/nav_actions';

import {
  ADD_LIST,
  ADD_INVITE
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

function addInvite(state, action) {
  return updateAssociationList(
    state,
    action.invite.board_id,
    'invites',
    action.invite.id
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


const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_BOARD: return startLoadingBoard(state, action);
    case ADD_BOARD: return addBoard(state, action);
    case ADD_LIST: return addList(state, action);
    case ADD_INVITE: return addInvite(state, action);
    case RECEIVE_BOARD: return receiveBoard(state, action);
    case RECEIVE_BOARDS:
      return merge({}, state, {
        byId: action.boards.byId,
        order: action.boards.order,
        errors: []
      });
    // case RECEIVE_ERRORS:
    //   return merge({}, state, {
    //     errors: action.errors
    //   })

    default:
      return state;
  }
}

export default boardsReducer;
