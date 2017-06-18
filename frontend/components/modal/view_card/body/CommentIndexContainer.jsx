import { connect } from 'react-redux';
import CommentIndex  from './CommentIndex';
import { asArrayByOrder } from '../../../../reducers/selectors';
import { createComment } from '../../../../actions/board_actions';

const mapStateToProps = ({ comments }, { card }) => ({
  comments: asArrayByOrder(comments, card.comments),
  cardId: card.id
});

const mapDispatchToProps = dispatch => ({
  createComment: comment => createComment(comment)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex)
