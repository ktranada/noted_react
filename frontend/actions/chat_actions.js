import * as BoardAPI from '../util/board_api';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const START_LOADING_MESSAGES = 'START_LOADING_MESSAGES';

export const requestMessages = (board_id, channel_id, page) => dispatch => {
  if (page === 0) {
    dispatch(startLoadingMessages(channel_id))
  }
  return BoardAPI.requestMessages(board_id, channel_id, page).then(
    messages => {
      dispatch(receiveMessages(messages));
      return messages;
    },
    error => {
      return error;
    }
  )
}

export const startLoadingMessages = channel_id => ({
  type: START_LOADING_MESSAGES,
  channel_id
})
export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})
