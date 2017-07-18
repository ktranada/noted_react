import { connect } from 'react-redux';
import { asArrayByOrder, isLoadingByType } from '../../../reducers/selectors';
import {
  requestLists,
  createList,
  createCard,
  addList,
  addCard,
  addComment,
  updateCard,
} from '../../../actions/board_actions';
import {
  moveList,
  moveCard,
  updateListPosition,
  updateCardPosition
} from '../../../actions/list_actions';
import BoardContent from './BoardContent';


const mapStateToProps = ({ lists, boards, loading}, { currentBoard }) => {
  return ({
    lists: asArrayByOrder(lists, currentBoard.lists),
    isBoardLoaded: currentBoard.isLoaded,
    isLoadingBoard: isLoadingByType(loading, currentBoard.id, 'loadingBoard'),
    isLoadingLists: isLoadingByType(loading, currentBoard.id, 'loadingLists')
  })
}

const mapDispatchToProps = (dispatch, { currentBoard }) => ({
  requestLists: () => dispatch(requestLists(currentBoard.id)),
  createList: list =>  dispatch(createList(currentBoard.id, list)),
  createCard: card => dispatch(createCard(currentBoard.id, card)),
  addList: list => dispatch(addList(list)),
  addCard: card => dispatch(addCard(card)),
  addComment: comment => dispatch(addComment(comment)),
  moveList: (listId, lastPos, nextPos) => dispatch(moveList(currentBoard.id, listId, lastPos, nextPos)),
  moveCard: (cardId, lastListId, lastCardPos, nextListId, nextCardPos) =>  {
    return dispatch(moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos));
  },
  updateCard: card => dispatch(updateCard(currentBoard.id, card)),
  updateListPosition: list => dispatch(updateListPosition(currentBoard.id, list)),
  updateCardPosition: card => dispatch(updateCardPosition(currentBoard.id, card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
