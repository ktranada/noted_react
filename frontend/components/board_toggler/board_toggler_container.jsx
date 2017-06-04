import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardToggler from './board_toggler';
import { asArray } from '../../reducers/selectors';

import { setCurrentBoardId } from '../../actions/board_index_actions';

const mapStateToProps = ({ boards }) => ({
  boards: asArray(boards.index)
});

export default withRouter(connect(
  mapStateToProps,
  null
)(BoardToggler));
