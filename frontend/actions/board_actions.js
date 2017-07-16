import * as BoardAPI from '../util/board_api';
export const START_LOADING_LISTS = 'START_LOADING_LISTS'
export const RECEIVE_USERNAME_ERRORS = 'RECEIVE_USERNAME_ERRORS';
export const RECEIVE_INVITE_ERRORS = 'RECEIVE_INVITE_ERRORS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const EDIT_INVITES = 'EDIT_INVITES';
export const ADD_INVITE = 'ADD_INVITE';
export const ADD_INVITES = 'ADD_INVITES';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const UPDATE_BOARD_VIEW_STATUS = 'UPDATE_BOARD_VIEW_STATUS';
export const UPDATE_BOARD_EXTERNAL_EDIT_STATUS = 'UPDATE_BOARD_EXTERNAL_EDIT_STATUS';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_INVITE = 'REMOVE_INVITE';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';



export const requestLists  = (board_id) => dispatch => {
  dispatch(startLoadingLists(board_id));
  return BoardAPI.requestLists(board_id).then(
    result => {
      dispatch(receiveLists(result));
    }
  )
}

export const receiveLists = lists => ({
  type: RECEIVE_LISTS,
  lists
})

export const startLoadingLists = board_id => ({
  type: START_LOADING_LISTS,
  board_id
})

export const createList = (board_id, list) => dispatch => (
  BoardAPI.createList(board_id, list)
    .then(list => {
      dispatch(addList(list));
      return list;
    })
);

export const createCard = (board_id, card) => dispatch => (
  BoardAPI.createCard(board_id, card)
    .then(card => {
      dispatch(addCard(card));
      return card;
    })
)

export const createComment = (board_id, comment) => dispatch => (
  BoardAPI.createComment(board_id, comment)
    .then(comment => {
      dispatch(addComment(comment));
      return comment;
    })
)

export const createInvites = (board_id, invites) => dispatch => (
  BoardAPI.createInvites(board_id, JSON.stringify(invites))
    .then(invites => {
      if (invites.byId) {
        dispatch(addInvites(invites));
      }
      return invites;
    })
)

export const editBoard = (board_id, board) => dispatch => (
  BoardAPI.updateBoard(board_id, board)
    .then(board => {
      dispatch(updateBoard(board));
      return board;
    })
)

export const editCard = (board_id, card) => dispatch => (
  BoardAPI.updateCard(board_id, card)
    .then(card => {
      dispatch(updateCard(card));
      return card;
    })
)

export const editMembership = (board_id, membership) => dispatch => (
  BoardAPI.updateMembership(board_id, membership).then(
    membership => {
      // dispatch(updateUsername(membership));
      return membership;
    },
    errors => errors.responseJSON.username
))

export const destroyBoard = boardId => dispatch => (
  BoardAPI.destroyBoard(boardId)
    .then((board) => {
      dispatch(removeBoard(board));
      return board;
    })
);


export const destroyCard = (board_id, cardId) => dispatch => (
  BoardAPI.destroyCard(board_id, cardId)
    .then((card) => {
      return dispatch(removeCard(card));
    })
);

export const destroyMembership = (board_id, membershipId) => dispatch => (
  BoardAPI.destroyMembership(board_id, membershipId)
    .then(membership => {
      // dispatch(removeMember(membership));
      return membership;
    })
)

export const destroyInvite = (board_id, inviteId) => dispatch => (
  BoardAPI.destroyInvite(board_id, inviteId)
    .then(invite => {
      dispatch(removeInvite(invite));
      return invite;
    })
)


export const receiveInviteErrors = errors => ({
  type: RECEIVE_INVITE_ERRORS,
  errors
});

export const addInvites = invites => ({
  type: ADD_INVITES,
  invites
});

export const addList = list => ({
  type: ADD_LIST,
  list
});

export const addCard = card => ({
  type: ADD_CARD,
  card
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

export const addMember = membership => ({
  type: ADD_MEMBER,
  membership
});

export const updateBoard = board => ({
  type: UPDATE_BOARD,
  board
});

export const updateCard = card => ({
  type: UPDATE_CARD,
  card
});

export const updateUsername = membership => ({
  type: UPDATE_USERNAME,
  membership
})

export const removeBoard = board => ({
  type: REMOVE_BOARD,
  board
});

export const removeCard = card => ({
  type: REMOVE_CARD,
  card
});

export const removeInvite = invite => ({
  type: REMOVE_INVITE,
  invite
});

export const removeMember = membership => ({
  type: REMOVE_MEMBER,
  membership
})
