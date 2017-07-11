import merge from 'lodash/merge';
import { ADD_MESSAGE } from '../actions/chat_actions';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard, updateAssociationList } from './util';

const initialState = {
  byId: {},
}

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.channels);
    case REMOVE_BOARD:
      return removeObjectsByBoard(state, action.board.channels);
    case ADD_MESSAGE:
      return updateAssociationList(state, action.message.channel_id, 'messages', action.message.id);

    default:
      return state;
  }
}


export default channelsReducer;
