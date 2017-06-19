
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const ADD_BOARD = 'ADD_BOARD';
export const VIEW_CARD = 'VIEW_CARD';
export const BOARD_SETTINGS = 'BOARD_SETTINGS';
export const INVITE_PEOPLE = 'INVITE_PEOPLE';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  modal
});

export const viewCard = cardId => ({
  type: TOGGLE_MODAL,
  modal: VIEW_CARD,
  cardId
})
