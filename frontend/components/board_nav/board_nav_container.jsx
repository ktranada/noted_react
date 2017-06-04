import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardNav from './board_nav';
import { getCurrentBoard } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => {
  const currentBoardId = match.params.boardId;
  return ({
    currentBoard: getCurrentBoard(currentBoardId, state.boards.index),
  });
}


export default withRouter(connect(
  mapStateToProps,
  null
)(BoardNav));
