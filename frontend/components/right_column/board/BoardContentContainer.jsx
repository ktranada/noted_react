import { connect } from 'react-redux';
import { asArrayByOrder, isLoadingByType } from '../../../reducers/selectors';
import {
  createList,
  createCard,
  addList,
  addCard
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
    isLoading: isLoadingByType(loading, currentBoard.id, 'loadingBoard')
  })
}

const mapDispatchToProps = (dispatch, { currentBoard }) => ({
  createList: list =>  dispatch(createList(list)),
  createCard: card => dispatch(createCard(card)),
  addList: list => dispatch(addList(list)),
  addCard: card => dispatch(addCard(card)),
  moveList: (listId, lastPos, nextPos) => dispatch(moveList(currentBoard.id, listId, lastPos, nextPos)),
  moveCard: (cardId, lastListId, lastCardPos, nextListId, nextCardPos) =>  {
    return dispatch(moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos));
  },
  updateListPosition: list => dispatch(updateListPosition(list)),
  updateCardPosition: card => dispatch(updateCardPosition(card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
