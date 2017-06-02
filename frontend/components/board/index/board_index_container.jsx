import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardIndex from './board_index';

import { setCurrentBoard } from '../../../actions/board_actions';
import { asArray } from '../../../reducers/selectors';

const mapStateToProps = ({ boards }) => ({
  currentBoard: boards.currentBoard,
  boards: boards.index
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentBoard: board => dispatch(setCurrentBoard(board))
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardIndex));
