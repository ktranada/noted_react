import { connect } from 'react-redux';
import InviteResponseForm from './InviteResponseForm';
import { getInvite, updateInvite, logout } from '../../../actions/session_actions';
import { requestBoard } from '../../../actions/nav_actions';
import { addInvites } from '../../../actions/board_actions';
import { asArray } from '../../../reducers/selectors';
import * as qs from 'query-string';

const mapStateToProps = ({ session }, { match }) => {
  return ({
    currentUser: session.currentUser,
    isLoggedIn: Boolean(session.currentUser),
    code: match.params.code,
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    updateInvite: invite => dispatch(updateInvite(invite)),
    logoutCurrentUser: () => dispatch(logout()),
    getInvite: code => dispatch(getInvite(code))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteResponseForm)
