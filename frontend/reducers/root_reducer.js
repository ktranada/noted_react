import { combineReducers } from 'redux';
import boardsReducer from './boards_reducer';
import cardsReducer from './cards_reducer';
import channelsReducer from './channels_reducer';
import commentsReducer from './comments_reducer';
import invitesReducer from './invites_reducer';
import currentBoardIdReducer from './current_board_id_reducer';
import membersReducer from './members_reducer';
import modalsReducer from './modals_reducer';
import listsReducer from './lists_reducer';
import loadingReducer from './loading_reducer';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  invites: invitesReducer,
  lists: listsReducer,
  cards: cardsReducer,
  comments: commentsReducer,
  members: membersReducer,
  channels: channelsReducer,
  currentModal: modalsReducer,
  loading: loadingReducer
});


export default rootReducer;
