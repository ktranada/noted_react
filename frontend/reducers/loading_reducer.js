import merge from 'lodash/merge';

import { deleteObjectById } from './util';
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
//     loadingMessages: false,
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
    case START_LOADING_BOARD: return updateLoader(state, 'loadingBoard', action.board.id, true);
    case START_LOADING_LISTS: return updateLoader(state, 'loadingLists', action.board_id, true);
    case START_LOADING_MESSAGES: return updateLoader(state, 'loadingMessages', action.channel_id, true, true);
    case START_UPDATING_TIMEZONE: return merge({}, state, { isUpdatingTimezone: true});
    case RECEIVE_BOARD:
      const { id, subscriptions} = action.board;
      newState = merge({}, state);
      newState.byBoardId[id]['loadingBoard'] = false;
      subscriptions.channelsByBoardId[id]
        .forEach(sub => newState.byChannelId[sub] = { loadingMessages: false })
      return newState;

    case RECEIVE_BOARDS:
      return merge({}, state, action.boards.loading);


    case RECEIVE_LISTS: return updateLoader(state, 'loadingLists', action.lists.board_id, false);
    case RECEIVE_MESSAGES: return updateLoader(state, 'loadingMessages', action.messages.channel_id, false, true);
    case ADD_BOARD:
      newState = merge({}, state, {
        byBoardId: {
          [action.board.id]: {
            loadingBoard: false,
            loadingLists: false
          }
        }
      });
      return newState;
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
