import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, editMembership, destroyBoard } from '../../../../actions/board_actions';
import OwnerBoardSettingsModal from './OwnerBoardSettingsModal';

const mapStateToProps = ({ session, members }) => {
  return ({
    currentUser: members.byId[session.currentUser.id]
  });
}

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  return({
    editMembership: membership => dispatch(editMembership(currentBoard.id, membership)),
    editBoard: board => dispatch(editBoard(currentBoard.id, board)),
    destroyBoard: () => {
      return dispatch(destroyBoard(currentBoard.id));
    },
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerBoardSettingsModal)
