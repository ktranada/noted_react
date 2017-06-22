import { connect } from 'react-redux';
import CommentIndex  from './CommentIndex';
import { asArrayByOrder } from '../../../../reducers/selectors';
import { createComment } from '../../../../actions/board_actions';

const mapStateToProps = ({ comments, members }, { card, currentBoard }) => {
  return ({
    comments: asArrayByOrder(comments, card.comments),
    members
  })
}

const mapDispatchToProps = (dispatch, { card }) => ({
  createComment: comment => {
    comment['card_id'] = card.id;
    createComment(comment)(dispatch);
  }

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex)
