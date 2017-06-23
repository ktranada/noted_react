import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import { asArrayByOrder, getCurrentBoardById } from '../../reducers/selectors';
import { requestBoard } from '../../actions/nav_actions';

const mapStateToProps = ({ boards }, {currentBoard}) => {
  return ({
    boards: asArrayByOrder(boards, boards.order),
  })
};

const mapDispatchToProps = dispatch => ({
  requestBoard: boardId => requestBoard(boardId)(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
