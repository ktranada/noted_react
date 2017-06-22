import * as BoardAPI from '../util/board_api';

export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const EDIT_INVITES = 'EDIT_INVITES';
export const ADD_INVITE = 'ADD_INVITE';
export const ADD_INVITES = 'ADD_INVITES';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const RECEIVE_INVITE_ERRORS = 'RECEIVE_INVITE_ERRORS';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_INVITE = 'REMOVE_INVITE';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';

export const createList = list => dispatch => (
  BoardAPI.createList(list)
    .then(list => {
      dispatch(addList(list));
      return list;
    })
);

export const createCard = card => dispatch => (
  BoardAPI.createCard(card)
    .then(card => {
      dispatch(addCard(card));
      return card;
    })
)

export const createComment = comment => dispatch => (
  BoardAPI.createComment(comment)
    .then(comment => {
      dispatch(addComment(comment));
      return comment;
    })
)

export const createInvites = invites => dispatch => (
  BoardAPI.createInvites(JSON.stringify(invites))
    .then(invites => {
      if (invites.byId) {
        dispatch(addInvites(invites));
      }
      return invites;
    })
)

export const editBoard = board => dispatch => (
  BoardAPI.updateBoard(board)
    .then(board => {
      dispatch(updateBoard(board));
      return board;
    })
)

export const editCard = card => dispatch => (
  BoardAPI.updateCard(card)
    .then(card => {
      dispatch(updateCard(card));
      return card;
    })
)

export const destroyBoard = boardId => dispatch => (
  BoardAPI.destroyBoard(boardId)
    .then((board) => {
      return dispatch(removeBoard(board));
    })
);


export const destroyCard = cardId => dispatch => (
  BoardAPI.destroyCard(cardId)
    .then((card) => {
      return dispatch(removeCard(card));
    })
);

export const destroyMembership = membershipId => dispatch => (
  BoardAPI.destroyMembership(membershipId)
    .then(membership => {
      dispatch(removeMember(membership));
      return membership;
    })
)

export const destroyInvite = inviteId => dispatch => (
  BoardAPI.destroyInvite(inviteId)
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

export const updateBoard = board => ({
  type: UPDATE_BOARD,
  board
});

export const updateCard = card => ({
  type: UPDATE_CARD,
  card
});

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
