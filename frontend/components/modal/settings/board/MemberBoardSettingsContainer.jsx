import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, editMembership, destroyBoard } from '../../../../actions/board_actions';
import MemberBoardSettings from './MemberBoardSettings';

const mapStateToProps = ({ session, members }, { currentBoard }) => {
  const currentUser = members.byId[session.currentUser.id];
  return ({
    membershipId: currentUser.membershipsByBoardId[currentBoard.id],
    currentUser
  });
}

const mapDispatchToProps = (dispatch) => {
  return({
    editMembership: membership => editMembership(membership)(dispatch),
    destroyMembership: id => destroyMembership(id)(dispatch)
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberBoardSettings)
