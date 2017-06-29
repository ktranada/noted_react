import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asArrayByOrder, getCurrentBoardById } from '../../reducers/selectors';
import { requestBoard } from '../../actions/nav_actions';
import Nav from './Nav';

const mapStateToProps = ({ boards }, { currentBoardId, isLanding }) => {
    const currentBoard = getCurrentBoardById(currentBoardId, boards);
    // Board is a complex data structure and so we want to extract only the
    // necessary attributes to prevent extra rendering
    const boardsArray = asArrayByOrder(boards, boards.order)
      .map(({ id, title }) => ({ id, title }));
  return ({
    boards: boardsArray,
    boardIsLoaded: isLanding ? true : currentBoard.isLoaded,
    boardIsLoading: isLanding ? false : currentBoard.isLoading
  })
};

const mapDispatchToProps = dispatch => ({
  requestBoard: boardId => dispatch(requestBoard(boardId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
