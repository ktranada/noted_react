import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import boardIndexReducer from './board_index_reducer';
import currentViewReducer from './current_view_reducer';
import conversationsReducer from './conversations_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardIndexReducer,
  conversations: conversationsReducer
});


export default rootReducer;
