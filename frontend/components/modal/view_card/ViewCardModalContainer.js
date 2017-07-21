import { connect } from 'react-redux';
import { getObjectById, isLoadingByType, asArrayByOrder } from '../../../reducers/selectors';
import { editCard, createComment, addComment } from '../../../actions/board_actions';
import ViewCardModal from './ViewCardModal';

const mapStateToProps = ({ comments, members, cards, loading }, {match, currentBoard}) => {
  const card = getObjectById(match.params.cardId, cards);
  const boardMembers = {};
  currentBoard.members.forEach(id  => {
    boardMembers[id] = members.byId[id]
  })
  const isLoading = isLoadingByType(loading, 'Board', currentBoard.id, 'loading_lists') ||
    isLoadingByType(loading, 'Board', currentBoard.id, 'loading_board')
  return {
    card,
    isLoading,
    comments: card ? asArrayByOrder(comments, card.comments) : [],
    boardId: currentBoard.id,
    members: boardMembers
  }
}

const mapDispatchToProps = (dispatch, { card, currentBoard }) => ({
  editCard: (card) => dispatch(editCard(currentBoard.id, card)),
  // destroyCard: () => dispatch(destroyCard(current, cardId)),
  // createComment: comment => dispatch(createComment(currentBoard.id, comment))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCardModal)
