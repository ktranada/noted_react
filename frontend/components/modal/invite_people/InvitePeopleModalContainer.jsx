import { connect } from 'react-redux';
import InvitePeopleModal from './InvitePeopleModal';
import { createInvites, destroyInvite } from '../../../actions/board_actions';
import { asArrayByOrder, getInvitesByStatus } from '../../../reducers/selectors';

const mapStateToProps = ({invites, boards}, {currentBoard}) => {
  const invitesArray = asArrayByOrder(invites, currentBoard.invites);
  const remainingInviteCount = 10 - currentBoard.members.length - invitesArray.filter(({status}) => status === 'pending').length;

  return ({
    remainingInviteCount,
  });
}

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return ({
    createInvites: invites => createInvites(invites)(dispatch),
    destroyInvite: (inviteId) => destroyInvite(inviteId)(dispatch)
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitePeopleModal);
