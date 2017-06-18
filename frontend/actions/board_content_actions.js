import * as BoardAPI from '../util/board_api';

export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const EDIT_CARD_INFO = 'EDIT_CARD_INFO';

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

export const editCard = card => dispatch => (
  BoardAPI.editCard(card)
    .then(card => {
      dispatch(editCardInfo(card));
      return card;
    })
)

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
