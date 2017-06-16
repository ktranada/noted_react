import { connect } from 'react-redux';
import BoardContentDefault from './BoardContentDefault';
import { toggleModal, ADD_BOARD } from '../../actions/modal_actions';
import { createBoard } from '../../actions/board_toggler_actions';

const mapStateToProps = ({ boards }) => ({
  boardCount: boards.order.length
})

const mapDispatchToProps = dispatch => ({
  toggleAddBoardModal: () => dispatch(toggleModal(ADD_BOARD)),
  hideModal: () => dispatch(hideModal())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContentDefault)
