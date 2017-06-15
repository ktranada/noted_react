import { connect } from 'react-redux';
import ModalController from './ModalController';
import { toggleModal } from '../../actions/modal_actions';

const mapStateToProps = ({currentModal}) => ({
  currentModal
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(toggleModal(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalController)
