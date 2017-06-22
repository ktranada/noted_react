import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, destroyBoard } from '../../../../actions/board_actions';
import BoardSettingsModal from './BoardSettingsModal';

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  const boardId = currentBoard.id;
  return({
    editBoard: board => editBoard(updateObject(board, { id: boardId }))(dispatch),
    destroyBoard: () => destroyBoard(id)(dispatch)
  })
}

export default connect(
  null,
  mapDispatchToProps
)(BoardSettingsModal)
