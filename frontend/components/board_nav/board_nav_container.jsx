import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardNav from './board_nav';
import { getCurrentBoardById } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => {
  const currentBoardId = match.params.boardId;
  return ({
    conversations: state.conversations,
    currentBoard: getCurrentBoardById(currentBoardId, state.boards),
  });
}


export default withRouter(connect(
  mapStateToProps,
  null
)(BoardNav));
