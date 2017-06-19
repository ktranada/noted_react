import { connect } from 'react-redux';
import InvitePeopleModal from './InvitePeopleModal';
import { createInvites, createInvite } from '../../../actions/board_actions';
import { asArrayByOrder, getCurrentBoardById } from '../../../reducers/selectors';

const mapStateToProps = ({invites, boards, currentBoardId}) => {
  const board = getCurrentBoardById(currentBoardId, boards);
  return ({
    invitesArray: asArrayByOrder(invites, board.invites),
    invites
  });
}

const mapDispatchToProps = (dispatch, { currentBoardId }) => {
  return ({
    createInvites: invites => createInvites(invites)(dispatch),
    createInvite: currentBoardId => createInvite(currentBoardId)(dispatch)
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitePeopleModal);
