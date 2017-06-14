import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardToggler from './BoardToggler';
import { asArray } from '../../reducers/selectors';

import { setCurrentBoardId } from '../../actions/board_toggler_actions';
import { toggleModal, ADD_BOARD_MODAL } from '../../actions/modal_actions';

const mapStateToProps = ({ boards }) => ({
  boards: asArray(boards.byId)
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModal(ADD_BOARD_MODAL))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardToggler));
