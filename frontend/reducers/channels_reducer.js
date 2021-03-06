import merge from 'lodash/merge';
import { ADD_MESSAGE, RECEIVE_MESSAGES } from '../actions/chat_actions';
import { RECEIVE_BOARD, ADD_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { SET_UNREAD_MESSAGE_COUNT, INCREMENT_UNREAD_MESSAGE_COUNT } from '../actions/notification_actions';
import { updateObject, removeObjectsByBoard, updateAssociationList } from './util';

const initialState = {
  byId: {},
}

const receiveBoard = (state, action) => {
  const { board: { channels } } = action;
  const preservedUnreadStates = {
    byId: {}
  }

  const newState = merge({}, state, action.board.channels);

  // Temporary until notifications are persisted in the db
  Object.keys(channels.byId).forEach((id) => {
    let channel = state.byId[id];
    if (channel !== undefined) {
      const newChannel = newState.byId[id];
      newChannel.latest = channel.latest;
      newChannel.unread_messages = channel.unread_messages;
      newChannel.messages = channels.byId[id].messages;
    }
  })

  // const newState = merge({}, state, action.board.channels, preservedUnreadStates);


  return newState;;
}

const receiveMessages = (state, { messages: { channel_id, channel_messages, has_more, latest } }) => {

  if (state.byId[channel_id]) {
    const newState = merge({}, state);
    const channel = newState.byId[channel_id];
    channel.has_more = has_more;
    channel.messages = [...channel.messages, ...channel_messages];
    channel.has_loaded_messages = true;
    channel.latest = latest;
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
  const { notification } = action;
  let newState;
  if (state.byId[notification.channel_id]) {
    newState = merge({}, state);
    newState.byId[notification.channel_id].unread_messages += 1;
    return newState;
  } else if (notification.isLoaded === false) {
    newState = merge({}, state);
    newState.byId[notification.channel_id] = {
      unread_messages: 1
    }
    return newState;
  } else if (notification.is_nav_notification) {
    newState = merge({}, state);
    newState.byId[notification.channel_id] =  {
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
    case ADD_BOARD: return updateObject(state, action.board.channels);
    case ADD_MESSAGE: return updateAssociationList(state, action.message.channel_id, 'messages', action.message.id, {prepend: true});
    case SET_UNREAD_MESSAGE_COUNT: return setMessageNotification(state, action);
    case INCREMENT_UNREAD_MESSAGE_COUNT: return incrementMessageNotifications(state, action);
    case REMOVE_BOARD: return removeObjectsByBoard(state, action.board.channels);
    default:
      return state;
  }
}


export default channelsReducer;
