import { connect } from 'react-redux';
import { logout, updateUser, destroyUser, requestTimeZones, updateTimeZone } from '../../../../actions/session_actions';
import AccountSettingsModal from './AccountSettingsModal';

const mapDispatchToProps = (dispatch, { currentUser }) => ({
  updateUser: (user, previousTimeZone) => dispatch(updateUser(user, previousTimeZone)),
  logout: () => dispatch(logout()),
  destroyUser: () => dispatch(destroyUser(currentUser.id)),
  requestTimeZones: () => dispatch(requestTimeZones()),
  updateTimeZone: () => dispatch(updateTimeZone())
});

export default connect(
  null,
  mapDispatchToProps
)(AccountSettingsModal)
