import * as BoardAPI from '../util/board_api';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const createMessage = message => dispatch => (
  BoardAPI.createMessage(message).then(
    message => {
      return message;
    },
    error => error.responseJSON
  )
)

export const requestMessages = (channelId, page) => dispatch => (
  BoardAPI.requestMessages(channelId, page).then(
    messages => {
      console.log(messages);
      dispatch(receiveMessages(messages));
      return messages;
    },
    error => {
      console.log(error)
      return error;
    }
  )
)
export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})
