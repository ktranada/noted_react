import merge from 'lodash/merge';
import { ADD_MESSAGE, RECEIVE_MESSAGES } from '../actions/chat_actions';
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

  return merge({}, state, action.board.channels, preservedUnreadStates);
}

const receiveMessages = (state, { messages: { channel_id, channel_messages, has_more } }) => {

  if (state.byId[channel_id]) {
    const newState = merge({}, state);
    const channel = newState.byId[channel_id];
    channel.has_more = has_more;
    channel.messages = [...channel.messages, ...channel_messages];
    return newState;
  }
  return state;
}

const setMessageNotification = (state, action) => {
  if (state.byId[action.notification.channel_id]) {
    const newState = merge({}, state);
    newState.byId[action.notification.channel_id].unread_messages = action.notification.unread_messages;
    return newState;
  }
  return state;
}

const incrementMessageNotifications = (state, action) => {
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
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD: return receiveBoard(state, action);
    case RECEIVE_MESSAGES: return receiveMessages(state, action);
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.channels);
    case ADD_MESSAGE: return updateAssociationList(state, action.message.channel_id, 'messages', action.message.id, {prepend: true});
    case NOTIFICATION_MESSAGES: return setMessageNotification(state, action);
    case NOTIFICATION_INCREMENT_MESSAGES: return incrementMessageNotifications(state, action);
    default:
      return state;
  }
}


export default channelsReducer;
