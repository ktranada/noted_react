import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddBoardModal from './AddBoardModal';
import { createBoard } from '../../../actions/nav_actions.js';

const mapDispatchToProps = (dispatch, ownProps) => ({
  addBoard: board => createBoard(board)(dispatch),
  hideModal: () => ownProps.hideModal()
});


export default withRouter(connect(
  null,
  mapDispatchToProps
)(AddBoardModal));
