import { connect } from 'react-redux';
import { asArrayByOrder, isLoadingByType } from '../../../reducers/selectors';
import {
  requestLists,
  addList,
  addCard,
  addComment,
  updateCard,
} from '../../../actions/board_actions';
import {
  moveList,
  moveCard,
} from '../../../actions/list_actions';
import BoardContent from './BoardContent';


const mapStateToProps = ({ lists, boards, loading}, { currentBoard }) => {
  return ({
    lists: asArrayByOrder(lists, currentBoard.lists),
    isBoardLoaded: currentBoard.isLoaded,
    isLoadingBoard: isLoadingByType(loading, 'Board', currentBoard.id, 'loadingBoard'),
    isLoadingLists: isLoadingByType(loading, 'Board', currentBoard.id, 'loadingLists')
  })
}

const mapDispatchToProps = (dispatch, { currentBoard }) => ({
  requestLists: () => dispatch(requestLists(currentBoard.id)),
  addComment: comment => dispatch(addComment(comment)),

  // Board Websocket
  addList: list => dispatch(addList(list)),
  addCard: card => dispatch(addCard(card)),

  moveList: (listId, lastPos, nextPos) => dispatch(moveList(currentBoard.id, listId, lastPos, nextPos)),
  moveCard: (cardId, lastListId, lastCardPos, nextListId, nextCardPos) =>  {
    return dispatch(moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos));
  },
  updateCard: card => dispatch(updateCard(currentBoard.id, card)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
