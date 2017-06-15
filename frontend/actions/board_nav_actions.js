import * as BoardAPI from '../util/board_api';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_BOARD_MEMBERS = "RECEIVE_BOARD_MEMBERS";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";
export const START_LOADING_CHANNELS = "START_LOADING_CHANNELS";
export const START_LOADING_MEMBERS = "START_LOADING_MEMBERS";

export const requestChannels = boardId => dispatch => {
  // dispatch(startLoadingChannels());
  return BoardAPI.requestChannels(boardId)
    .then(channels => dispatch(receiveChannels(channels)))
}

export const requestBoardMembers = boardId => dispatch => {
  // dispatch(startLoadingMembers());
  return BoardAPI.requestBoardMembers(boardId)
    .then(boardMembers => dispatch(receiveBoardMembers(boardMembers)));
}

export const receiveBoardMembers = members => ({
  type: RECEIVE_BOARD_MEMBERS,
  members
});

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const setCurrentView = (view) => ({
  type: SET_CURRENT_VIEW,
  view
});

export const startLoadingChannels = () => ({
  type: START_LOADING_CHANNELS
});

export const startLoadingMembers = () => ({
  type: START_LOADING_MEMBERS
});
