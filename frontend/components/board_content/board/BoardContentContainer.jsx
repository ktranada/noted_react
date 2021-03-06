import { connect } from 'react-redux';
import { asArrayByOrder, isLoadingByType } from '../../../reducers/selectors';
import {
  requestLists,
  addList,
  addCard,
  addComment,
  updateCard,
  updateList,
  moveList,
  moveCard,
  removeList,
  removeCard
} from '../../../actions/board_actions';
import BoardContent from './BoardContent';


const mapStateToProps = ({ lists, boards, loading}, { currentBoard }) => {
  return ({
    lists: asArrayByOrder(lists, currentBoard.lists),
    isBoardLoaded: currentBoard.isLoaded,
    isLoadingBoard: isLoadingByType(loading, 'Board', currentBoard.id, 'loading_board'),
    isLoadingLists: isLoadingByType(loading, 'Board', currentBoard.id, 'loading_lists')
  })
}

const mapDispatchToProps = (dispatch, { currentBoard }) => ({
  requestLists: () => dispatch(requestLists(currentBoard.id)),
  addComment: comment => dispatch(addComment(comment)),

  // Board Websocket
  addList: list => dispatch(addList(list)),
  addCard: card => dispatch(addCard(card)),

  updateCard: card => dispatch(updateCard(card)),
  updateList: list => dispatch(updateList(list)),
  moveList: (listId, lastPos, nextPos) => dispatch(moveList(currentBoard.id, listId, lastPos, nextPos)),
  moveCard: (cardId, lastListId, lastCardPos, nextListId, nextCardPos) => dispatch(moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos)),

  removeList: list => dispatch(removeList(list)),
  removeCard: card => dispatch(removeCard(card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
