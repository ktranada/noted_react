import { connect } from 'react-redux';
import InviteResponseForm from './InviteResponseForm';
import { requestInvite, updateInvite, logout } from '../../../actions/session_actions';
import { requestBoard } from '../../../actions/nav_actions';
import { addInvites } from '../../../actions/board_actions';
import { asArray } from '../../../reducers/selectors';

const mapStateToProps = ({ session }, { match }) => {
  return ({
    currentUser: session.currentUser,
    isLoggedIn: Boolean(session.currentUser),
    code: match.params.code,
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    requestBoard: (boardId) => dispatch(requestBoard(boardId, false, true)),
    updateInvite: invite => dispatch(updateInvite(invite)),
    logoutCurrentUser: () => dispatch(logout()),
    requestInvite: code => dispatch(requestInvite(code))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteResponseForm)
