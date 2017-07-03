import { connect } from 'react-redux';
import { asArrayByOrder, getCurrentBoardById, isLoadingByType } from '../../../reducers/selectors';
import { createList, createCard } from '../../../actions/board_actions';
import BoardContent from './BoardContent';


const mapStateToProps = ({ lists, boards, loading}, { currentBoard }) => {
  const boardLists = asArrayByOrder(lists, currentBoard.lists)
  return ({
    lists: boardLists,
    isLoading: isLoadingByType(loading, currentBoard.id, 'loadingBoard')
  })
}

const mapDispatchToProps = dispatch => ({
  createList: list =>  dispatch(createList(list)),
  createCard: card => dispatch(createCard(card))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContent)
