import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardNav from './BoardNav';
import { getCurrentBoardById, asArrayByOrder } from '../../reducers/selectors';
import { requestChannels, requestBoardMembers } from '../../actions/board_nav_actions';
import { toggleModal } from '../../actions/modal_actions';

const mapStateToProps = (state, { match }) => {
  const currentBoardId = match.params.boardId;
  return ({
    channels: asArrayByOrder(state.channels),
    members: asArrayByOrder(state.members),
    currentBoard: getCurrentBoardById(currentBoardId, state.boards),
  });
}

const mapDispatchToProps = (dispatch) => ({
  requestChannels: boardId => requestChannels(boardId)(dispatch),
  requestBoardMembers: boardId => requestBoardMembers(boardId)(dispatch),
  toggleModal: modal => dispatch(toggleModal(modal))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardNav);
