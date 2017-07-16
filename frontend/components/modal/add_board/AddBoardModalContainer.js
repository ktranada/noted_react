import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddBoardModal from './AddBoardModal';
import { createBoard, requestBoard} from '../../../actions/nav_actions.js';
import { getInvite, updateInvite } from '../../../actions/session_actions';

const mapDispatchToProps = (dispatch) => ({
  requestBoard: boardId => dispatch(requestBoard(boardId, false, true)),
  // Create a board
  createBoard: board => dispatch(createBoard(board)),

  // Join a board
  getInvite: code => dispatch(getInvite(code)),
  updateInvite: invite => dispatch(updateInvite(invite))
});


export default connect(
  null,
  mapDispatchToProps
)(AddBoardModal);
