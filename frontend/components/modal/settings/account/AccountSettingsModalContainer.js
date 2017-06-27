import { connect } from 'react-redux';
import { logout, updateUser, destroyUser } from '../../../../actions/session_actions';
import AccountSettingsModal from './AccountSettingsModal';

const mapDispatchToProps = (dispatch, { currentUser }) => ({
  updateUser: user => dispatch(updateUser(user)),
  logout: () => dispatch(logout()),
  destroyUser: () => dispatch(destroyUser(currentUser.id))
});

export default connect(
  null,
  mapDispatchToProps
)(AccountSettingsModal)
