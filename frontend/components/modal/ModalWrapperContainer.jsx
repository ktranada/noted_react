import { connect } from 'react-redux';
import ModalWrapper from './ModalWrapper';
import { toggleModal } from '../../actions/modal_actions';

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(toggleModal(null))
});

export default connect(
  null,
  mapDispatchToProps
)(ModalWrapper)
