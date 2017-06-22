import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyCard } from '../../../../actions/board_actions';
import CardActions from './CardActions';

const mapDispatchToProps = (dispatch, { cardId }) => ({
  destroyCard: () => destroyCard(cardId)(dispatch)
})

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CardActions))
