  import { connect } from 'react-redux';
import { logout, updateUser, destroyUser, requestTimeZones, updateTimezone } from '../../../../actions/session_actions';
import AccountSettingsModal from './AccountSettingsModal';

const mapDispatchToProps = (dispatch, { currentUser }) => ({
  updateUser: (user, previousTimeZone) => dispatch(updateUser(user, previousTimeZone)),
  logout: () => dispatch(logout()),
  destroyUser: () => dispatch(destroyUser(currentUser.id)),
  requestTimeZones: () => dispatch(requestTimeZones()),
  updateTimezone: () => dispatch(updateTimezone())
});

export default connect(
  null,
  mapDispatchToProps
)(AccountSettingsModal)
