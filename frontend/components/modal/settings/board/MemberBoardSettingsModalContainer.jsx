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

const mapDispatchToProps = (dispatch) => {
  return({
    editMembership: membership => dispatch(editMembership(membership)),
    destroyMembership: id => dispatch(destroyMembership(id))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberBoardSettingsModal)
