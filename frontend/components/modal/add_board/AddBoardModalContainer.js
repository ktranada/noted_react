import { connect } from 'react-redux';
import AddBoardModal from './AddBoardModal';
import { createBoard } from '../../../actions/board_toggler_actions.js';

const mapDispatchToProps = (dispatch) => ({
  addBoard: board => dispatch(createBoard(board))
});


export default connect(
  null,
  mapDispatchToProps
)(AddBoardModal)
