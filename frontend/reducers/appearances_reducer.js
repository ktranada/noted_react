import merge from 'lodash/merge';
import { RECEIVE_BOARD } from '../actions/nav_actions';
import { UPDATE_APPEARANCE } from '../actions/sub_nav_actions';
import { REMOVE_BOARD } from '../actions/board_actions';
import { updateObject, removeObjectsByBoard, updateAssociationList } from './util';

const initialState = {
  usersByBoardId: {}
}

// appearances: {
//   usersByBoardId: {
//     2: {
//       1: {
//       user_id: 1,
//       status: "online"
//       }
//     }
//   }
// }


function updateAppearance(state, action) {
  const { board_id, user_id, status } = action.appearance;
  let newState = merge({}, state);
  let users = newState.usersByBoardId[board_id];

  if (!users || (users && !users[user_id])) {
    return state;
  }

  newState.usersByBoardId[board_id][user_id] = status;

  return newState;
}

function appearancesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOARD:
      return updateObject(state, action.board.appearances);
    case UPDATE_APPEARANCE:
      return updateAppearance(state, action);
    default:
      return state;
  }
}


export default appearancesReducer;
