import { connect } from 'react-redux';
import { createInvites, destroyInvite } from '../../../actions/board_actions';
import { remainingInviteCount } from '../../../reducers/selectors';
import InviteMembersModal from './InviteMembersModal';

const mapStateToProps = ({ invites }, { currentBoard }) => {
  return ({
    remainingInviteCount: remainingInviteCount(invites, currentBoard)
  });
}

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return ({
    createInvites: invites => dispatch(createInvites(currentBoard.id, invites)),
    destroyInvite: (inviteId) => dispatch(destroyInvite(currentBoard.id, inviteId))
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteMembersModal);
