import merge from 'lodash/merge';
import { ADD_MESSAGE } from '../actions/chat_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { NOTIFICATION_MESSAGES, NOTIFICATION_INCREMENT_MESSAGES } from '../actions/notification_actions';
import { updateObject, removeObjectsByBoard, updateAssociationList } from './util';

const initialState = {
  byId: {},
}

const receiveBoard = (state, action) => {
  const { board: { channels } } = action;
  const preservedUnreadStates = {
    byId: {}
  }
  // Temporary until notifications are persisted in the db
  Object.keys(channels.byId).forEach((id) => {
    let channel = state.byId[id];
    if (channel !== undefined) {
      preservedUnreadStates.byId[id] = {
        unread_messages: channel.unread_messages
      }
    }
  })

  console.log(preservedUnreadStates)
  return merge({}, state, action.board.channels, preservedUnreadStates);
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return receiveBoard(state, action);
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.channels);
    case ADD_MESSAGE:
      return updateAssociationList(state, action.message.channel_id, 'messages', action.message.id, {prepend: true});
    case NOTIFICATION_MESSAGES:
      if (state.byId[action.notification.channel_id]) {
        const newState = merge({}, state);
        newState.byId[action.notification.channel_id].unread_messages = action.notification.unread_messages;
        return newState;
      }
      return state;
    case NOTIFICATION_INCREMENT_MESSAGES:
      if (state.byId[action.notification.channel_id]) {
        const newState = merge({}, state);
        newState.byId[action.notification.channel_id].unread_messages += 1;
        return newState;
      } else if (action.notification.isLoaded === false) {
        const newState = merge({}, state);
        newState.byId[action.notification.channel_id] = {
          unread_messages: 1
        }
        return newState;
      }
      return state;

    default:
      return state;
  }
}


export default channelsReducer;
