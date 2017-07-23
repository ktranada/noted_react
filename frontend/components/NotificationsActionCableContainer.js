import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { receiveCurrentUser } from '../actions/session_actions';
import { updateBoard,removeBoard } from '../actions/board_actions';
import NotificationsActionCable from './NotificationsActionCable';


const mapDispatchToProps = (dispatch) => ({
  // Session
  endSession: () => dispatch(receiveCurrentUser()),
  // Board
  updateBoard: board => dispatch(updateBoard(board)),
  removeBoard: board => dispatch(removeBoard(board)),
})

export default withRouter(connect(
  null,
  mapDispatchToProps
)(NotificationsActionCable))
