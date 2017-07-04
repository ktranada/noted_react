import { connect } from 'react-redux';
import { asArrayByOrder, getCurrentBoardById, isLoadingByType } from '../../../reducers/selectors';
import { createList, createCard } from '../../../actions/board_actions';
import { moveList, moveCard, updateListOrder } from '../../../actions/list_actions';
import BoardContent from './BoardContent';


const mapStateToProps = ({ lists, boards, loading}, { currentBoard }) => {
  const boardLists = asArrayByOrder(lists, currentBoard.lists)
  return ({
    lists: boardLists,
    isLoading: isLoadingByType(loading, currentBoard.id, 'loadingBoard')
  })
}

const mapDispatchToProps = (dispatch, { currentBoard }) => ({
  createList: list =>  dispatch(createList(list)),
  createCard: card => dispatch(createCard(card)),
  moveList: (listId, lastPos, nextPos) => dispatch(moveList(currentBoard.id, listId, lastPos, nextPos)),
  moveCard: (cardId, lastListId, lastCardPos, nextListId, nextCardPos) =>  {
    return dispatch(moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos));
  },
  updateListOrder: lists => dispatch(updateListOrder(currentBoard.id, lists))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
