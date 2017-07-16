import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyCard } from '../../../../actions/board_actions';
import CardActions from './CardActions';

const mapDispatchToProps = (dispatch, { cardId, boardId }) => ({
  destroyCard: () => dispatch(destroyCard(boardId, cardId))
})

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CardActions))
