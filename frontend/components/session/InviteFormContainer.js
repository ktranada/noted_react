import { connect } from 'react-redux';
import InviteForm from './Inviteform';
import { getInvite, updateInvite } from '../../actions/session_actions';
import { requestBoard } from '../../actions/nav_actions';
import { addInvites } from '../../actions/board_actions';
import { asArray } from '../../reducers/selectors';
import * as qs from 'query-string';

const mapStateToProps = ({ session }, { match }) => {
  return ({
    isLoggedIn: Boolean(session.currentUser),
    code: match.params.code,
  });
}

const mapDispatchToProps = dispatch => {
  return ({
    updateInvite: invite => dispatch(updateInvite(invite)),
    getInvite: code => dispatch(getInvite(code))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteForm)
