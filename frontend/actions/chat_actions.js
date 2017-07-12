import * as BoardAPI from '../util/board_api';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const createMessage = message => dispatch => (
  BoardAPI.createMessage(message).then(
    message => {
      return message;
    },
    error => error.responseJSON
  )
)

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})
