import merge from 'lodash/merge';
import { RECEIVE_BOARD_MEMBERS } from '../actions/sub_nav_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { ADD_MEMBER, REMOVE_MEMBER, REMOVE_BOARD, UPDATE_USERNAME, RECEIVE_USERNAME_ERRORS } from '../actions/board_actions';
import { updateAssociationList, byIdObject, updateObject } from './util';
import { asArrayByOrder } from './selectors';

const initialState = {
  byId: {},
  errors: []
}

// {
//   byId: {
//     1: {
//       id: 1
//       usernamesByBoardId: {
//         1: "giraffage"
//       },
//       membershipsByBoardId: {
//          1: 1
//        }
//     }
//   }
// }

const addMember = (state, action) => {
  const { user_id, board_id, membership_id, username } = action.membership;
  const newState = merge({}, state);
  newState.byId[user_id] = {
    id: user_id,
    usernamesByBoardId: {
      [board_id]: username
    },
    membershipsByBoardId: {
      [board_id]: membership_id
    }
  }
  return newState;
}

const updateUsername = (state, action) => {
  const { membership } = action;
  const member = state.byId[membership.user_id];
  if (typeof member === 'undefined') {
    return state;
  }

  member.usernamesByBoardId[membership.board_id] = membership.username;
  return updateObject(state, byIdObject(membership.user_id, member));
}

const removeMember = (state, action) => {
  const { membership } = action;
  const member = state.byId[membership.user_id];

  if (member === undefined) {
    return state;
  }

  const newState = merge({}, state)

  delete member.membershipsByBoardId[membership.board_id]

  if (Object.keys(member.membershipsByBoardId).length === 0) {
    delete newState.byId[membership.user_id]
  }

  return newState;
}

const removeBoard = (state, action) => {
  const members = state.byId;
  const boardId = action.board.id;
  const newState = merge({}, members);

  action.board.members.forEach(memberId => {
    let member = members[memberId];
    delete member.membershipsByBoardId[boardId]

    if (Object.keys(member.membershipsByBoardId).length == 0) {
      // remove member entirely
      delete newState[memberId]
    } else {
      // update member membership list
      newState[memberId] = member;
    }
  })

  return ({ byId: newState });
}

const membersReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      return merge({}, state, action.board.members);
    case RECEIVE_BOARD_MEMBERS:
      return merge({}, initialState, action.members);
    case ADD_MEMBER: return addMember(state, action);
    case UPDATE_USERNAME:
      return updateUsername(state, action);
    case REMOVE_MEMBER:
      return removeMember(state, action);
    case REMOVE_BOARD:
      return removeBoard(state, action);
    default:
      return state;
  }
}

export default membersReducer;
