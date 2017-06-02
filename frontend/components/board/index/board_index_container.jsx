import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardIndex from './board_index';

import { setCurrentBoardId } from '../../../actions/board_index_actions';
// import { getCurrentBoard } from '../../../reducers/selectors';

const mapStateToProps = ({ boards }) => ({
  boards: boards.index
});

const mapDispatchToProps = (dispatch) => ({
  toggleBoard: (id) => dispatch(setCurrentBoardId(id))
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardIndex));
