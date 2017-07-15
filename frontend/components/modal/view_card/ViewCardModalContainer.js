import { connect } from 'react-redux';
import { getObjectById, isLoadingByType, asArrayByOrder } from '../../../reducers/selectors';
import { editCard, createComment, addComment } from '../../../actions/board_actions';
import ViewCardModal from './ViewCardModal';

const mapStateToProps = ({ comments, members, cards, loading }, {match, currentBoard}) => {
  const card = getObjectById(match.params.cardId, cards) || {};
  const boardMembers = {};
  currentBoard.members.forEach(id  => {
    boardMembers[id] = members.byId[id]
  })
  return {
    card,
    isLoading: isLoadingByType(loading, currentBoard.id, 'loadingLists'),
    comments: asArrayByOrder(comments, card.comments),
    boardId: currentBoard.id,
    members: boardMembers
  }
}

const mapDispatchToProps = (dispatch, { card }) => ({
  editCard: (card) => dispatch(editCard(card)),
  createComment: comment => dispatch(createComment(comment))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCardModal)
