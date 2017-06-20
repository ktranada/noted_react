import * as BoardAPI from '../util/board_api';

export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const EDIT_INVITES = 'EDIT_INVITES';
export const ADD_INVITE = 'ADD_INVITE';
export const ADD_INVITES = 'ADD_INVITES';
export const EDIT_CARD_INFO = 'EDIT_CARD_INFO';
export const RECEIVE_INVITE_ERRORS = 'RECEIVE_INVITE_ERRORS';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_INVITE = 'REMOVE_INVITE';

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

export const createInvite = boardId => dispatch => (
  BoardAPI.createInvite(boardId)
    .then(invite => {
      dispatch(addInvite(invite));
      return invite;
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

export const destroyInvite = inviteId => dispatch => (
  BoardAPI.destroyInvite(inviteId)
    .then((invite) => dispatch(removeInvite(invite)))
)

export const deleteCard = cardId => dispatch => (
  BoardAPI.deleteCard(cardId)
    .then((card) => {
      return dispatch(removeCard(card));
    })
)

export const editCard = card => dispatch => (
  BoardAPI.editCard(card)
    .then(card => {
      dispatch(editCardInfo(card));
      return card;
    })
)

export const addInvites = invites => ({
  type: ADD_INVITES,
  invites
})
export const addInvite = invite => ({
  type: ADD_INVITE,
  invite
})

export const receiveInviteErrors = errors => ({
  type: RECEIVE_INVITE_ERRORS,
  errors
})

export const removeInvite = invite => ({
  type: REMOVE_INVITE,
  invite
});

export const addList = list => ({
  type: ADD_LIST,
  list
});

export const addCard = card => ({
  type: ADD_CARD,
  card
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const editCardInfo = card => ({
  type: EDIT_CARD_INFO,
  card
})

export const removeCard = card => ({
  type: REMOVE_CARD,
  card
})
