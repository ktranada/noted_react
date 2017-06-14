import * as BoardAPI from '../util/board_api';

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_BOARD_MEMBERS = "RECEIVE_BOARD_MEMBERS";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";
export const START_LOADING_CONVERSATIONS = "START_LOADING_CONVERSATIONS";
export const START_LOADING_MEMBERS = "START_LOADING_MEMBERS";


export const requestConversations = boardId => dispatch => {
  // dispatch(startLoadingConversations());
  return BoardAPI.requestConversations(boardId)
    .then(conversations => dispatch(receiveConversations(conversations)))
}

export const requestBoardMembers = boardId => dispatch => {
  dispatch(startLoadingMembers());
  return BoardAPI.requestBoardMembers()
    .then(boardMembers => dispatch(receiveBoardMembers(boardMembers)));
}

export const receiveBoardMembers = boardMembers => ({
  type: RECEIVE_BOARD_MEMBERS,
  boardMembers
});

export const receiveConversations = conversations => ({
  type: RECEIVE_CONVERSATIONS,
  conversations
});

export const setCurrentView = (view) => ({
  type: SET_CURRENT_VIEW,
  view
});

export const startLoadingConversations = () => ({
  type: START_LOADING_CONVERSATIONS
});

export const startLoadingMembers = () => ({
  type: START_LOADING_MEMBERS
});
