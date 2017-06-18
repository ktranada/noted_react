import { connect } from 'react-redux';
import { asArrayByOrder, getCurrentBoardById, isLoadingByType } from '../../../reducers/selectors';
import { createList } from '../../../actions/board_actions';
import ListIndex from './ListIndex';

const mapStateToProps = ({ lists, boards }, { match }) => {
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
