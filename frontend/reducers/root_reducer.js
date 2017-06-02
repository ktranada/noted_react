import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import boardsReducer from './boards_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
});


export default rootReducer;
