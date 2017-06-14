import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardNav from './BoardNav';
import { getCurrentBoardById, asArray } from '../../reducers/selectors';
import { requestConversations } from '../../actions/board_nav_actions';

const mapStateToProps = (state, { match }) => {
  const currentBoardId = match.params.boardId;
  return ({
    conversations: asArray(state.conversations.byId),
    currentBoard: getCurrentBoardById(currentBoardId, state.boards),
  });
}

const mapDispatchToProps = (dispatch) => ({
  requestConversations: boardId => dispatch(requestConversations(boardId))
})


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardNav));
