import { connect } from 'react-redux';
import { getObjectById, isLoadingByType } from '../../../reducers/selectors';
import { editCard } from '../../../actions/board_content_actions';
import ViewCardModal from './ViewCardModal';

const mapStateToProps = ({ cards, loading }, {match}) => ({
  card: getObjectById(match.params.cardId, cards),
  isLoading: isLoadingByType(loading, match.params.boardId, 'loadingBoard')
})

const mapDispatchToProps = (dispatch) => ({
  editCard: (card) => editCard(card)(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCardModal)
