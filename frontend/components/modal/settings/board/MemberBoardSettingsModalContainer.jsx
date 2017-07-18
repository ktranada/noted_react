import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editMembership, destroyMembership } from '../../../../actions/board_actions';
import MemberBoardSettingsModal from './MemberBoardSettingsModal';

const mapStateToProps = ({ session, members }, { currentBoard }) => {
  const currentUser = members.byId[session.currentUser.id];
  return ({
    membershipId: currentUser.membershipsByBoardId[currentBoard.id],
    currentUser
  });
}

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return({
    editMembership: membership => dispatch(editMembership(currentBoard.id, membership)),
    destroyMembership: id => dispatch(destroyMembership(currentBoard.id, id))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberBoardSettingsModal)
