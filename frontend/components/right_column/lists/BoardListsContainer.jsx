import { connect } from 'react-redux';
import { asArrayByOrder, getCurrentBoardById } from '../../../reducers/selectors';
import { createList } from '../../../actions/board_content_actions';
import BoardLists from './BoardLists';

const mapStateToProps = ({ lists, cards, boards}, { match }) => {
  const currentBoard = getCurrentBoardById(match.params.boardId, boards);
  const boardLists = asArrayByOrder(lists, currentBoard.lists)
  const listCards =  {};
  boardLists.map(list => {
    listCards[list.id] = asArrayByOrder(cards, list.cards);
  });

  return ({
    lists: boardLists,
    cards: listCards,
    currentBoard
  })
}

const mapDispatchToProps = dispatch => ({
  createList: list =>  createList(list)(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardLists)
