import * as BoardAPI from '../util/board_api';

export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const createList = list => dispatch => (
  BoardAPI.createList(list)
    .then(list => {
      dispatch(addList(list));
      return list;
    })
);

export const addList = list => ({
  type: ADD_LIST,
  list
});
