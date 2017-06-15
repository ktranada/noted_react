import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardToggler from './BoardToggler';
import { asArrayByOrder } from '../../reducers/selectors';

import { setCurrentBoardId } from '../../actions/board_toggler_actions';
import { toggleModal, ADD_BOARD_MODAL } from '../../actions/modal_actions';

const mapStateToProps = ({ boards }) => {
  return ({
    boards: asArrayByOrder(boards)
  })
};

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModal(ADD_BOARD_MODAL))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardToggler);
