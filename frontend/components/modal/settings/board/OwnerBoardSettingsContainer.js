import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, editMembership, destroyBoard } from '../../../../actions/board_actions';
import OwnerBoardSettings from './OwnerBoardSettings';

const mapStateToProps = ({ session, members }) => {
  return ({
    currentUser: members.byId[session.currentUser.id]
  });
}


const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return({
    editMembership: membership => dispatch(editMembership(membership)),
    editBoard: board => dispatch(editBoard(board)),
    destroyBoard: () => {
      return dispatch(destroyBoard(currentBoard.id));
    },
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerBoardSettings)
