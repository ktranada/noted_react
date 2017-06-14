import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import boardsReducer from './boards_reducer';
import currentViewReducer from './current_view_reducer';
import conversationsReducer from './conversations_reducer';
import modalsReducer from './modals_reducer';
const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  conversations: conversationsReducer,
  modals: modalsReducer
});


export default rootReducer;
