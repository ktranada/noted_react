import { connect } from 'react-redux';
import ModalController from './ModalController';
import { toggleModal } from '../../actions/modal_actions';

const mapStateToProps = ({currentModal}) => ({
  currentModal
});

export default connect(
  mapStateToProps,
  null
)(ModalController)
