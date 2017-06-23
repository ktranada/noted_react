import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, destroyBoard } from '../../../../actions/board_actions';
import { toggleModal } from '../../../../actions/modal_actions';
import BoardSettingsModal from './BoardSettingsModal';

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  const boardId = currentBoard.id;
  return({
    hideModa: () => dispatch(toggleModal(null)),
    editBoard: board => editBoard(updateObject(board, { id: boardId }))(dispatch),
    destroyBoard: () => {
      return destroyBoard(boardId)(dispatch);
    }
  })
}

export default connect(
  null,
  mapDispatchToProps
)(BoardSettingsModal)
