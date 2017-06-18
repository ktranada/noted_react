import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import { asArrayByOrder, getCurrentBoardById } from '../../reducers/selectors';

import { requestBoard } from '../../actions/nav_actions';
import { toggleModal, ADD_BOARD } from '../../actions/modal_actions';

const mapStateToProps = ({ boards }, {match}) => {
  return ({
    boards: asArrayByOrder(boards, boards.order),
    currentBoard: getCurrentBoardById(match.params.boardId, boards)
  })
};

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModal(ADD_BOARD)),
  requestBoard: boardId => requestBoard(boardId)(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
