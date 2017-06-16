import merge from 'lodash/merge';
import {
  SET_CURRENT_BOARD_ID,
  ADD_BOARD,
  RECEIVE_BOARDS,
  RECEIVE_BOARD,
  START_LOADING_BOARD
} from '../actions/board_toggler_actions';

const initialState = {
  byId: null,
  order: [],
  errors: []
};

// byId: {
//   '1': {
//     id: 1,
//     isLoaded: false,
//     isLoading: false,
//     members: [],
//     channels: [],
//     lists: [],
//     cards: [],
//     ord: 0,
//     title: 'React'
//   }
// }

function updateObject(state, newState) {
  return merge({}, state, newState);
}

function receiveBoard(state, action) {
  const { board } = action;
  const { members, channels, lists } = board.info;
  return updateObject(state, {
    byId: {
      [board.id]: {
        isLoaded: true,
        isLoading: false,
        members,
        channels,
        lists
      }
    }
  })
}

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_BOARD:
      return merge({}, state, {
        byId: {
          [action.board.id]: {
            isLoading: true
          }
        }
      })
    case ADD_BOARD:
      return merge({}, state, {
        byId: {
          [action.board.id]: action.board
        },
        order: [...state.order, action.board.id],
        errors: []
      });
    case RECEIVE_BOARD: return receiveBoard(state, action);
    case RECEIVE_BOARDS:
      return merge({}, state, {
        byId: action.boards.byId,
        order: action.boards.order,
        errors: []
      });
    // case RECEIVE_ERRORS:
    //   return merge({}, state, {
    //     errors: action.errors
    //   })

    default:
      return state;
  }
}

export default boardsReducer;
