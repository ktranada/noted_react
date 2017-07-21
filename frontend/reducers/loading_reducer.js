import merge from 'lodash/merge';

import { updateObject, deleteObjectById } from './util';
import { RECEIVE_BOARD, START_LOADING_BOARD, ADD_BOARD } from '../actions/nav_actions';
import { RECEIVE_BOARDS, START_UPDATING_TIMEZONE, UPDATE_TIMEZONE } from '../actions/session_actions';
import { RECEIVE_LISTS, START_LOADING_LISTS, REMOVE_BOARD } from '../actions/board_actions';
import { RECEIVE_MESSAGES, START_LOADING_MESSAGES } from '../actions/chat_actions';

const initialState = {
  byBoardId: {},
  byChannelId: {},
  isUpdatingTimezone: false
}
// byBoardId: {
//   1: {
//     loadingBoard: false,
//     loadingLists: false,
//   }
// },
// byChannelId: {
//   1: {
//     loading_messages: false,
//   }
// },


function updateLoader(state, type, id, status, isChannel = false) {
  return merge({}, state, {
    [isChannel ? 'byChannelId' : 'byBoardId']: {
      [id]: {
        [type]: status
      }
    }
  })
}

const loadingReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case START_LOADING_BOARD: return updateLoader(state, 'loading_board', action.board.id, true);
    case START_LOADING_LISTS: return updateLoader(state, 'loading_lists', action.board_id, true);
    case START_LOADING_MESSAGES: return updateLoader(state, 'loading_messages', action.channel_id, true, true);
    case START_UPDATING_TIMEZONE: return merge({}, state, { isUpdatingTimezone: true});
    case RECEIVE_BOARD:
      const { id, subscriptions} = action.board;
      newState = merge({}, state);
      newState.byBoardId[id]['loading_board'] = false;
      subscriptions.channelsByBoardId[id]
        .forEach(sub => newState.byChannelId[sub] = { loading_messages: false })
      return newState;

    case RECEIVE_BOARDS:
      return merge({}, state, action.boards.loading);


    case RECEIVE_LISTS: return updateLoader(state, 'loading_lists', action.lists.board_id, false);
    case RECEIVE_MESSAGES: return updateLoader(state, 'loading_messages', action.messages.channel_id, false, true);
    case ADD_BOARD: return updateObject(state, action.board.loading);
    case REMOVE_BOARD:
      let newState = newState = merge({}, state);
      delete newState.byBoardId[action.board.id]

      action.board.channels.forEach(channel => {
        delete newState.byChannelId[channel];
      })
      return newState;

    case UPDATE_TIMEZONE:
      return merge({}, state, { isUpdatingTimezone: false });

    default:
      return state;
  }
}

export default loadingReducer;
