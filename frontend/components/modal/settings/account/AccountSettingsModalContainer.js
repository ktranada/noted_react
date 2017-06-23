import { connect } from 'react-redux';
import { logout, updateUser } from '../../../../actions/session_actions';
import AccountSettingsModal from './AccountSettingsModal';

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(AccountSettingsModal)
