import { connect } from 'react-redux';
import CommentIndex  from './CommentIndex';
import { asArrayByOrder } from '../../../../reducers/selectors';

const mapStateToProps = ({ comments, members }, { card }) => {
  return ({
    comments: asArrayByOrder(comments, card.comments),
    members
  })
}

export default connect(
  mapStateToProps
)(CommentIndex)
