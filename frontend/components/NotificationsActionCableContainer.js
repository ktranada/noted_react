import { connect } from 'react-redux';

import { updateBoard,removeBoard } from '../actions/board_actions';
import NotificationsActionCable from './NotificationsActionCable';

const mapDispatchToProps = (dispatch) => ({

  // Board
  updateBoard: board => dispatch(updateBoard(board)),
  removeBoard: board => dispatch(removeBoard(board)),
})

export default connect(
  null,
  mapDispatchToProps
)(NotificationsActionCable)
