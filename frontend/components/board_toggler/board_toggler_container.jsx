import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardToggler from './board_toggler';
import { asArray } from '../../reducers/selectors';

import { setCurrentBoardId } from '../../actions/board_toggler_actions';

const mapStateToProps = ({ boards }) => ({
  boards: asArray(boards.byId)
});

export default withRouter(connect(
  mapStateToProps,
  null
)(BoardToggler));
