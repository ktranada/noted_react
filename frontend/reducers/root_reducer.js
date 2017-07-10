import { combineReducers } from 'redux';
import boardsReducer from './boards_reducer';
import cardsReducer from './cards_reducer';
import channelsReducer from './channels_reducer';
import commentsReducer from './comments_reducer';
import invitesReducer from './invites_reducer';
import currentBoardIdReducer from './current_board_id_reducer';
import membersReducer from './members_reducer';
import messagesReducer from './messages_reducer';
import modalsReducer from './modals_reducer';
import listsReducer from './lists_reducer';
import loadingReducer from './loading_reducer';
import sessionReducer from './session_reducer';
import subscriptionsReducer from './subscriptions_reducer';

const appReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  invites: invitesReducer,
  lists: listsReducer,
  cards: cardsReducer,
  comments: commentsReducer,
  members: membersReducer,
  channels: channelsReducer,
  subscriptions: subscriptionsReducer,
  messages: messagesReducer,
  currentModal: modalsReducer,
  loading: loadingReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RECEIVE_CURRENT_USER' && action.currentUser === null) {
    state = undefined;
  }

  return appReducer(state, action);
}


export default rootReducer;
