import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddBoardModal from './AddBoardModal';
import { createBoard } from '../../../actions/nav_actions.js';
import { getInvite, updateInvite } from '../../../actions/session_actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  createBoard: board => createBoard(board)(dispatch),
  hideModal: () => ownProps.hideModal(),
  getInvite: code => dispatch(getInvite(code)),
  updateInvite: invite => dispatch(updateInvite(invite))
});


export default connect(
  null,
  mapDispatchToProps
)(AddBoardModal);
