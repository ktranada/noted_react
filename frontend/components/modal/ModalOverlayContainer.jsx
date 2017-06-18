import { connect } from 'react-redux';
import ModalOverlay from './ModalOverlay';
import { toggleModal } from '../../actions/modal_actions';

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(toggleModal(null))
});

export default connect(
  null,
  mapDispatchToProps
)(ModalOverlay)
