import { connect } from 'react-redux';
import { toggleModal, INVITE_PEOPLE } from '../../actions/modal_actions';
import BoardContentNav from './BoardContentNav';
const mapDispatchToProps = dispatch => ({
  toggleInviteModal: () => dispatch(toggleModal(INVITE_PEOPLE))
});

export default connect(
  null,
  mapDispatchToProps
)(BoardContentNav)
