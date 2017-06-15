import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import boardsReducer from './boards_reducer';
import channelsReducer from './channels_reducer';
import membersReducer from './members_reducer';
import modalsReducer from './modals_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  channels: channelsReducer,
  currentModal: modalsReducer,
  members: membersReducer
});


export default rootReducer;
