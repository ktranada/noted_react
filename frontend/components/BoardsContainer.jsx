import { connect } from 'react-redux';
import { getCurrentBoardById } from '../reducers/selectors';
import Boards from './Boards';

const mapStateToProps = ({ boards }, { match }) => ({
  currentBoard: getCurrentBoardById(match.params.boardId, boards)
})

export default connect(
  mapStateToProps
)(Boards);
