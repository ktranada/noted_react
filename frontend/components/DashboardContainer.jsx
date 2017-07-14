import { connect } from 'react-redux';
import { getCurrentBoardById, isLoadingByType } from '../reducers/selectors';
import Dashboard from './Dashboard';
import { toggleModal } from '../actions/modal_actions';

const mapStateToProps = ({session, boards, loading }, { match }) => ({
  currentUser: session.currentUser,
  currentBoard: getCurrentBoardById(match.params.boardId, boards),
  isLoading: isLoadingByType(loading, match.params.boardId, 'loadingBoard')
})

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (type, options) => dispatch(toggleModal(type, options)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
