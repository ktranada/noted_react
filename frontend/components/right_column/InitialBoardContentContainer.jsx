import { connect } from 'react-redux';
import { toggleModal, INVITE_PEOPLE } from '../../actions/modal_actions';
import InitialBoardContent from './InitialBoardContent';
const mapDispatchToProps = dispatch => ({
  toggleInviteModal: () => dispatch(toggleModal(INVITE_PEOPLE))
});

export default connect(
  null,
  mapDispatchToProps
)(InitialBoardContent)
