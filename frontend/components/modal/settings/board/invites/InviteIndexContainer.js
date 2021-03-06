import { connect } from 'react-redux';
import { asArrayByOrder } from '../../../../../reducers/selectors';
import { toggleModal, INVITE_PEOPLE } from '../../../../../actions/modal_actions';
import { destroyInvite } from '../../../../../actions/board_actions';
import InviteIndex from './InviteIndex';

const mapStateToProps = ({ invites }, { currentBoard }) => {
  return ({
    boardMemberCount: currentBoard.members.length,
    invites: asArrayByOrder(invites, currentBoard.invites)
  });
}

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return({
    toggleInviteMembersModal: () => dispatch(toggleModal(INVITE_PEOPLE)),
    destroyInvite: inviteId => dispatch(destroyInvite(currentBoard.id, inviteId))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteIndex)
