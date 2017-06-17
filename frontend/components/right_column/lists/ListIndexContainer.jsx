import { connect } from 'react-redux';
import { asArrayByOrder, getCurrentBoardById } from '../../../reducers/selectors';
import { createList } from '../../../actions/board_content_actions';
import ListIndex from './ListIndex';

const mapStateToProps = ({ lists, cards, boards}, { match }) => {
  const currentBoard = getCurrentBoardById(match.params.boardId, boards);
  const boardLists = asArrayByOrder(lists, currentBoard.lists)
  return ({
    lists: boardLists
  })
}

const mapDispatchToProps = dispatch => ({
  createList: list =>  createList(list)(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIndex)
