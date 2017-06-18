import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubNav from './SubNav';
import { getCurrentBoardById, asArrayByOrder, isLoadingByType } from '../../reducers/selectors';
import { requestChannels, requestBoardMembers } from '../../actions/sub_nav_actions';
import { toggleModal } from '../../actions/modal_actions';

const mapStateToProps = ({ boards, channels, members, loading }, { match }) => {
  const currentBoard = getCurrentBoardById(match.params.boardId, boards) || {}
  return ({
    channels: asArrayByOrder(channels, currentBoard.channels),
    members: asArrayByOrder(members, currentBoard.members),
    isLoading: isLoadingByType(loading, currentBoard.id, "loadingBoard"),
    currentBoard
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
)(SubNav);
