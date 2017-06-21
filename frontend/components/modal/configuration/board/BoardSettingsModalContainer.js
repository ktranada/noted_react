import { connect } from 'react-redux';
import { updateObject } from '../../../../reducers/util';
import { editBoard, deleteBoard } from '../../../../actions/board_actions';
import BoardSettingsModal from './BoardSettingsModal';

const mapDispatchToProps = (dispatch, { currentBoard }) => {
  const id = currentBoard.id;
  return({
    editBoard: board => editBoard(updateObject(board, { id }))(dispatch),
    deleteBoard: () => deleteBoard(id)(dispatch)
  })
}

export default connect(
  null,
  mapDispatchToProps
)(BoardSettingsModal)
