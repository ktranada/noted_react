import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteCard } from '../../../../actions/board_actions';
import CardActions from './CardActions';

const mapDispatchToProps = (dispatch, { cardId }) => ({
  deleteCard: () => deleteCard(cardId)(dispatch)
})

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CardActions))
